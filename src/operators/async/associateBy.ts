import {asAsyncSelector} from "../../internal";
import {AsyncSequence} from "../../sequency";

export class AssociateBy<T> {

    /**
     * Returns a map consisting of the elements mapped by the given `keySelector`.
     *
     * @param {(value: T) => Promise<K> | K} keySelector
     * @returns {Promise<Map<K, T>>}
     */
    async associateBy<K>(keySelector: (value: T) => Promise<K> | K): Promise<Map<K, T>>;

    /**
     * Returns a map consisting of the elements indexed by the given `key`.
     *
     * @param {K} key
     * @returns {Map<T[K], T>}
     */
    async associateBy<K extends keyof NonNullable<T>>(key: K): Promise<Map<NonNullable<T>[K], T>>;

    /**
     * Returns a map consisting of the elements mapped by the given `keySelector`. The value
     * is transformed into another value by the `valueTransformer`.
     *
     * @param {(value: T) => Promise<K> | K} keySelector
     * @param {(value: T) => Promise<V> | V} valueTransformer
     * @returns {Map<K, V>}
     */
    async associateBy<K, V>(keySelector: (value: T) => Promise<K> | K, valueTransformer: (value: T) => Promise<V> | V): Promise<Map<K, V>>;

    /**
     * Returns a map consisting of the elements indexed by the given `key`. The value
     * is transformed into another value by the `valueTransformer`.
     *
     * @param {K} key
     * @param {(value: T) => Promise<V> | V} valueTransformer
     * @returns {Map<K, V>}
     */
    async associateBy<K extends keyof NonNullable<T>, V>(key: K, valueTransformer: (value: T) => Promise<V> | V): Promise<Map<NonNullable<T>[K], V>>;

    async associateBy<T, K, V>(this: AsyncSequence<T>,
                         keyOrSelector: ((value: T) => Promise<K> | K) | keyof NonNullable<T>,
                         valueTransform?: (value: T) => V): Promise<Map<K, V | T>> {
        const selector = asAsyncSelector(keyOrSelector);
        const result = new Map<K, V | T>();
        const transform = valueTransform != null
            ? valueTransform
            : (value: T) => value;
        for (let item = await this.iterator.next(); !item.done; item = await this.iterator.next()) {
            const key = await selector(item.value);
            const value = await transform(item.value);
            result.set(key, value);
        }
        return result;
    }

}