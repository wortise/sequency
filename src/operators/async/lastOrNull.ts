import {AsyncSequence} from "../../sequency";

export class LastOrNull {

    /**
     * Returns the last element of the sequence or the last element matching `predicate` if present, otherwise returns `null`.
     *
     * @param {(value: T) => Promise<boolean> | boolean} predicate
     * @returns {Promise<T | null>}
     */
    async lastOrNull<T>(this: AsyncSequence<T>, predicate?: (value: T) => Promise<boolean> | boolean): Promise<T | null> {
        if (predicate != null) {
            return this.filter(predicate).lastOrNull();
        }
        let result: T | null = null;
        for (let item = await this.iterator.next(); !item.done; item = await this.iterator.next()) {
            result = item.value;
        }
        return result;
    }

    /**
     * Returns the last element of the sequence or the last element matching `predicate` if present, otherwise returns `null`.
     *
     * @param {(value: T) => Promise<boolean> | boolean} predicate
     * @returns {Promise<T | null>}
     */
    async findLast<T>(this: AsyncSequence<T>, predicate?: (value: T) => Promise<boolean> | boolean): Promise<T | null> {
        return this.lastOrNull(predicate);
    }

}