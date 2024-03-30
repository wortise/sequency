import {AsyncSequence} from "../../sequency";

export class OnEach {

    /**
     * Performs the given `action` for each element and returns the sequence.
     *
     * @param {(value: T) => Promise<void> | void} action
     * @returns {AsyncSequence<T>}
     */
    onEach<T>(this: AsyncSequence<T>, action: (value: T) => Promise<unknown> | unknown): AsyncSequence<T> {
        return this.map(async it => {
            await action(it);
            return it;
        });
    }

}