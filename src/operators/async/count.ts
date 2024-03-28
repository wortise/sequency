import {AsyncSequence} from "../../sequency";

export class Count {

    /**
     * Returns the number of elements of this sequence. If `predicate` is present, returns
     * the number of elements matching the given `predicate`.
     *
     * @param {(T) => Promise<boolean> | boolean} predicate
     * @returns {Promise<number>}
     */
    async count<T>(this: AsyncSequence<T>, predicate?: (item: T) => Promise<boolean> | boolean): Promise<number> {
        if (predicate == null) {
            return this.fold(0, (acc, _item) => acc + 1);
        } else {
            return this.fold(0, async (acc, item) => await predicate(item) ? acc + 1 : acc);
        }
    }

}