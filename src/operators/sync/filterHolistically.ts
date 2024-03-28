import {createSequence, Sequence} from "../../sequency";

class FilterIterator<T> implements Iterator<T> {
    private readonly data: T[] = [];
    /** Iterator to initialize data with */
    private iterator: Iterator<T> | null = null;
    /** Current data index */
    private index: number = 0;

    constructor(iterator: Iterator<T>, private readonly predicate: (item: T, index: number, array: Readonly<T[]>) => boolean) {
        this.iterator = iterator;
    }

    private init() {
        if (this.iterator != null) {
            for (let item = this.iterator.next(); !item.done; item = this.iterator.next()) {
                if (!item.done) {
                    this.data.push(item.value);
                }
            }
            Object.freeze(this.data);
            this.iterator = null;
        }
    }

    next(value?: any): IteratorResult<T> {
        this.init();
        for (let item = this.data[this.index++]; this.index < this.data.length; item = this.data[this.index++]) {
            if (this.predicate(item, this.index, this.data)) {
                return {done: false, value: item};
            }
        }
        return {done: true, value: undefined};
    }
}

export class FilterHolistically {

    /**
     * Returns a new sequence consisting of all elements that match the given `predicate`.
     *
     * @param {(value: T, index: number, array: T[]) => boolean} predicate
     * @returns {Sequence<T>}
     */
    filterHolistically<T>(this: Sequence<T>, predicate: (item: T, index: number, array: Readonly<T[]>) => boolean): Sequence<T> {
        return createSequence(new FilterIterator(this.iterator, predicate));
    }

}