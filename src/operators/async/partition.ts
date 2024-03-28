import {AsyncSequence} from "../../sequency";

export class Partition {

    /**
     * Evaluates the given `predicate` for each element of the sequence and assorts each element into one of two lists
     * according to the result of the predicate. Returns both lists as an object.
     *
     * @param {(value: T) => Promise<boolean> | boolean} predicate
     * @returns {Promise<{true: T[]; false: T[]}>}
     */
    async partition<T>(this: AsyncSequence<T>, predicate: (value: T) => Promise<boolean> | boolean): Promise<{true: T[], false: T[]}> {
        const arrayTrue: T[] = [];
        const arrayFalse: T[] = [];
        for (let item = await this.iterator.next(); !item.done; item = await this.iterator.next()) {
            if (await predicate(item.value)) {
                arrayTrue.push(item.value);
            } else {
                arrayFalse.push(item.value);
            }
        }
        return {true: arrayTrue, false: arrayFalse};
    }

}