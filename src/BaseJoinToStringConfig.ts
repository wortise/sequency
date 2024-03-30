export interface BaseJoinToStringConfig {
    /**
     * Value to prepend
     */
    value?: string;
    /**
     * Element separator
     */
    separator?: string;
    /**
     * Element prefix
     */
    prefix?: string;
    /**
     * Element postfix
     */
    postfix?: string;
    /**
     * Element limit
     *
     * - -1: unlimited
     * - 0: truncate immediately
     * - 1..n: truncate after the limit is reached
     */
    limit?: number;
    /**
     * Truncation indicator (like "...")
     */
    truncated?: string;
}