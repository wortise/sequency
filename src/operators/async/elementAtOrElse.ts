import {AsyncSequence} from "../../sequency";

export class ElementAtOrElse {

    /**
     * Returns the element at position `index` (zero-based). If `index` is out of bounds returns
     * the result of the given `defaultValue` function.
     *
     * @param {number} index
     * @param {(index: number) => Promise<T> | T} defaultValue
     * @returns {Promise<T>}
     */
    async elementAtOrElse<T>(this: AsyncSequence<T>, index: number, defaultValue: (index: number) => Promise<T> | T): Promise<T> {
        let i = 0;
        for (let item = await this.iterator.next(); !item.done; item = await this.iterator.next()) {
            if (i === index) {
                return item.value;
            }
            i++;
        }
        return await defaultValue(index);
    }

}