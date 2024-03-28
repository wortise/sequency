import {Sequence} from "../../sequency";

export class Max {

    /**
     * Returns the maximum element of the sequence or `null` if sequence is empty.
     *
     * @returns {T | null}
     */
    max<T>(this: Sequence<T>): T | null {
        let result: T | null = null;
        for (let item = this.iterator.next(); !item.done; item = this.iterator.next()) {
            if (result == null || item.value > result) {
                result = item.value;
            }
        }
        return result;
    }

}