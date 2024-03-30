import {applyMixins, asAsyncIterator} from "./internal";
import {AsyncSequence, AsyncSequenceImpl} from "./AsyncSequence";
import GeneratorIterator from "./GeneratorIterator";
import GeneratorSeedIterator from "./GeneratorSeedIterator";
import {Sequence, SequenceImpl} from "./Sequence";

export {Sequence, Sequence as default} from "./Sequence";
export {AsyncSequence} from "./AsyncSequence";
export {default as Comparator} from "./Comparator";
export {default as ComparatorFactory} from "./ComparatorFactory";
export {default as IndexedValue} from "./IndexedValue";
export {JoinConfig as JoinToStringConfig} from "./operators/sync/joinToString";
export {JoinConfig as AsyncJoinToStringConfig} from "./operators/async/joinToString";

/**
 * Create sequence of multiple arguments of an array of arguments
 * @param {...T} args Arguments
 * @returns Sequence
 * @example
 * // Sequence<number>
 * sequenceOf(1, 2, 3);
 * // Sequence<number>
 * sequenceOf([1, 2, 3]);
 */
export function sequenceOf<T>(...args: T[]): Sequence<T> {
    return asSequence(args);
}

/**
 * Create async sequence of multiple arguments of an array of arguments
 * @param {...T} args Arguments
 * @returns AsyncSequence
 * @example
 * asyncSequenceOf(1, 2, 3); // AsyncSequence<number>
 * asyncSequenceOf([1, 2, 3]); // AsyncSequence<number>
 */
export function asyncSequenceOf<T>(...args: T[]): AsyncSequence<T> {
    return asAsyncSequence<T>(args);
}

/**
 * Create empty sequence
 * @returns Sequence
 */
export function emptySequence<T>(): Sequence<T> {
    return sequenceOf();
}

/**
 * Create empty async sequence
 * @returns AsyncSequence
 */
export function emptyAsyncSequence<T>(): AsyncSequence<T> {
    return asyncSequenceOf();
}

/**
 * Create sequence for iterable object / generator
 * @param {Iterable<T>} iterable Iterable object / generator
 * @returns Sequence
 * @example
 * // Sequence<number> => 1, 2, 3
 * asSequence([1, 2, 3]);
 * // Sequence<number> => 1, 2, 3
 * asSequence(new Set([1, 2, 3]));
 * // Sequence<[string, number]> => ["a", 1], ["b", 2], ["c", 3]
 * asSequence(new Map([["a", 1], ["b", 2], ["c", 3]]));
 * // Sequence<string> => "a", "b", "c"
 * asSequence("abc");
 * // Sequence<number> => 0, 1, 2, 3, ...
 * asSequence((function* () {
 *     let i = 0;
 *     while (true) {
 *         yield i++;
 *     }
 * })());
 */
export function asSequence<T>(iterable: Iterable<T>): Sequence<T> {
    if (iterable == null) {
        throw new Error("Cannot create sequence for non-existing input: " + iterable);
    }
    if (iterable[Symbol.iterator] == null) {
        throw new Error("Cannot create sequence for non-iterable input: " + iterable);
    }
    const iterator = iterable[Symbol.iterator]();
    return createSequence<T>(iterator);
}

/**
 * Create async sequence for iterable object / generator
 * @param {Iterable<T> | AsyncIterable<T>} iterable Iterable object / generator
 * @returns AsyncSequence
 * @example
 * // AsyncSequence<number> => 1, 2, 3
 * asAsyncSequence([1, 2, 3]);
 * // AsyncSequence<number> => 1, 2, 3
 * asAsyncSequence(new Set([1, 2, 3]));
 * // AsyncSequence<[string, number]> => ["a", 1], ["b", 2], ["c", 3]
 * asAsyncSequence(new Map([["a", 1], ["b", 2], ["c", 3]]));
 * // AsyncSequence<string> => "a", "b", "c"
 * asAsyncSequence("abc");
 * // AsyncSequence<number> => 0, 1, 2, 3, ...
 * asAsyncSequence((async function* () {
 *     let i = 0;
 *     while (true) {
 *         yield i++;
 *     }
 * })());
 */
export function asAsyncSequence<T>(iterable: Iterable<T> | AsyncIterable<T>): AsyncSequence<T> {
    if (iterable == null) {
        throw new Error("Cannot create sequence for non-existing input: " + iterable);
    }

    if((iterable as Iterable<T>)[Symbol.iterator] != null) {
        const iterator = (iterable as Iterable<T>)[Symbol.iterator]();
        return createAsyncSequence(asAsyncIterator(iterator));
    }
    if ((iterable as AsyncIterable<T>)[Symbol.asyncIterator] != null) {
        const iterator = (iterable as AsyncIterable<T>)[Symbol.asyncIterator]();
        return createAsyncSequence<T>(iterator);
    }

    throw new Error("Cannot create sequence for non-iterable input: " + iterable);
}

