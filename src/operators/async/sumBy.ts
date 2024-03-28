import {AsyncSequence} from "../../sequency";

export class SumBy {

    /**
     * Returns the sum of all numbers specified by the given `selector` function.
     *
     * @param {(value: T) => Promise<number> | number} selector
     * @returns {Promise<number>}
     */
    async sumBy<T>(this: AsyncSequence<T>, selector: (value: T) => Promise<number> | number): Promise<number> {
        let result = 0;
        for (let item = await this.iterator.next(); !item.done; item = await this.iterator.next()) {
            result += await selector(item.value);
        }
        return result;
    }

}