import {AsyncSequence} from "../../sequency";

export class GroupBy {

    /**
     * Groups all elements of the sequence into a map. Keys are determined by the given `keySelector` function.
     *
     * @param {(value: T) => Promise<K> | K} keySelector
     * @returns {Promise<Map<K, T[]>>}
     */
    async groupBy<T, K>(this: AsyncSequence<T>, keySelector: (value: T) => Promise<K> | K): Promise<Map<K, T[]>> {
        const result = new Map<K, T[]>();
        for (let item = await this.iterator.next(); !item.done; item = await this.iterator.next()) {
            const key = await keySelector(item.value);
            const array = result.get(key);
            if (array == null) {
                result.set(key, [item.value]);
            } else {
                array.push(item.value);
            }
        }
        return result;
    }

}