import {AsyncSequence} from "../../sequency";

export class Min {

    /**
     * Returns the minimum element of the sequence or `null` if sequence is empty.
     *
     * @returns {Promise<T | null>}
     */
    async min<T>(this: AsyncSequence<T>): Promise<T | null> {
        let result: T | null = null;
        for (let item = await this.iterator.next(); !item.done; item = await this.iterator.next()) {
            if (result == null || item.value < result) {
                result = item.value;
            }
        }
        return result;
    }

}