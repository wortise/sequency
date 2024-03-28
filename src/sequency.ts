import {applyMixins, asAsyncIterator} from "./internal";
import {AsyncSequence, AsyncSequenceImpl} from "./AsyncSequence";
import GeneratorIterator from "./GeneratorIterator";
import GeneratorSeedIterator from "./GeneratorSeedIterator";
import {Sequence, SequenceImpl} from "./Sequence";

export {Sequence, Sequence as default} from "./Sequence";
export {AsyncSequence} from "./AsyncSequence";

export function sequenceOf<T>(...args: T[]): Sequence<T> {
    return asSequence(args);
}

export function asyncSequenceOf<T>(...args: T[]): AsyncSequence<T> {
    return asAsyncSequence<T>(args);
}

export function emptySequence<T>(): Sequence<T> {
    return sequenceOf();
}

export function emptyAsyncSequence<T>(): AsyncSequence<T> {
    return asyncSequenceOf();
}

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

export function createSequence<T>(iterator: Iterator<T>): Sequence<T> {
    return new SequenceImpl(iterator) as Sequence<T>;
}

export function createAsyncSequence<T>(iterator: AsyncIterator<T>): AsyncSequence<T> {
    return new AsyncSequenceImpl(iterator) as AsyncSequence<T>;
}

export function isSequence<T>(object: unknown): object is Sequence<T> {
    return object instanceof SequenceImpl;
}

export function isAsyncSequence<T>(object: unknown): object is AsyncSequence<T> {
    return object instanceof AsyncSequenceImpl;
}

export function extendSequence(mixin: { new(): any }) {
    applyMixins(SequenceImpl, [mixin]);
}

export function extendAsyncSequence(mixin: { new(): any }) {
    applyMixins(AsyncSequenceImpl, [mixin]);
}

export function generateSequence<T>(nextFunction: () => T | null | undefined): Sequence<T>;
export function generateSequence<T>(seedFunction: () => T | null | undefined, nextFunction: (item: T) => T | null | undefined): Sequence<T>;
export function generateSequence<T>(seed: T | null | undefined, nextFunction: (item: T) => T | null | undefined): Sequence<T>;
export function generateSequence<T>(a: any, b?: any): Sequence<T> {
    if (typeof a === "function" && b == null) {
        return createSequence<T>(new GeneratorIterator(a));
    }
    const seed = typeof a === "function" ? a() : a;
    return seed != null
        ? createSequence<T>(new GeneratorSeedIterator(seed, b))
        : emptySequence<T>();
}

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