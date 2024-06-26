import {Sequence} from "../../sequency";

export class IndexOf {

    /**
     * Returns the zero-based index of the given `element` or -1 if the sequence does not contain the element.
     *
     * @param {T} element
     * @returns {number}
     */
    indexOf<T>(this: Sequence<T>, element: T): number {
        return this.indexOfFirst(value => value === element);
    }

}