import Comparator from "./Comparator";

/**
 * Defines various methods for constructing comparators.
 */
export default class ComparatorFactory<T> {
    constructor() {
    }

    /**
     * Constructs a new comparator where values are ordered by the given
     * comparison function.
     *
     * @param {(a: T, b: T) => number} comparison
     * @returns {Comparator<T>}
     */
    compare(comparison: (a: T, b: T) => number): Comparator<T> {
        return new Comparator(comparison);
    }

    /**
     * Constructs a new comparator where values are ordered by the natural ascending order
     * of the property selected by the given `selector` function.
     *
     * @param {(value: T) => any} selector
     * @returns {Comparator<T>}
     */
    compareBy(selector: (value: T) => any): Comparator<T>;

    /**
     * Constructs a new comparator where values are ordered by the natural ascending order
     * of values for the given `key`.
     *
     * @param {keyof T} key
     * @returns {Comparator<T>}
     */
    compareBy(key: keyof NonNullable<T>): Comparator<T>;

    compareBy<T>(keyOrSelector: ((item: T) => any) | keyof NonNullable<T>): Comparator<T> {
        return new Comparator<T>(
            (a: T, b: T) => Comparator.naturalCompare(a, b, keyOrSelector)
        );
    }

    /**
     * Constructs a new comparator where values are ordered by the natural descending order
     * of the property selected by the given `selector` function.
     *
     * @param {(value: T) => any} selector
     * @returns {Comparator<T>}
     */
    compareByDescending(selector: (value: T) => any): Comparator<T>;

    /**
     * Constructs a new comparator where values are ordered by the natural descending order
     * of values for the given `key`.
     *
     * @param {keyof T} key
     * @returns {Comparator<T>}
     */
    compareByDescending(key: keyof NonNullable<T>): Comparator<T>;

    compareByDescending<T>(keyOrSelector: ((item: T) => any) | keyof NonNullable<T>): Comparator<T> {
        return new Comparator<T>(
            (a: T, b: T) => Comparator.naturalCompare(b, a, keyOrSelector)
        );
    }

    /**
     * Constructs a new comparator where values are ordered naturally.
     *
     * @returns {Comparator<T>}
     */
    naturalOrder(): Comparator<T> {
        return Comparator.naturalOrder();
    }

    /**
     * Constructs a new comparator where values are ordered in reverse natural order.
     *
     * @returns {Comparator<T>}
     */
    reverseOrder(): Comparator<T> {
        return Comparator.reverseOrder();
    }

    /**
     * Constructs a new comparator where null values are ordered at the beginning.
     *
     * @returns {Comparator<T>}
     */
    nullsFirst(): Comparator<T> {
        return Comparator.nullsFirst();
    }

    /**
     * Constructs a new comparator where null values are ordered at the end.
     *
     * @returns {Comparator<T>}
     */
    nullsLast(): Comparator<T> {
        return Comparator.nullsLast();
    }
}