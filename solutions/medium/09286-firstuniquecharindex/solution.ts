/*
 * 9286 - firstuniquecharindex
 * Difficulty: medium
 */

/* _____________ Your Code Here _____________ */
// 解法1: 処理済みの文字を保存しておくアキュムレータを用意し、前後それぞれで存在チェックするアプローチ
type FirstUniqueCharIndex<T extends string, A extends string[] = []> =
  T extends `${infer First}${infer Rest}`
    // アキュムレータをユニオンに変換し、Firstが過去に登場したかをチェック
    ? First extends A[number]
      // 過去に登場したことがある場合は残りの文字列で再帰
      ? FirstUniqueCharIndex<Rest, [...A, First]>
      // 過去に登場したことがない場合は後ろにFirstが登場するかチェック
      : Rest extends `${string}${First}${string}`
        // うしろに登場する場合は残りの文字列で再帰
        ? FirstUniqueCharIndex<Rest, [...A, First]>
        // 前後どちらにも登場しなければアキュムレータの長さが現在の位置なのでそれを返す
        : A['length']
    // 全ての文字が重複する文字として処理された
    : -1

// 解法2: T に対して 1文字ずつチェックするアプローチ
type FirstUniqueCharIndex2<T extends string, U extends string = T, Index extends any[] = []> =
  // 処理中文字列の先頭 C を取り出す
  U extends `${infer C}${infer Rest}`
    // C が T に2回以上登場するかチェック
    ? T extends `${string}${C}${string}${C}${string}`
      // 2回以上登場する場合は残りの文字列で再帰
      ? FirstUniqueCharIndex2<T, Rest, [...Index, 1]>
      // C が1回しか登場しなければ、現在の位置を返す
      : Index['length']
    // 全ての文字が重複する文字として処理された
    : -1
/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<FirstUniqueCharIndex<'leetcode'>, 0>>,
  Expect<Equal<FirstUniqueCharIndex<'loveleetcode'>, 2>>,
  Expect<Equal<FirstUniqueCharIndex<'aabb'>, -1>>,
  Expect<Equal<FirstUniqueCharIndex<''>, -1>>,
  Expect<Equal<FirstUniqueCharIndex<'aaa'>, -1>>,
]

type cases2 = [
  Expect<Equal<FirstUniqueCharIndex2<'leetcode'>, 0>>,
  Expect<Equal<FirstUniqueCharIndex2<'loveleetcode'>, 2>>,
  Expect<Equal<FirstUniqueCharIndex2<'aabb'>, -1>>,
  Expect<Equal<FirstUniqueCharIndex2<''>, -1>>,
  Expect<Equal<FirstUniqueCharIndex2<'aaa'>, -1>>,
]
