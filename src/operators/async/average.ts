import {AsyncSequence} from "../../sequency";

export class Average {

    /**
     * Returns the average of all numbers of the sequence or `NaN` if the sequence is empty.
     *
     * @returns {Promise<number>}
     */
    async average(this: AsyncSequence<number>): Promise<number> {
        let sum = 0;
        let count = 0;
        for (let item = await this.iterator.next(); !item.done; item = await this.iterator.next()) {
            sum += item.value;
            count++;
        }
        return count === 0
            ? Number.NaN
            : sum / count;
    }

}