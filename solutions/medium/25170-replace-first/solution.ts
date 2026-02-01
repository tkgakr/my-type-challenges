/*
 * 25170 - replace-first
 * Difficulty: medium
 */

/* _____________ Your Code Here _____________ */
// 解法1: アキュムレータを使用せず再帰をスタックするアプローチ
type ReplaceFirst<T extends readonly unknown[], S, R> =
  T extends [infer First, ...infer Rest]
    // 最初の要素が置換対象にマッチするかチェック
    ? First extends S
      // 置換対象とマッチしたら、置き換えて再帰終了
      ? [R, ...Rest]
      // 一致しなければ、残りの要素に対して再帰
      : [First, ...ReplaceFirst<Rest, S, R>]
    // 要素がなくなったら空タプルを返す(`T` でも同じ)
    : []

// 解法2: アキュムレータを使用したアプローチ
type ReplaceFirst2<T extends readonly unknown[], S, R, Prev extends readonly unknown[] = []> =
  T extends [infer First, ...infer Rest]
    ? First extends S
      ? [...Prev, R, ...Rest]
      : ReplaceFirst2<Rest, S, R, [...Prev, First]>
    : Prev

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<ReplaceFirst<[1, 2, 3], 3, 4>, [1, 2, 4]>>,
  Expect<Equal<ReplaceFirst<['A', 'B', 'C'], 'C', 'D'>, ['A', 'B', 'D']>>,
  Expect<Equal<ReplaceFirst<[true, true, true], true, false>, [false, true, true]>>,
  Expect<Equal<ReplaceFirst<[string, boolean, number], boolean, string>, [string, string, number]>>,
  Expect<Equal<ReplaceFirst<[1, 'two', 3], string, 2>, [1, 2, 3]>>,
  Expect<Equal<ReplaceFirst<['six', 'eight', 'ten'], 'eleven', 'twelve'>, ['six', 'eight', 'ten']>>,
]

type cases2 = [
  Expect<Equal<ReplaceFirst2<[1, 2, 3], 3, 4>, [1, 2, 4]>>,
  Expect<Equal<ReplaceFirst2<['A', 'B', 'C'], 'C', 'D'>, ['A', 'B', 'D']>>,
  Expect<Equal<ReplaceFirst2<[true, true, true], true, false>, [false, true, true]>>,
  Expect<Equal<ReplaceFirst2<[string, boolean, number], boolean, string>, [string, string, number]>>,
  Expect<Equal<ReplaceFirst2<[1, 'two', 3], string, 2>, [1, 2, 3]>>,
  Expect<Equal<ReplaceFirst2<['six', 'eight', 'ten'], 'eleven', 'twelve'>, ['six', 'eight', 'ten']>>,
]
