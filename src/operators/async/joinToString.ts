import {AsyncSequence} from "../../sequency";
import {BaseJoinToStringConfig} from "../../BaseJoinToStringConfig";

export interface JoinConfig<T> extends BaseJoinToStringConfig {
    /**
     * Transform function
     * @param value Sequence element
     * @returns {Promise<string> | string} String representation
     */
    transform?: (value: T) => Promise<string> | string;
}

const defaults = {
    value: "",
    separator: ", ",
    prefix: "",
    postfix: "",
    limit: -1,
    truncated: "...",
    transform: undefined
} satisfies JoinConfig<unknown>;

export class JoinToString {

    /**
     * Joins all elements of the sequence into a string with the given configuration.
     *
     * @param {JoinConfig<T>} config
     * @returns {Promise<string>}
     */
    async joinToString<T>(this: AsyncSequence<T>, config: JoinConfig<T> = defaults): Promise<string> {
        const {
            value = defaults.value,
            separator = defaults.separator,
            prefix = defaults.prefix,
            postfix = defaults.postfix,
            limit = defaults.limit,
            truncated = defaults.truncated,
            transform = defaults.transform
        } = config;

        let result = `${value}${prefix}`;
        let count = 0;

        for (let item = await this.iterator.next(); !item.done; item = await this.iterator.next()) {
            count++;
            if (count > 1) {
                result += separator;
            }
            if (limit < 0 || count <= limit) {
                result += transform != null
                    ? await transform(item.value)
                    : String(item.value);
            } else {
                break;
            }
        }

        if (limit >= 0 && count > limit) {
            result += truncated;
        }

        result += postfix;
        return result;
    }

    /**
     * Joins all elements of the sequence into a string with the given configuration.
     *
     * @param {JoinConfig<T>} config
     * @returns {Promise<string>}
     */
    async joinTo<T>(this: AsyncSequence<T>, config: JoinConfig<T> = defaults): Promise<string> {
        return this.joinToString(config);
    }

}