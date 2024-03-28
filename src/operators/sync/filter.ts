import {createSequence, Sequence} from "../../sequency";

class FilterIterator<T> implements Iterator<T> {
    constructor(private readonly predicate: (item: T) => boolean,
                private readonly iterator: Iterator<T>) {
    }

    next(value?: any): IteratorResult<T> {
        for (let item = this.iterator.next(); !item.done; item = this.iterator.next()) {
            if (this.predicate(item.value)) {
                return {done: false, value: item.value};
            }
        }
        return {done: true, value: undefined};
    }
}

export class Filter {

    /**
     * Returns a new sequence consisting of all elements that match the given `predicate`.
     *
     * @param {(item: T) => boolean} predicate
     * @returns {Sequence<T>}
     */
    filter<T>(this: Sequence<T>, predicate: (item: T) => boolean): Sequence<T> {
        return createSequence(new FilterIterator(predicate, this.iterator));
    }

}