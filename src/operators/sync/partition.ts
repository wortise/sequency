import {Sequence} from "../../sequency";

export class Partition {

    /**
     * Evaluates the given `predicate` for each element of the sequence and assorts each element into one of two lists
     * according to the result of the predicate. Returns both lists as an object.
     *
     * @param {(value: T) => boolean} predicate
     * @returns {{true: T[]; false: T[]}}
     */
    partition<T>(this: Sequence<T>, predicate: (value: T) => boolean): {true: T[], false: T[]} {
        const arrayTrue: T[] = [];
        const arrayFalse: T[] = [];
        for (let item = this.iterator.next(); !item.done; item = this.iterator.next()) {
            if (predicate(item.value)) {
                arrayTrue.push(item.value);
            } else {
                arrayFalse.push(item.value);
            }
        }
        return {true: arrayTrue, false: arrayFalse};
    }

}