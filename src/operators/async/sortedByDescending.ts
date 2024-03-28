import {AsyncSequence} from "../../sequency";

export class SortedByDescending {

    /**
     * Returns a new sequence with all elements sorted descending by the value specified
     * by the given `selector` function.
     *
     * @param {(value: T) => Promise<R> | R} selector
     * @returns {AsyncSequence<T>}
     */
    sortedByDescending<T, R>(this: AsyncSequence<T>, selector: (value: T) => Promise<R> | R): AsyncSequence<T> {
        return this.sorted(it => it.compareByDescending(selector));
    }

}