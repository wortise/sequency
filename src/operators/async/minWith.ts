import {AsyncSequence} from "../../sequency";

export class MinWith {

    /**
     * Returns the minimum element of the sequence by evaluating the given `compare`
     * function or `null` if sequence is empty.
     *
     * @param {(a: T, b: T) => Promise<number> | number} compare
     * @returns {Promise<T | null>}
     */
    async minWith<T>(this: AsyncSequence<T>, compare: (a: T, b: T) => Promise<number> | number): Promise<T | null> {
        let min: T | null = null;
        for (let item = await this.iterator.next(); !item.done; item = await this.iterator.next()) {
            if (min == null || await compare(item.value, min) < 0) {
                min = item.value;
            }
        }
        return min;
    }

}