import {AsyncSequence} from "../../sequency";

export class OnEachIndexed {

    /**
     * Performs the given `action` for each element and returns the sequence and passes the `index` of the current
     * element (zero-based).
     *
     * @param {(index: number, value: T) => Promise<void> | void} action
     * @returns {AsyncSequence<T>}
     */
    onEachIndexed<T>(this: AsyncSequence<T>, action: (index: number, value: T) => Promise<unknown> | unknown): AsyncSequence<T> {
        return this.withIndex()
            .map(async it => {
                await action(it.index, it.value);
                return it.value;
            });
    }

}