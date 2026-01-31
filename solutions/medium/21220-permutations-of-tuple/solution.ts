/*
 * 21220 - permutations-of-tuple
 * Difficulty: medium
 */

/* _____________ Your Code Here _____________ */
// Prev は処理済みの要素配列
type PermutationsOfTuple<T extends unknown[], Prev extends unknown[] = []> =
  // T を最初の要素と残りにわける
  T extends [infer First, ...infer Rest]
    // 最初の要素を固定して、PrevとRestをあわせた配列(First以外の要素)の順列をもとめる(ユニオンで展開される)
    ? [First, ...PermutationsOfTuple<[...Prev, ...Rest]>]
      // 残りの要素がなくなれば再帰終了、まだある場合は、Firstを処理済み要素につめて残りの要素を再帰
      | (Rest extends []? never : PermutationsOfTuple<Rest, [...Prev, First]>)
    // 要素がなくなったら再帰終了
    : []

/* _____________ Test Cases _____________ */
import type { Equal, Expect, ExpectFalse } from '@type-challenges/utils'

type cases = [
  Expect<Equal<PermutationsOfTuple<[]>, []>>,
  Expect<Equal<PermutationsOfTuple<[any]>, [any]>>,
  Expect<Equal<PermutationsOfTuple<[any, unknown]>, [any, unknown] | [unknown, any]>>,
  Expect<Equal<
    PermutationsOfTuple<[any, unknown, never]>,
    | [any, unknown, never]
    | [unknown, any, never]
    | [unknown, never, any]
    | [any, never, unknown]
    | [never, any, unknown]
    | [never, unknown, any]
  >>,
  Expect<Equal<
    PermutationsOfTuple<[1, number, unknown]>,
    | [1, number, unknown]
    | [1, unknown, number]
    | [number, 1, unknown]
    | [unknown, 1, number]
    | [number, unknown, 1]
    | [unknown, number, 1]
  >>,
  ExpectFalse<Equal<PermutationsOfTuple<[ 1, number, unknown ]>, [unknown]>>,
]
