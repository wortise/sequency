import {Sequence} from "../../sequency";

export class ToArray {

    /**
     * Returns all elements of the sequence as array. If an `array` is passed
     * the elements are appended to the end of the array.
     *
     * @param {T[]} array
     * @returns {T[]}
     */
    toArray<T>(this: Sequence<T>, array?: T[]): T[] {
        const result: T[] = array ?? [];
        for (let item = this.iterator.next(); !item.done; item = this.iterator.next()) {
            result.push(item.value);
        }
        return result;
    }

    /**
     * Returns all elements of the sequence as array. If an `array` is passed
     * the elements are appended to the end of the array.
     *
     * @param {T[]} array
     * @returns {T[]}
     */
    toList<T>(this: Sequence<T>, array?: T[]): T[] {
        return this.toArray(array);
    }

}