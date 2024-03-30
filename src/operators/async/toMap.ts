import {AsyncSequence} from "../../sequency";

export class ToMap {

    /**
     * Returns a map consisting of each key-value pair. If a `map` is passed
     * the pairs are set on this map. Duplicate keys override each other.
     *
     * @param {Map<K, V>} map
     * @returns {Promise<Map<K, V>>}
     */
    async toMap<K, V>(this: AsyncSequence<[K, V]>, map?: Map<K, V>): Promise<Map<K, V>> {
        const result = map ?? new Map<K, V>();
        for (let item = await this.iterator.next(); !item.done; item = await this.iterator.next()) {
            const pair = item.value;
            const key = pair[0];
            const value = pair[1];
            result.set(key, value);
        }
        return result;
    }

}