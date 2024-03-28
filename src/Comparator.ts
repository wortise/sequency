import {asSelector} from "./internal";

/**
 * A Comparator defines a compare function enriched with methods to compose multiple
 * comparators in order to form complex comparison behavior. A compare function returns
 * negative numbers if the first value is lower than the second value, positive numbers
 * if the first value is larger than the second value and zero if both values are equal.
 */
export default class Comparator<T> {
    constructor(readonly compare: (a: T, b: T) => number) {
    }

    /**
     * Reverses the order of the current comparator.
     *
     * @returns {Comparator<T>}
     */
    reversed(): Comparator<T> {
        return new Comparator(
            (a: T, b: T) => this.compare(a, b) * -1
        );
    }

    /**
     * Composes the current comparator with the given comparison function such
     * that the latter is applied for every equal values of the former comparator.
     *
     * @param {(a: T, b: T) => number} nextComparison
     * @returns {Comparator<T>}
     */
    then(nextComparison: (a: T, b: T) => number): Comparator<T> {
        return new Comparator(
            (a: T, b: T) => {
                const result = this.compare(a, b);
                return result !== 0
                    ? result
                    : nextComparison(a, b);
            }
        );
    }

    /**
     * Composes the current comparator with the given comparison function such
     * that the latter is applied for every equal values of the current comparator
     * in reverse (descending) order.
     *
     * @param {(a: T, b: T) => number} nextComparison
     * @returns {Comparator<T>}
     */
    thenDescending(nextComparison: (a: T, b: T) => number): Comparator<T> {
        return this.then(nextComparison)
            .reversed();
    }

    /**
     * Composes the current comparator with a comparator which compares the properties
     * selected by the given `selector` function for every equal values of the current
     * comparator.
     *
     * @param {(value: T) => any} selector
     * @returns {Comparator<T>}
     */
    thenBy(selector: (value: T) => any): Comparator<T>;

    /**
     * Composes the current comparator with a comparator which compares the values
     * of the given `key` for every equal values of the current comparator.
     *
     * @param {keyof T} key
     * @returns {Comparator<T>}
     */
    thenBy(key: keyof NonNullable<T>): Comparator<T>;

    thenBy(keyOrSelector: ((value: T) => any) | keyof NonNullable<T>): Comparator<T> {
        return this.then((a: T, b: T) => Comparator.naturalCompare(a, b, keyOrSelector));
    }

    /**
     * Composes the current comparator with a comparator which compares the properties
     * selected by the given `selector` function for every equal values of the current
     * comparator in reverse (descending) order.
     *
     * @param {(value: T) => any} selector
     * @returns {Comparator<T>}
     */
    thenByDescending(selector: (value: T) => any): Comparator<T>;

    /**
     * Composes the current comparator with a comparator which compares the values
     * of the given `key` for every equal values of the current comparator
     * in reverse (descending) order.
     *
     * @param {keyof T} key
     * @returns {Comparator<T>}
     */
    thenByDescending(key: keyof NonNullable<T>): Comparator<T>;

    thenByDescending(keyOrSelector: ((value: T) => any) | keyof NonNullable<T>): Comparator<T> {
        return this.then((a: T, b: T) => Comparator.naturalCompare(b, a, keyOrSelector));
    }

    static naturalCompare<T>(a: T, b: T, keyOrSelector?: ((item: T) => any) | keyof NonNullable<T>): number {
        if (a == null && b == null) {
            if (a === undefined && b === undefined) {
                return 0;
            }
            if (a === undefined) {
                return 1;
            }
            if (b === undefined) {
                return -1;
            }
            return 0;
        }
        if (a == null) {
            return 1;
        }
        if (b == null) {
            return -1;
        }

        if (keyOrSelector != null) {
            const selector = asSelector(keyOrSelector);
            const valA = selector(a);
            const valB = selector(b);
    
            return Comparator.naturalCompare(valA, valB);
        } else {
            if (a > b) {
                return 1;
            }
            if (a < b) {
                return -1;
            }
            return 0;
        }
    }

    static naturalOrder<T>(): Comparator<T> {
        return new Comparator<T>(Comparator.naturalCompare);
    }

    static reverseOrder<T>(): Comparator<T> {
        return new Comparator<T>(Comparator.naturalCompare).reversed();
    }

    static nullsLast<T>(): Comparator<T> {
        return new Comparator<T>((a: T, b: T) => a === null ? 1 : b === null ? -1 : 0);
    }

    static nullsFirst<T>(): Comparator<T> {
        return new Comparator<T>((a: T, b: T) => a === null ? -1 : b === null ? 1 : 0);
    }
}