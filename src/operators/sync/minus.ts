import {isSequence, Sequence} from "../../sequency";

export class Minus {

    /**
     * Removes the given `data` and returns a new sequence. Data can either be a single element, an array of elements
     * or a sequence of elements.
     *
     * @param {Sequence<T> | T[] | T} data
     * @returns {Sequence<T>}
     */
    minus<T>(this: Sequence<T>, data: T | Sequence<T> | T[]): Sequence<T> {
        if (isSequence(data)) {
            return this.filter((it) => !data.contains(it));
        } else if (data instanceof Array) {
            return this.filter(it => !data.includes(it));
        } else {
            return this.filter(it => it !== data);
        }
    }

}