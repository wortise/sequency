import {AsyncSequence} from "../../sequency";

export class IndexOf {

    /**
     * Returns the zero-based index of the given `element` or -1 if the sequence does not contain the element.
     *
     * @param {T} element
     * @returns {Promise<number>}
     */
    async indexOf<T>(this: AsyncSequence<T>, element: T): Promise<number> {
        return await this.indexOfFirst(value => value === element);
    }

}