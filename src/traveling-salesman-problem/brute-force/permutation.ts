function swapPositions(array: any[], a: number, b: number) {
  const tmp = array[a];
  array[a] = array[b];
  array[b] = tmp;
}

/** Generates every permutation of an array. Using generator strategy to avoid memory exhaustion */
export function* generatePermutations<T>(array: T[], startingIndex: number = 0): Generator<T[]> {
  if (startingIndex >= array.length) {
    yield array.slice();
  } else {
    for (
      let permutationIndex = startingIndex;
      permutationIndex < array.length;
      permutationIndex++
    ) {
      swapPositions(array, startingIndex, permutationIndex);
      yield* generatePermutations(array, startingIndex + 1);
      swapPositions(array, startingIndex, permutationIndex);
    }
  }
}
