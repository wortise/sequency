import {createAsyncSequence, AsyncSequence} from "../../sequency";
import ComparatorFactory from "../../ComparatorFactory";
import Comparator from "../../Comparator";

class SortIterator<T> implements AsyncIterator<T> {
    private readonly factory: ComparatorFactory<T> = new ComparatorFactory<T>();
    private readonly comparator: Comparator<T> | null;
    private readonly data: T[] = [];
    /** Iterator to initialize data with */
    private iterator: AsyncIterator<T> | null = null;
    /** Current data index */
    private index: number = 0;

    constructor(iterator: AsyncIterator<T>, composeComparator?: (factory: ComparatorFactory<T>) => Comparator<T>) {
        this.comparator = composeComparator?.(this.factory) ?? null;
        this.iterator = iterator;
    }

    private async init() {
        if (this.iterator != null) {
            for (let item = await this.iterator.next(); !item.done; item = await this.iterator.next()) {
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

    async next(value?: any): Promise<IteratorResult<T>> {
        await this.init();
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
     * @returns {AsyncSequence<T>}
     */
    sorted<T>(this: AsyncSequence<T>, composeComparator?: (factory: ComparatorFactory<T>) => Comparator<T>): AsyncSequence<T> {
        return createAsyncSequence(new SortIterator(this.iterator, composeComparator));
    }

}