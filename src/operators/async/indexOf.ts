import {AsyncSequence} from "../../sequency";

export class IndexOf {

    /**
     * Returns the zero-based index of the given `element` or -1 if the sequence does not contain the element.
     *
     * @param {T} element
     * @returns {Promise<number>}
     */
    async indexOf<T>(this: AsyncSequence<T>, element: T): Promise<number> {
        let index = 0;
        for (let item = await this.iterator.next(); !item.done; item = await this.iterator.next()) {
            if (element === item.value) {
                return index;
            }
            index++;
        }
        return -1;
    }

}