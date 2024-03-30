import {emptyAsyncSequence, AsyncSequence, Sequence} from "../../sequency";

export class ToAsyncSequence {

    /**
     * Returns an async variant of the sequence.
     *
     * @returns {AsyncSequence<T>}
     */
    toAsyncSequence<T>(this: Sequence<T>, sequence?: AsyncSequence<T>): AsyncSequence<T> {
        const result = sequence ?? emptyAsyncSequence();
        return result.plus(this.toArray());
    }

}