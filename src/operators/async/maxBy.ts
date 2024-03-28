import {AsyncSequence} from "../../sequency";

export class MaxBy {

    /**
     * Returns the maximum element by comparing the results of the given `selector` function
     * for each element of the sequence or `null` if the sequence is empty.
     *
     * @param {(value: T) => Promise<R> | R} selector
     * @returns {Promise<T | null>}
     */
    async maxBy<T, R>(this: AsyncSequence<T>, selector: (value: T) => Promise<R> | R): Promise<T | null> {
        let max: T | null = null;
        let maxSelected: R | null = null;
        for (let item = await this.iterator.next(); !item.done; item = await this.iterator.next()) {
            const value = await selector(item.value);
            if (maxSelected == null || value > maxSelected) {
                maxSelected = value;
                max = item.value;
            }
        }
        return max;
    }

}