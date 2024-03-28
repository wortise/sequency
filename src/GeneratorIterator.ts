export default class GeneratorIterator<T> implements Iterator<T> {
    constructor(private readonly nextFunction: () => T | null | undefined) {
    }

    next(value?: unknown): IteratorResult<T> {
        const nextItem = this.nextFunction();
        return {
            done: nextItem == null,
            value: nextItem!
        };
    }
}