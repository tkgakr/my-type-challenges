/*
 * 5153 - indexof
 * Difficulty: medium
 */

/* _____________ Your Code Here _____________ */
// Index を表すアキュムレータを設置する
type IndexOf<T extends any[], U, Index extends any[] = []> =
  T extends [infer First, ...infer Rest]
    // 左端要素とU の一致チェック
    ? Equal<First, U> extends true
      // Indexの長さで 最初の T の要素番号を表す
      ? Index['length']
      // Index に要素を加えて再帰処理
      : IndexOf<Rest, U, [...Index, 1]>
    // Uが見つからないまま T が空になったら -1 を返す
    : -1

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<IndexOf<[1, 2, 3], 2>, 1>>,
  Expect<Equal<IndexOf<[2, 6, 3, 8, 4, 1, 7, 3, 9], 3>, 2>>,
  Expect<Equal<IndexOf<[0, 0, 0], 2>, -1>>,
  Expect<Equal<IndexOf<[string, 1, number, 'a'], number>, 2>>,
  Expect<Equal<IndexOf<[string, 1, number, 'a', any], any>, 4>>,
  Expect<Equal<IndexOf<[string, 'a'], 'a'>, 1>>,
  Expect<Equal<IndexOf<[any, 1], 1>, 1>>,
]
