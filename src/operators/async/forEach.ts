import {AsyncSequence} from "../../sequency";

export class ForEach {

    /**
     * Performs the given `action` (side-effect) for each element of the sequence.
     *
     * @param {(item: T) => Promise<void> | void} action
     */
    async forEach<T>(this: AsyncSequence<T>, action: (item: T) => Promise<unknown> | unknown) {
        for (let item = await this.iterator.next(); !item.done; item = await this.iterator.next()) {
            await action(item.value);
        }
    }

}