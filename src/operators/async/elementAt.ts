import {AsyncSequence} from "../../sequency";

export class ElementAt {

    /**
     * Returns the element at position `index` (zero-based) or throws an error if `index`
     * is out of bounds.
     *
     * @param {number} index
     * @returns {Promise<T>}
     */
    async elementAt<T>(this: AsyncSequence<T>, index: number): Promise<T> {
        let i = 0;
        for (let item = await this.iterator.next(); !item.done; item = await this.iterator.next()) {
            if (i === index) {
                return item.value;
            }
            i++;
        }
        throw new Error("Index out of bounds: " + index);
    }

}