import {AsyncSequence} from "../../sequency";

export class Associate {

    /**
     * Transforms each element into a key-value pair and returns the results as map. In case of
     * duplicate keys the last key-value pair overrides the other.
     *
     * @param {(value: T) => Promise<[K, V]> | [K, V]} transform
     * @returns {Promise<Map<K, V>>}
     */
    async associate<T, K, V>(this: AsyncSequence<T>, transform: (value: T) => Promise<[K, V]> | [K, V]): Promise<Map<K, V>> {
        const result = new Map<K, V>();
        for (let item = await this.iterator.next(); !item.done; item = await this.iterator.next()) {
            const pair = await transform(item.value);
            result.set(pair[0], pair[1]);
        }
        return result;
    }

}