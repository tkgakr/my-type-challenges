/*
 * 298 - length-of-string
 * Difficulty: medium
 */

/* _____________ Your Code Here _____________ */

// オプショナルで、空の配列を初期値として持つ `T` を定義
// 例) LengthOfString<'abc', []>
type LengthOfString<S extends string, T extends string[] = []> =
  // 文字列を先頭1文字(F)と残り(R)に分解
  S extends `${infer F}${infer R}`
    // 先頭の文字をTの末尾に追加し、残りの文字列Rで再帰呼び出し
    // LengthOfString<'bc', ['a']>
    // LengthOfString<'c', ['a', 'b']>
    ? LengthOfString<R, [...T, F]>
    // 文字列Sが空になったら(パターンマッチが失敗したら)配列Tの長さを返す
    // LengthOfString<'', ['a', 'b', 'c']>
    : T['length']
/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<LengthOfString<''>, 0>>,
  Expect<Equal<LengthOfString<'kumiko'>, 6>>,
  Expect<Equal<LengthOfString<'reina'>, 5>>,
  Expect<Equal<LengthOfString<'Sound! Euphonium'>, 16>>,
]
