import {AsyncSequence} from "../../sequency";

export class IndexOfLast {

    /**
     * Returns the zero-based index of the last element matching the given `predicate` or -1 if no element matches
     * the predicate.
     *
     * @param {(value: T) => Promise<boolean> | boolean} predicate
     * @returns {Promise<number>}
     */
    async indexOfLast<T>(this: AsyncSequence<T>, predicate: (value: T) => Promise<boolean> | boolean): Promise<number> {
        let index = 0;
        let result = -1;
        for (let item = await this.iterator.next(); !item.done; item = await this.iterator.next()) {
            if (await predicate(item.value)) {
                result = index;
            }
            index++;
        }
        return result;
    }

}