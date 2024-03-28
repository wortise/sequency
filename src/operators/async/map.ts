import {createAsyncSequence, AsyncSequence} from "../../sequency";

class MapIterator<S, T> implements AsyncIterator<T> {
    constructor(private readonly transform: (item: S) => Promise<T> | T,
                private readonly iterator: AsyncIterator<S>) {
    }

    async next(value?: any): Promise<IteratorResult<T>> {
        const item = await this.iterator.next();
        return item.done
            ? {done: true, value: undefined}
            : {done: false, value: await this.transform(item.value)};
    }
}

export class Map {

    /**
     * Transforms each element into another value by applying the given `transform` function and returns a new sequence.
     *
     * @param {(S) => Promise<T> | T} transform
     * @returns {AsyncSequence<T>}
     */
    map<S, T>(this: AsyncSequence<S>, transform: (element: S) => Promise<T> | T): AsyncSequence<T> {
        return createAsyncSequence(new MapIterator(transform, this.iterator));
    }

}