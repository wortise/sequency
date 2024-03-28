import {AsyncSequence} from "../../sequency";

export class ElementAtOrNull {

    /**
     * Returns the element at position `index` (zero-based) or `null` if `index`
     * is out of bounds.
     *
     * @param {number} index
     * @returns {Promise<T | null>}
     */
    async elementAtOrNull<T>(this: AsyncSequence<T>, index: number): Promise<T | null> {
        let i = 0;
        for (let item = await this.iterator.next(); !item.done; item = await this.iterator.next()) {
            if (i === index) {
                return item.value;
            }
            i++;
        }
        return null;
    }

}