/**
 * Create sequence for iterator
 * @param {Iterator<T>} iterator Iterator
 * @returns Sequence
 * @example
 * // Sequence<unknown>
 * createSequence({
 *     next(value) {
 *         return {done: true, value: null};
 *     }
 * });
 */
export function createSequence<T>(iterator: Iterator<T>): Sequence<T> {
    return new SequenceImpl(iterator) as Sequence<T>;
}

/**
 * Create async sequence for async iterator
 * @param {AsyncIterator<T>} iterator AsyncIterator
 * @returns AsyncSequence
 * @example
 * // Sequence<unknown>
 * createAsyncSequence({
 *     async next(value) {
 *         return {done: true, value: null};
 *     }
 * });
 */
export function createAsyncSequence<T>(iterator: AsyncIterator<T>): AsyncSequence<T> {
    return new AsyncSequenceImpl(iterator) as AsyncSequence<T>;
}

/**
 * Check if an object is a sequence
 * @param {unknown} object Object of interest
 * @returns Whether it is or not
 */
export function isSequence<T>(object: unknown): object is Sequence<T> {
    return object instanceof SequenceImpl;
}

/**
 * Check if an object is an async sequence
 * @param {unknown} object Object of interest
 * @returns Whether it is or not
 */
export function isAsyncSequence<T>(object: unknown): object is AsyncSequence<T> {
    return object instanceof AsyncSequenceImpl;
}

/**
 * Extend the basic sequence implementation
 * @param {{new(): any}} mixin Mixin operators
 */
export function extendSequence(mixin: {new(): any}) {
    applyMixins(SequenceImpl, [mixin]);
}

/**
 * Extend the basic async sequence implementation
 * @param {{new(): any}} mixin Mixin operators
 */
export function extendAsyncSequence(mixin: {new(): any}) {
    applyMixins(AsyncSequenceImpl, [mixin]);
}

/**
 * Generate a sequence
 * @param nextFunction Function to generate next value with (null/undefined to end sequence)
 * @example
 * // Sequence<number> => 0, 1, ..., 8, 9
 * let i = 0;
 * generateSequence(() => count < 10 ? count++ : null);
 */
export function generateSequence<T>(nextFunction: () => T | null | undefined): Sequence<T>;
/**
 * Generate a sequence
 * @param seedFunction Function to generate initial value with (seed)
 * @param nextFunction Function to generate next value with (null/undefined to end sequence)
 * @example
 * // Sequence<number> => 0, 1, ..., 8, 9
 * generateSequence(() => 0, value => value < 10 ? value + 1 : null);
 */
export function generateSequence<T>(seedFunction: () => T | null | undefined, nextFunction: (item: T) => T | null | undefined): Sequence<T>;
/**
 * Generate a sequence
 * @param seed Initial value (seed)
 * @param nextFunction Function to generate next value with (null/undefined to end sequence)
 * @example
 * // Sequence<number> => 0, 1, ..., 8, 9
 * generateSequence(0, value => value < 10 ? value + 1 : null);
 */
export function generateSequence<T>(seed: T | null | undefined, nextFunction: (item: T) => T | null | undefined): Sequence<T>;
/**
 * Generate a sequence
 * @param a seed/seedFunction/nextFunction
 * @param b nextFunction
 * @returns Sequence
 */
export function generateSequence<T>(a: (() => T | null | undefined) | T | null | undefined, b?: (item: T) => T | null | undefined): Sequence<T> {
    // seed/seedFunction + nextFunction
    if (typeof b === "function") {
        const seed = typeof a === "function" ? (a as () => T | null | undefined)() : a;
        return seed != null
            ? createSequence<T>(new GeneratorSeedIterator(seed, b)) // seed + nextFunction
            : emptySequence<T>(); // Missing seed
    // nextFunction
    } else if (typeof a === "function") {
        return createSequence<T>(new GeneratorIterator(a as () => T | null | undefined));
    // Missing nextFunction
    } else {
        return emptySequence<T>();
    }
}

/**
 * Generate sequence from range
 * @param start Range start
 * @param endInclusive Range end (inclusive)
 * @param step Step size
 * @returns Sequence
 * @example
 * // Sequence<number> => 0, 1, 2, 3, 4
 * range(0, 4);
 * // Sequence<number> => 0, 0.5, 1, ..., 3.5, 4
 * range(0, 4, 0.5);
 */
export function range(start: number, endInclusive: number, step: number = 1): Sequence<number> {
    if (start > endInclusive) {
        throw new Error(`start [${start}] must be lower then endInclusive [${endInclusive}]`);
    }
    let current = start;
    return generateSequence(() => {
        try {
            return current <= endInclusive
                ? current
                : undefined;
        } finally {
            current += step;
        }
    });
}