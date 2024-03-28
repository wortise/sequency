import {AsyncSequence} from "../../sequency";

export class Unzip {

    /**
     * Returns a pair of arrays where the first array contains all first values
     * and the second array all second values from each input pair of the sequence.
     *
     * @returns {Promise<[T[], S[]]>}
     */
    async unzip<T, S>(this: AsyncSequence<[T, S]>): Promise<[T[], S[]]> {
        const array1: T[] = [];
        const array2: S[] = [];
        for (let item = await this.iterator.next(); !item.done; item = await this.iterator.next()) {
            const [first, second] = item.value;
            array1.push(first);
            array2.push(second);
        }
        return [array1, array2];
    }

}