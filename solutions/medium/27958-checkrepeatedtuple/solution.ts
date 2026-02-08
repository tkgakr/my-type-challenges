/*
 * 27958 - checkrepeatedtuple
 * Difficulty: medium
 */

/* _____________ Your Code Here _____________ */
// タプルTの中に要素 U を含むかチェックする
type Includes<T extends readonly any[], U> =
  T extends [infer First, ...infer Rest]
    ? Equal<First, U> extends true
      ? true
      : Includes<Rest, U>
    : false

// 解法1: 調査済みの要素を アキュムレータ U に保持するアプローチ
type CheckRepeatedTuple<T extends unknown[], Checked extends unknown[]= [] > =
  T extends [infer First, ...infer Rest]
    // 既にチェック済みの要素に含まれるかチェック
    ? Includes<Checked, First> extends true
      ? true
      // チェック済み要素の First を追加し、残りの要素で再帰
      : CheckRepeatedTuple<Rest, [...Checked, First]>
    // 全ての要素をチェックし終えたらfalse を返す
    :false

// 解法2: 要素を順番に、後続要素に存在するかをチェックするアプローチ
// 解法1が 重複する後側で再帰終了するのに対し、こちらは最初に登場した時点で再帰終了する
type CheckRepeatedTuple2<T extends unknown[]> =
  T extends [infer First, ...infer Rest]
    // 後続要素に First が含まれるかチェック
    ? Includes<Rest, First> extends true
      ? true
      // 残りの要素で再帰
      : CheckRepeatedTuple2<Rest>
    // 全ての要素をチェックし終えたらfalse を返す
    :false


/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<CheckRepeatedTuple<[number, number, string, boolean]>, true>>,
  Expect<Equal<CheckRepeatedTuple<[number, string]>, false>>,
  Expect<Equal<CheckRepeatedTuple<[1, 2, 3]>, false>>,
  Expect<Equal<CheckRepeatedTuple<[1, 2, 1]>, true>>,
  Expect<Equal<CheckRepeatedTuple<[]>, false>>,
  Expect<Equal<CheckRepeatedTuple<string[]>, false>>,
  Expect<Equal<CheckRepeatedTuple<[number, 1, string, '1', boolean, true, false, unknown, any]>, false>>,
  Expect<Equal<CheckRepeatedTuple<[never, any, never]>, true>>,
]

type cases2 = [
  Expect<Equal<CheckRepeatedTuple2<[number, number, string, boolean]>, true>>,
  Expect<Equal<CheckRepeatedTuple2<[number, string]>, false>>,
  Expect<Equal<CheckRepeatedTuple2<[1, 2, 3]>, false>>,
  Expect<Equal<CheckRepeatedTuple2<[1, 2, 1]>, true>>,
  Expect<Equal<CheckRepeatedTuple2<[]>, false>>,
  Expect<Equal<CheckRepeatedTuple2<string[]>, false>>,
  Expect<Equal<CheckRepeatedTuple2<[number, 1, string, '1', boolean, true, false, unknown, any]>, false>>,
  Expect<Equal<CheckRepeatedTuple2<[never, any, never]>, true>>,
]
