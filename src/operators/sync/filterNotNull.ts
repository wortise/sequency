import {Sequence} from "../../sequency";

export class FilterNotNull {

    /**
     * Returns a new sequence consisting of all non-null elements.
     *
     * @returns {Sequence<T>}
     */
    filterNotNull<T>(this: Sequence<T>): Sequence<NonNullable<T>> {
        return this.filter(it => it != null) as Sequence<NonNullable<T>>;
    }

}