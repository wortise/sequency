import {AsyncSequence} from "../../sequency";

export class MaxWith {

    /**
     * Returns the maximum element of the sequence by evaluating the given `compare`
     * function or `null` if sequence is empty.
     *
     * @param {(a: T, b: T) => Promise<number> | number} compare
     * @returns {Promise<T | null>}
     */
    async maxWith<T>(this: AsyncSequence<T>, compare: (a: T, b: T) => Promise<number> | number): Promise<T | null> {
        let max: T | null = null;
        for (let item = await this.iterator.next(); !item.done; item = await this.iterator.next()) {
            if (max == null || await compare(item.value, max) > 0) {
                max = item.value;
            }
        }
        return max;
    }

}