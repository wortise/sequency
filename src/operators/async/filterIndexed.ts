import {AsyncSequence} from "../../sequency";

export class FilterIndexed {

    /**
     * Returns a new sequence consisting of all elements that match the given `predicate`.
     *
     * @param {(index: number, value: T) => Promise<boolean> | boolean} predicate
     * @returns {AsyncSequence<T>}
     */
    filterIndexed<T>(this: AsyncSequence<T>, predicate: (index: number, value: T) => Promise<boolean> | boolean): AsyncSequence<T> {
        return this.withIndex()
            .filter(async it => await predicate(it.index, it.value))
            .map(it => it.value);
    }

}