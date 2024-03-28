import {AsyncSequence} from "../../sequency";

export class Chunk {

    /**
     * Splits the elements of the sequence into arrays which length is determined by
     * the given `chunkSize` and returns all chunks as array.
     *
     * @param {number} chunkSize
     * @returns {Promise<T[][]>}
     */
    async chunk<T>(this: AsyncSequence<T>, chunkSize: number): Promise<T[][]> {
        if (chunkSize < 1) {
            throw new Error("chunkSize must be > 0 but is " + chunkSize);
        }
        const result: T[][] = [];
        let index = 0;
        for (let item = await this.iterator.next(); !item.done; item = await this.iterator.next()) {
            const chunkIndex = Math.floor(index / chunkSize);
            if (result[chunkIndex] == null) {
                result[chunkIndex] = [item.value];
            } else {
                result[chunkIndex].push(item.value);
            }
            index++;
        }
        return result;
    }

}