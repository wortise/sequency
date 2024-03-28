import {isAsyncSequence, AsyncSequence} from "../../sequency";

export class Minus {

    /**
     * Removes the given `data` and returns a new sequence. Data can either be a single element, an array of elements
     * or a sequence of elements.
     *
     * @param {AsyncSequence<T> | T[] | T} data
     * @returns {AsyncSequence<T>}
     */
    minus<T>(this: AsyncSequence<T>, data: T | AsyncSequence<T> | T[]): AsyncSequence<T> {
        if (isAsyncSequence(data)) {
            return this.filter(async (it) => !await data.contains(it));
        } else if (data instanceof Array) {
            return this.filter(it => !data.includes(it));
        } else {
            return this.filter(it => it !== data);
        }
    }

}