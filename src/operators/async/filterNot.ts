import {AsyncSequence} from "../../sequency";

export class FilterNot {

    /**
     * Returns a new sequence consisting of all elements that don't match the given `predicate`.
     *
     * @param {(value: T) => Promise<boolean> | boolean} predicate
     * @returns {AsyncSequence<T>}
     */
    filterNot<T>(this: AsyncSequence<T>, predicate: (value: T) => Promise<boolean> | boolean): AsyncSequence<T> {
        return this.filter(async (value: T) => !await predicate(value));
    }

}