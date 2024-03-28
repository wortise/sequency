import {AsyncSequence} from "../../sequency";

export class None {

    /**
     * Returns `true` if no element match the given `predicate` or if the sequence is empty
     * if no predicate is present.
     *
     * @param {(value: T) => Promise<boolean> | boolean} predicate
     * @returns {Promise<boolean>}
     */
    async none<T>(this: AsyncSequence<T>, predicate?: (value: T) => Promise<boolean> | boolean): Promise<boolean> {
        if (predicate == null) {
            return (await this.iterator.next())?.done ?? false;
        }
        for (let item = await this.iterator.next(); !item.done; item = await this.iterator.next()) {
            if (await predicate(item.value)) {
                return false;
            }
        }
        return true;
    }

}
