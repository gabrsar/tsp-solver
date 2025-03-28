"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function swapPositions(array, a, b) {
    const tmp = array[a];
    array[a] = array[b];
    array[b] = tmp;
}
function* generatePermutations(array, startingIndex = 0) {
    if (startingIndex >= array.length) {
        yield array.slice();
    }
    else {
        for (let permutationIndex = startingIndex; permutationIndex < array.length; permutationIndex++) {
            swapPositions(array, startingIndex, permutationIndex);
            yield* generatePermutations(array, startingIndex + 1);
            swapPositions(array, startingIndex, permutationIndex);
        }
    }
}
exports.default = generatePermutations;
//# sourceMappingURL=permutation.js.map