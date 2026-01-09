/*
 * 5117 - without
 * Difficulty: medium
 */

/* _____________ Your Code Here _____________ */
// 配列の要素ごとに条件型を適用させたいのでユニオンに変換
type ToUnion<T> =
  T extends any[]
    ? T[number]
    : T
type Without<T extends any[], U> =
  // 最初の要素と残りの要素に分割
  T extends [infer First, ...infer Rest]
    // 最初の要素が U の要素と一致するかをチェック
    ? First extends ToUnion<U>
      // 一致した要素を取り除いて再帰処理
      ? Without<Rest, U>
      // 一致しない要素は残して再帰処理
      : [First, ...Without<Rest, U>]
    : T

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Without<[1, 2], 1>, [2]>>,
  Expect<Equal<Without<[1, 2, 4, 1, 5], [1, 2]>, [4, 5]>>,
  Expect<Equal<Without<[2, 3, 2, 3, 2, 3, 2, 3], [2, 3]>, []>>,
]
