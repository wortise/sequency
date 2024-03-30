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
        return await this.elementAtOrElse(index, () => null);
    }

}