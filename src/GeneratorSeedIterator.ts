export default class GeneratorSeedIterator<T> implements Iterator<T> {
    private prevItem: T | null = null;

    constructor(private readonly seed: T,
                private readonly nextFunction: (value: T) => T | null | undefined) {
    }

    next(value?: any): IteratorResult<T> {
        if (this.prevItem == null) {
            this.prevItem = this.seed;
            return {done: false, value: this.seed};
        }
        const nextItem = this.nextFunction(this.prevItem);
        if (nextItem == null) {
            return {done: true, value: undefined};
        }
        this.prevItem = nextItem;
        return {
            done: false,
            value: nextItem!
        };
    }
}