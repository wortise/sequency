import {AsyncSequence} from "../../sequency";

export class ReduceIndexed {

    /**
     * Reduces the whole sequence to a single value by invoking `operation` with each element
     * from left to right. For every invocation of the operation `acc` is the result of the last
     * invocation. For the first invocation of the operation `acc` is the first element of the
     * sequence. In addition the `index` of the current element is also passed to the operation.
     *
     * @param {(index: number, acc: S, element: T) => Promise<S> | S} operation
     * @returns {Promise<S>}
     */
    async reduceIndexed<S, T extends S>(this: AsyncSequence<T>, operation: (index: number, acc: S, element: T) => Promise<S> | S): Promise<S> {
        const first = await this.iterator.next();
        if (first.done) {
            throw new Error("Cannot reduce empty sequence");
        }
        let index = 1;
        let result: S = first.value;
        for (let item = await this.iterator.next(); !item.done; item = await this.iterator.next()) {
            result = await operation(index, result, item.value);
            index++;
        }
        return result;
    }

}