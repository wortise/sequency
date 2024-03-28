export function asAsyncIterable<T>(iterable: Iterable<T>): AsyncIterable<T> {
    return (async function* () {
        for (const item of iterable) {
            yield await item;
        }
    })();
}

export function asAsyncIterator<T>(iterator: Iterator<T>): AsyncIterator<T> {
    return {
        async next(value?: any) {
            return iterator.next(value);
        }
    };
}

export function asAsyncSelector<T, K extends any>(keyOrSelector: ((item: T) => Promise<K> | K) | keyof NonNullable<T>): (item: T) => Promise<K> | K {
    return typeof keyOrSelector === "function"
        ? keyOrSelector
        : (item: T) => item?.[keyOrSelector] as K;
}

export function asSelector<T, K extends any>(keyOrSelector: ((item: T) => K) | keyof NonNullable<T>): (item: T) => K {
    return typeof keyOrSelector === "function"
        ? keyOrSelector
        : (item: T) => item?.[keyOrSelector] as K;
}

export function applyMixins(derivedCtor: any, baseCtors: any[]) {
    baseCtors.forEach(baseCtor => {
        Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
            derivedCtor.prototype[name] = baseCtor.prototype[name];
        });
    });
}