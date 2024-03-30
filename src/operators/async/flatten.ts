import {asAsyncSequence, isAsyncSequence, AsyncSequence} from "../../sequency";

export class Flatten {

    /**
     * Returns a single flat sequence of all the items from all sequences or iterables.
     *
     * @returns {AsyncSequence<T>}
     */
    flatten<T>(this: AsyncSequence<AsyncSequence<T> | AsyncIterable<T> | Iterable<T>>): AsyncSequence<T> {
        return this.flatMap(it => {
            if (isAsyncSequence(it)) {
                return it;
            } else {
                return asAsyncSequence(it);
            }
        });
    }

}