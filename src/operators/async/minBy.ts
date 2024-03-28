import {AsyncSequence} from "../../sequency";

export class MinBy {

    /**
     * Returns the minimum element by comparing the results of the given `selector` function
     * for each element of the sequence or `null` if the sequence is empty.
     *
     * @param {(value: T) => Promise<R> | R} selector
     * @returns {Promise<T | null>}
     */
    async minBy<T, R>(this: AsyncSequence<T>, selector: (value: T) => Promise<R> | R): Promise<T | null> {
        let min: T | null = null;
        let minSelected: R | null = null;
        for (let item = await this.iterator.next(); !item.done; item = await this.iterator.next()) {
            const value = await selector(item.value);
            if (minSelected == null || value < minSelected) {
                minSelected = value;
                min = item.value;
            }
        }
        return min;
    }

}