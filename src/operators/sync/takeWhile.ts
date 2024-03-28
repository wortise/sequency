import {createSequence, Sequence} from "../../sequency";

class TakeWhileIterator<T> implements Iterator<T> {
    constructor(private readonly iterator: Iterator<T>,
                private readonly predicate: (item: T) => boolean) {
    }

    next(value?: any): IteratorResult<T> {
        const item = this.iterator.next();
        if (!item.done) {
            if (this.predicate(item.value)) {
                return {done: false, value: item.value};
            }
        }
        return {done: true, value: undefined};
    }
}

export class TakeWhile {

    /**
     * Takes all elements of the sequence as long as the given `predicate` evaluates to true.
     *
     * @param {(item: T) => boolean} predicate
     * @returns {Sequence<T>}
     */
    takeWhile<T>(this: Sequence<T>, predicate: (item: T) => boolean): Sequence<T> {
        return createSequence(new TakeWhileIterator(this.iterator, predicate));
    }

}