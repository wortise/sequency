import {AsyncSequence} from "../../sequency";

export class First {

    /**
     * Returns the first element of the sequence or the first element matching `predicate` if present, otherwise throws
     * an error.
     *
     * @param {(T) => Promise<boolean> | boolean} predicate
     * @returns {Promise<T>}
     */
    async first<T>(this: AsyncSequence<T>, predicate?: (item: T) => Promise<boolean> | boolean): Promise<T> {
        if (predicate != null) {
            return await this.filter(predicate).first();
        }
        const item = await this.iterator.next();
        if (item.done) {
            throw new Error("No such element");
        }
        return item.value;
    }

}