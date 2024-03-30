import {AsyncSequence} from "../../sequency";

export class Contains {

    /**
     * Returns `true` if the sequence contains the given `element`.
     *
     * @param {T} element
     * @returns {Promise<boolean>}
     */
    async contains<T>(this: AsyncSequence<T>, element: T): Promise<boolean> {
        const elem = await element;
        for (let item = await this.iterator.next(); !item.done; item = await this.iterator.next()) {
            if (elem === item.value) {
                return true;
            }
        }
        return false;
    }

}