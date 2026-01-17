/*
 * 8987 - subsequence
 * Difficulty: medium
 */

import { resourceLimits } from "worker_threads"

/* _____________ Your Code Here _____________ */
// この実装では、各要素が同じで並びが違うタプルも結果として表示され、ユニークにならない
// 8767 Combination の文字列結合がタプルになっただけだった。
type SubsequenceNG<T extends any[], All = T[number], Items = All> =
  Items extends infer Item
    ? [Item] | [Item, ...SubsequenceNG<[], Exclude<All, Item>>]
    : []

// 解法1: アキュムレータにタプルのユニオンを詰めるボトムアップ型アプローチ
type Subsequence<T extends any[], Result extends any[] = []> =
  // タプルのはじめの要素と残りにわける
  T extends [infer First, ...infer Rest]
    // アキュムレータに、アキュムレータの各ユニオン要素(タプル)に対して最初の要素を加えたタプルをユニオンで追加
    // 例) 最初のTが[1, 2, 3] で、今のTが[3]の場合
    // Result = [] | [1] | [2] | [1, 2]
    // First = 3
    // -> [...Result, First] = [3] | [1, 3] | [2, 3] | [1, 2, 3]
    ? Subsequence<Rest, Result | [...Result, First]>
    // T が空になったら再帰終了
    : Result 

// 解法２: アキュムレータを使用しないトップダウン型アプローチ
type Subsequence2<T extends any[]> =
  // タプルのはじめの要素と残りにわける
  T extends [infer First, ...infer Rest]
    // 例) Tが[1, 2] の場合
    // First = 1
    // Rest = [2]
    // -> [1, ...Subsequence2<[2]>]  | Subsequence2<[2]>
    // Subsequence2<[2]> は `[2] | []` なので
    // -> [1, ...([2] | [])]         | [2] | []
    // タプルの中のユニオンが展開されて
    // -> [1, ...[2]] | [1, ...[]]   | [2] | []
    // -> [1, 2]      | [1]          | [2] | []
    ? [First, ...Subsequence2<Rest>] | Subsequence2<Rest>
    : []

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type ng = SubsequenceNG<['x', 'y']>

type cases = [
  Expect<Equal<Subsequence<[1, 2]>, [] | [1] | [2] | [1, 2]>>,
  Expect<Equal<Subsequence<[1, 2, 3]>, [] | [1] | [2] | [1, 2] | [3] | [1, 3] | [2, 3] | [1, 2, 3]>>,
  Expect<Equal<Subsequence<[1, 2, 3, 4, 5]>, [] |
  [1] | [2] | [3] | [4] | [5] |
  [1, 2] | [1, 3] | [1, 4] | [1, 5] | [2, 3] | [2, 4] | [2, 5] | [3, 4] | [3, 5] | [4, 5] |
  [1, 2, 3] | [1, 2, 4] | [1, 2, 5] | [1, 3, 4] | [1, 3, 5] | [1, 4, 5] | [2, 3, 4] | [2, 3, 5] | [2, 4, 5] | [3, 4, 5] |
  [1, 2, 3, 4] | [1, 2, 3, 5] | [1, 2, 4, 5] | [1, 3, 4, 5] | [2, 3, 4, 5] |
  [1, 2, 3, 4, 5] >>,
  Expect<Equal<Subsequence<['a', 'b', 'c']>, [] |
  ['a'] | ['b'] | ['c'] |
  ['a', 'b'] | ['a', 'c'] | ['b', 'c'] |
  ['a', 'b', 'c'] >>,
  Expect<Equal<Subsequence<['x', 'y']>, [] |
  ['x'] | ['y'] |
  ['x', 'y'] >>,
]

type cases2 = [
  Expect<Equal<Subsequence2<[1, 2]>, [] | [1] | [2] | [1, 2]>>,
  Expect<Equal<Subsequence2<[1, 2, 3]>, [] | [1] | [2] | [1, 2] | [3] | [1, 3] | [2, 3] | [1, 2, 3]>>,
  Expect<Equal<Subsequence2<[1, 2, 3, 4, 5]>, [] |
  [1] | [2] | [3] | [4] | [5] |
  [1, 2] | [1, 3] | [1, 4] | [1, 5] | [2, 3] | [2, 4] | [2, 5] | [3, 4] | [3, 5] | [4, 5] |
  [1, 2, 3] | [1, 2, 4] | [1, 2, 5] | [1, 3, 4] | [1, 3, 5] | [1, 4, 5] | [2, 3, 4] | [2, 3, 5] | [2, 4, 5] | [3, 4, 5] |
  [1, 2, 3, 4] | [1, 2, 3, 5] | [1, 2, 4, 5] | [1, 3, 4, 5] | [2, 3, 4, 5] |
  [1, 2, 3, 4, 5] >>,
  Expect<Equal<Subsequence2<['a', 'b', 'c']>, [] |
  ['a'] | ['b'] | ['c'] |
  ['a', 'b'] | ['a', 'c'] | ['b', 'c'] |
  ['a', 'b', 'c'] >>,
  Expect<Equal<Subsequence2<['x', 'y']>, [] |
  ['x'] | ['y'] |
  ['x', 'y'] >>,
]
