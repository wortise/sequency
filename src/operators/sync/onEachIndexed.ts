import {Sequence} from "../../sequency";

export class OnEachIndexed {

    /**
     * Performs the given `action` for each element and returns the sequence and passes the `index` of the current
     * element (zero-based).
     *
     * @param {(index: number, value: T) => void} action
     * @returns {Sequence<T>}
     */
    onEachIndexed<T>(this: Sequence<T>, action: (index: number, value: T) => unknown): Sequence<T> {
        return this.withIndex()
            .map(it => {
                action(it.index, it.value);
                return it.value;
            });
    }

}