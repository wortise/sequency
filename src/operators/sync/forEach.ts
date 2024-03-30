import {Sequence} from "../../sequency";

export class ForEach {

    /**
     * Performs the given `action` (side-effect) for each element of the sequence.
     *
     * @param {(item: T) => void} action
     */
    forEach<T>(this: Sequence<T>, action: (item: T) => unknown) {
        for (let item = this.iterator.next(); !item.done; item = this.iterator.next()) {
            action(item.value);
        }
    }

}