import {Sequence} from "../../sequency";

export class Count {

    /**
     * Returns the number of elements of this sequence. If `predicate` is present, returns
     * the number of elements matching the given `predicate`.
     *
     * @param {(T) => boolean} predicate
     * @returns {number}
     */
    count<T>(this: Sequence<T>, predicate?: (item: T) => boolean): number {
        if (predicate == null) {
            return this.fold(0, (acc, _item) => acc + 1);
        } else {
            return this.fold(0, (acc, item) => predicate(item) ? acc + 1 : acc);
        }
    }

}