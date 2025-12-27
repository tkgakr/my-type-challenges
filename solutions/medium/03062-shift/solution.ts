/*
 * 3062 - shift
 * Difficulty: medium
 */

/* _____________ Your Code Here _____________ */
// Tが配列であることを制約し、最初のテストがエラーになるようにする
type Shift<T extends any[]> =
  // 最初の要素と残りを推論し、該当しない場合（空配列など）は空配列を返す
  T extends [infer First, ...infer Rest] ? [...Rest] : []

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  // @ts-expect-error
  Shift<unknown>,
  Expect<Equal<Shift<[]>, []>>,
  Expect<Equal<Shift<[1]>, []>>,
  Expect<Equal<Shift<[3, 2, 1]>, [2, 1]>>,
  Expect<Equal<Shift<['a', 'b', 'c', 'd']>, ['b', 'c', 'd']>>,
]
