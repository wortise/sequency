import {createSequence, Sequence} from "../../sequency";
import ComparatorFactory from "../../ComparatorFactory";
import Comparator from "../../Comparator";

class SortIterator<T> implements Iterator<T> {
    private readonly factory: ComparatorFactory<T> = new ComparatorFactory<T>();
    private readonly comparator: Comparator<T> | null;
    private readonly data: T[] = [];
    /** Iterator to initialize data with */
    private iterator: Iterator<T> | null = null;
    /** Current data index */
    private index: number = 0;

    constructor(iterator: Iterator<T>, composeComparator?: (factory: ComparatorFactory<T>) => Comparator<T>) {
        this.comparator = composeComparator?.(this.factory) ?? null;
        this.iterator = iterator;
    }

    private async init() {
        if (this.iterator != null) {
            for (let item = this.iterator.next(); !item.done; item = this.iterator.next()) {
                if (!item.done) {
                    this.data.push(item.value);
                }
            }
            if (this.comparator != null) {
                this.data.sort(this.comparator.compare);
            } else {
                this.data.sort();
            }
            Object.freeze(this.data);
            this.iterator = null;
        }
    }

    next(value?: any): IteratorResult<T> {
        this.init();
        if (this.index < this.data.length) {
            return {done: false, value: this.data[this.index++]};
        }
        return {done: true, value: undefined};
    }
}

export class Sorted {

    /**
     * Returns a new sequence with all elements sorted by the comparator specified by the given `composeComparator` function
     * or in natural order if no arguments are given.
     *
     * @param {(factory: ComparatorFactory<T>) => Comparator<T>} composeComparator
     * @returns {Sequence<T>}
     */
    sorted<T>(this: Sequence<T>, composeComparator?: (factory: ComparatorFactory<T>) => Comparator<T>): Sequence<T> {
        return createSequence(new SortIterator(this.iterator, composeComparator));
    }

}