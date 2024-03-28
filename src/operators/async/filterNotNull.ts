import {AsyncSequence} from "../../sequency";

export class FilterNotNull {

    /**
     * Returns a new sequence consisting of all non-null elements.
     *
     * @returns {AsyncSequence<T>}
     */
    filterNotNull<T>(this: AsyncSequence<T>): AsyncSequence<NonNullable<T>> {
        return this.filter(it => it != null) as AsyncSequence<NonNullable<T>>;
    }

}