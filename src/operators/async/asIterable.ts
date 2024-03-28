import {AsyncSequence} from "../../sequency";

export class AsIterable {

    /**
     * Returns an iterable representation of the sequence.
     *
     * @returns {Iterable<T>}
     */
    asIterable<T>(this: AsyncSequence<T>): AsyncIterable<T> {
        const iterator = this.iterator;
        return {
            [Symbol.asyncIterator](): AsyncIterator<T> {
                return iterator;
            }
        };
    }

}