import {asAsyncIterator} from "../../internal";
import {asyncSequenceOf, createAsyncSequence, isAsyncSequence, AsyncSequence} from "../../sequency";

class MergeIterator<T, S> implements AsyncIterator<T> {
    private firstData: T[] = [];
    private secondData: T[] = [];
    /** Iterator to initialize data with */
    private firstIterator: AsyncIterator<T> | null = null;
    /** Iterator to initialize data with */
    private secondIterator: AsyncIterator<T> | null = null;
    /** First data index */
    private firstIndex: number = 0;
    /** Second data index */
    private secondIndex: number = 0;

    constructor(firstIterator: AsyncIterator<T>,
                secondIterator: AsyncIterator<T>,
                private readonly selector: (value: T) => Promise<S> | S,
                private readonly prependNewValues: boolean) {
        this.firstIterator = firstIterator;
        this.secondIterator = secondIterator;
    }

    private async init() {
        if (this.firstIterator != null && this.secondIterator != null) {
            // Init first data (self)
            for (let item = await this.firstIterator.next(); !item.done; item = await this.firstIterator.next()) {
                if (!item.done) {
                    this.firstData.push(item.value);
                }
            }
            this.firstIterator = null;
            // Init second data (other)
            for (let item = await this.secondIterator.next(); !item.done; item = await this.secondIterator.next()) {
                if (!item.done) {
                    this.secondData.push(item.value);
                }
            }
            this.secondIterator = null;

            // Replace values with those from second data if selector result of both (first and second) match, otherwise retain values from first data
            this.firstData = await asyncSequenceOf(...this.firstData)
                .map(async left => {
                    const selected = await this.selector(left);
                    const right = await asyncSequenceOf(...this.secondData)
                        .find(async it => await this.selector(it) === selected);
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

    async next(value?: any): Promise<IteratorResult<T>> {
        await this.init();
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
     * @param {AsyncSequence<T>} other
     * @param {(value: T) => Promise<S> | S} selector
     * @param prependNewValues
     * @returns {AsyncSequence<T>}
     */
    merge<T, S>(this: AsyncSequence<T>, other: AsyncSequence<T> | AsyncIterable<T> | Iterable<T>, selector: (value: T) => Promise<S> | S, prependNewValues: boolean = false): AsyncSequence<T> {
        return createAsyncSequence(new MergeIterator(
            this.iterator,
            isAsyncSequence(other)
                ? other.iterator
                : (other as AsyncIterable<T>)[Symbol.asyncIterator]
                    ? (other as AsyncIterable<T>)[Symbol.asyncIterator]()
                    : asAsyncIterator((other as Iterable<T>)[Symbol.iterator]()),
            selector,
            prependNewValues
        ));
    }

}