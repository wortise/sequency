import {AsyncSequence} from "../../sequency";

export class FoldIndexed {

    /**
     * Accumulates all elements of the sequence into a single result by applying the given `operation` starting with
     * the `initial` value. The result of the last operation will be passed as accumulated value to the getNext invocation
     * of the operation as well as the `index` of the current element (zero-based) until all elements of the sequence
     * are processed.
     *
     * @param {R} initial
     * @param {(index: number, acc: R, element: T) => Promise<R> | R} operation
     * @returns {Promise<R>}
     */
    async foldIndexed<T, R>(this: AsyncSequence<T>, initial: R, operation: (index: number, acc: R, element: T) => Promise<R> | R): Promise<R> {
        let result = initial;
        let index = 0;
        for (let item = await this.iterator.next(); !item.done; item = await this.iterator.next()) {
            result = await operation(index, result, item.value);
            index++;
        }
        return result;
    }

}