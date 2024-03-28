import {asSelector} from "../../internal";
import {Sequence} from "../../sequency";

export class AssociateBy<T> {

    /**
     * Returns a map consisting of the elements mapped by the given `keySelector`.
     *
     * @param {(value: T) => K} keySelector
     * @returns {Map<K, T>}
     */
    associateBy<K>(keySelector: (value: T) => K): Map<K, T>;

    /**
     * Returns a map consisting of the elements indexed by the given `key`.
     *
     * @param {K} key
     * @returns {Map<T[K], T>}
     */
    associateBy<K extends keyof NonNullable<T>>(key: K): Map<NonNullable<T>[K], T>;

    /**
     * Returns a map consisting of the elements mapped by the given `keySelector`. The value
     * is transformed into another value by the `valueTransformer`.
     *
     * @param {(value: T) => K} keySelector
     * @param {(value: T) => V} valueTransformer
     * @returns {Map<K, V>}
     */
    associateBy<K, V>(keySelector: (value: T) => K, valueTransformer: (value: T) => V): Map<K, V>;

    /**
     * Returns a map consisting of the elements indexed by the given `key`. The value
     * is transformed into another value by the `valueTransformer`.
     *
     * @param {K} key
     * @param {(value: T) => V} valueTransformer
     * @returns {Map<K, V>}
     */
    associateBy<K extends keyof NonNullable<T>, V>(key: K, valueTransformer: (value: T) => V): Map<NonNullable<T>[K], V>;

    associateBy<T, K, V>(this: Sequence<T>,
                         keyOrSelector: ((value: T) => K) | keyof NonNullable<T>,
                         valueTransform?: (value: T) => V): Map<K, V | T> {
        const selector = asSelector(keyOrSelector);
        const result = new Map<K, V | T>();
        const transform = valueTransform != null
            ? valueTransform
            : (value: T) => value;
        for (let item = this.iterator.next(); !item.done; item = this.iterator.next()) {
            const key = selector(item.value);
            const value = transform(item.value);
            result.set(key, value);
        }
        return result;
    }

}