import {AsyncSequence} from "../../sequency";

export class Fold {

    /**
     * Accumulates all elements of the sequence into a single result by applying the given `operation` starting with
     * the `initial` value. The result of the last operation will be passed as accumulated value to the getNext invocation
     * of the operation until all elements of the sequence are processed.
     *
     * @param {R} initial
     * @param {(acc: R, element: T) => Promise<R> | R} operation
     * @returns {Promise<R>}
     */
    async fold<T, R>(this: AsyncSequence<T>, initial: R, operation: (acc: R, element: T) => Promise<R> | R): Promise<R> {
        let result = initial;
        for (let item = await this.iterator.next(); !item.done; item = await this.iterator.next()) {
            result = await operation(result, item.value);
        }
        return result;
    }

}