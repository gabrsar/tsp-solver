"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function factorial(n) {
    if (n < 0) {
        throw new Error("This is getting complex. Please, use a positive value.");
    }
    if (n <= 1) {
        return 1;
    }
    let total = 1;
    for (let f = n; f > 0; f--) {
        total *= f;
    }
    return total;
}
exports.default = factorial;
