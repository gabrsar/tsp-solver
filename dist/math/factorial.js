"use strict";
/**
 * Calculates the factorial of a non-negative integer.
 *
 * The factorial of a number `n` is the product of all positive integers from 1 to `n`. For example:
 * `5! = 5 * 4 * 3 * 2 * 1 = 120`.
 *
 * This function throws an error if the input number is negative or greater than 170, as numbers greater than 170
 * may cause a numeric overflow in JavaScript's `number` type.
 *
 * This limit is in place to avoid even more performance loss with BigInt.
 *
 * @param {number} n - The number for which to calculate the factorial. Must be a non-negative integer and <= 170.
 * @throws {Error} Throws an error if `n` is negative or greater than 170.
 * @returns {number} The factorial of the given number.
 */
Object.defineProperty(exports, "__esModule", { value: true });
function factorial(n) {
    if (n < 0) {
        throw new Error("This is getting complex. Please, use a positive value.");
    }
    if (n <= 1) {
        return 1;
    }
    if (Math.ceil(n) !== n) {
        throw new Error("This method only supports integers.");
    }
    if (n > 170) {
        throw new Error("This operation will cause a numeric overflow.");
    }
    let total = 1;
    for (let f = n; f > 0; f--) {
        total *= f;
    }
    return total;
}
exports.default = factorial;
//# sourceMappingURL=factorial.js.map