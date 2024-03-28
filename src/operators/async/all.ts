import {AsyncSequence} from "../../sequency";

export class All {

    /**
     * Returns `true` if all elements match the given `predicate`.
     *
     * @param {(T) => Promise<boolean> | boolean} predicate
     * @returns {boolean}
     */
    async all<T>(this: AsyncSequence<T>, predicate: (item: T) => Promise<boolean> | boolean): Promise<boolean> {
        for (let item = await this.iterator.next(); !item.done; item = await this.iterator.next()) {
            if (!await predicate(item.value)) {
                return false;
            }
        }
        return true;
    }

}