import {Sequence} from "../../sequency";

export class MinWith {

    /**
     * Returns the minimum element of the sequence by evaluating the given `compare`
     * function or `null` if sequence is empty.
     *
     * @returns {T | null}
     */
    minWith<T>(this: Sequence<T>, compare: (a: T, b: T) => number): T | null {
        let min: T | null = null;
        for (let item = this.iterator.next(); !item.done; item = this.iterator.next()) {
            if (min == null || compare(item.value, min) < 0) {
                min = item.value;
            }
        }
        return min;
    }

}