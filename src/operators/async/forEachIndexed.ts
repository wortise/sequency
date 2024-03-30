import {AsyncSequence} from "../../sequency";

export class ForEachIndexed {

    /**
     * Performs the given `action` (side-effect) for each element of the sequence and passes the `index` of the current
     * element (zero-based).
     *
     * @param {(index: number, value: T) => Promise<void> | void} action
     */
    async forEachIndexed<T>(this: AsyncSequence<T>, action: (index: number, value: T) => Promise<unknown> | unknown) {
        await this.withIndex()
            .forEach(async it => await action(it.index, it.value));
    }

}