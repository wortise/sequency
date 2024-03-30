import {Sequence} from "../../sequency";

export class ElementAtOrNull {

    /**
     * Returns the element at position `index` (zero-based) or `null` if `index`
     * is out of bounds.
     *
     * @param {number} index
     * @returns {T | null}
     */
    elementAtOrNull<T>(this: Sequence<T>, index: number): T | null {
        return this.elementAtOrElse(index, () => null);
    }

}