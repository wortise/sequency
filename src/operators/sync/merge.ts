import {createSequence, isSequence, sequenceOf, Sequence} from "../../sequency";

class MergeIterator<T, S> implements Iterator<T> {
    private firstData: T[] = [];
    private secondData: T[] = [];
    /** Iterator to initialize data with */
    private firstIterator: Iterator<T> | null = null;
    /** Iterator to initialize data with */
    private secondIterator: Iterator<T> | null = null;
    /** First data index */
    private firstIndex: number = 0;
    /** Second data index */
    private secondIndex: number = 0;

    constructor(firstIterator: Iterator<T>,
                secondIterator: Iterator<T>,
                private readonly selector: (value: T) => S,
                private readonly prependNewValues: boolean) {
        this.firstIterator = firstIterator;
        this.secondIterator = secondIterator;
    }

    private init() {
        if (this.firstIterator != null && this.secondIterator != null) {
            // Init first data (self)
            for (let item = this.firstIterator.next(); !item.done; item = this.firstIterator.next()) {
                if (!item.done) {
                    this.firstData.push(item.value);
                }
            }
            this.firstIterator = null;
            // Init second data (other)
            for (let item = this.secondIterator.next(); !item.done; item = this.secondIterator.next()) {
                if (!item.done) {
                    this.secondData.push(item.value);
                }
            }
            this.secondIterator = null;

            // Replace values with those from second data if selector result of both (first and second) match, otherwise retain values from first data
            this.firstData = sequenceOf(...this.firstData)
                .map(left => {
                    const selected = this.selector(left);
                    const right = sequenceOf(...this.secondData)
                        .find(it => this.selector(it) === selected);
                    if (right != null) {
                        this.secondData = this.secondData.filter(it => it !== right);
                        return right;
                    } else {
                        return left;
                    }
                })
                .toArray();

            // First data now contains merged values and second data the remaining ones, swap them if new values should be prepended
            if (this.prependNewValues) {
                const tmp = this.firstData;
                this.firstData = this.secondData;
                this.secondData = tmp;
            }
        }
    }

    next(value?: any): IteratorResult<T> {
        this.init();
        if (this.firstIndex < this.firstData.length) {
            return {done: false, value: this.firstData[this.firstIndex++]};
        }
        if (this.secondIndex < this.secondData.length) {
            return {done: false, value: this.secondData[this.secondIndex++]};
        }
        return {done: true, value: undefined};
    }
}

export class Merge {

    /**
     * Merges the elements of both sequences into a new sequence. Each element of this sequence is eventually replaced with
     * an element of the other sequence by comparing results of the given `selector` function. If no value is found in the other
     * sequence the element is retained. New elements of the other sequence are appended to the end of the new sequence or
     * prepended to the start of the new sequence, if `prependNewValues` is set to `true`. This operation is not lazy evaluated.
     *
     * @param {Sequence<T>} other
     * @param {(value: T) => S} selector
     * @param prependNewValues
     * @returns {Sequence<T>}
     */
    merge<T, S>(this: Sequence<T>, other: Sequence<T> | Iterable<T>, selector: (value: T) => S, prependNewValues: boolean = false): Sequence<T> {
        return createSequence(new MergeIterator(
            this.iterator,
            isSequence(other) ? other.iterator : other[Symbol.iterator](),
            selector,
            prependNewValues
        ));
    }

}