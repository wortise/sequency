import {AsyncSequence} from "../../sequency";

export class ToArray {

    /**
     * Returns all elements of the sequence as array. If an `array` is passed
     * the elements are appended to the end of the array.
     *
     * @param {T[]} array
     * @returns {Promise<T[]>}
     */
    async toArray<T>(this: AsyncSequence<T>, array?: T[]): Promise<T[]> {
        const result: T[] = array ?? [];
        for (let item = await this.iterator.next(); !item.done; item = await this.iterator.next()) {
            result.push(item.value);
        }
        return result;
    }

    /**
     * Returns all elements of the sequence as array. If an `array` is passed
     * the elements are appended to the end of the array.
     *
     * @param {T[]} array
     * @returns {Promise<T[]>}
     */
    async toList<T>(this: AsyncSequence<T>, array?: T[]): Promise<T[]> {
        return this.toArray(array);
    }

}