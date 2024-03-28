import {AsyncSequence} from "../../sequency";

export class Any {

    /**
     * Returns `true` if at least one element match the given `predicate`.
     *
     * @param {(T) => Promise<boolean> | boolean} predicate
     * @returns {boolean}
     */
    async any<T>(this: AsyncSequence<T>, predicate?: (item: T) => Promise<boolean> | boolean): Promise<boolean> {
        if (predicate == null) {
            return !(await this.iterator.next()).done;
        }
        for (let item = await this.iterator.next(); !item.done; item = await this.iterator.next()) {
            if (await predicate(item.value)) {
                return true;
            }
        }
        return false;
    }

}