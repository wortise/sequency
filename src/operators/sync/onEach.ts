import {Sequence} from "../../sequency";

export class OnEach {

    /**
     * Performs the given `action` for each element and returns the sequence.
     *
     * @param {(value: T) => void} action
     * @returns {Sequence<T>}
     */
    onEach<T>(this: Sequence<T>, action: (value: T) => unknown): Sequence<T> {
        return this.map(it => {
            action(it);
            return it;
        });
    }

}