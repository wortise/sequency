import {AsyncSequence} from "../../sequency";

export class Last {

    /**
     * Returns the last element of the sequence or the last element matching `predicate` if present, otherwise throws
     * an error.
     *
     * @param {(value: T) => Promise<boolean> | boolean} predicate
     * @returns {Promise<T>}
     */
    async last<T>(this: AsyncSequence<T>, predicate?: (value: T) => Promise<boolean> | boolean): Promise<T> {
        if (predicate != null) {
            return this.filter(predicate).last();
        }
        let result: T;
        let empty = true;
        for (let item = await this.iterator.next(); !item.done; item = await this.iterator.next()) {
            result = item.value;
            empty = false;
        }
        if (empty) {
            throw new Error("No such element");
        }
        return result!;
    }

}