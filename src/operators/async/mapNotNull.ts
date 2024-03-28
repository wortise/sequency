import {emptyAsyncSequence, asyncSequenceOf, AsyncSequence} from "../../sequency";

export class MapNotNull {

    /**
     * Transforms each element into another value by applying the given `transform` function and returns a new sequence.
     * Transformations into `null` values are discarded.
     *
     * @param {(value: T) => R | null} transform
     * @returns {AsyncSequence<R>}
     */
    mapNotNull<T, R>(this: AsyncSequence<T>, transform: (value: T) => Promise<R | null> | R | null): AsyncSequence<R> {
        return this.flatMap(async (value: T) => {
            const item = await transform(value);
            return item !== null
                ? asyncSequenceOf(item)
                : emptyAsyncSequence();
        });
    }

}