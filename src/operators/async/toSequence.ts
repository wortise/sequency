import {emptySequence, AsyncSequence, Sequence} from "../../sequency";

export class ToSequence {

    /**
     * Returns an async variant of the sequence.
     *
     * @returns {Sequence<T>}
     */
    async toSequence<T>(this: AsyncSequence<T>, sequence?: Sequence<T>): Promise<Sequence<T>> {
        const result = sequence ?? emptySequence();
        return result.plus(await this.toArray());
    }

}