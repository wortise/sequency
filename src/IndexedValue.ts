/**
 * Defines a `value` with a zero-based `index`.
 */
export default interface IndexedValue<T> {
    index: number;
    value: T;
}