import {AsyncSequence} from "../../sequency";

export class Sum {

    /**
     * Returns the sum of all numbers.
     *
     * @returns {Promise<number>}
     */
    async sum(this: AsyncSequence<number>): Promise<number> {
        let result = 0;
        for (let item = await this.iterator.next(); !item.done; item = await this.iterator.next()) {
            result += item.value;
        }
        return result;
    }

}