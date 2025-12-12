/*
 * 531 - string-to-union
 * Difficulty: medium
 */

/* _____________ Your Code Here _____________ */
// 初期値 never のアキュムレータ U に結果を積み上げていく
type StringToUnion<T extends string, U = never> =
  // リテラルタイプ型を用いて、最初の文字と残りの文字にわける
  T extends `${infer F}${infer R}`
    // 1文字以上取れる場合は U の末尾にユニオンで積み上げ
    ? StringToUnion<R, U | F>
    // 文字列 R が空になったらUを返す
    : U

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<StringToUnion<''>, never>>,
  Expect<Equal<StringToUnion<'t'>, 't'>>,
  Expect<Equal<StringToUnion<'hello'>, 'h' | 'e' | 'l' | 'l' | 'o'>>,
  Expect<Equal<StringToUnion<'coronavirus'>, 'c' | 'o' | 'r' | 'o' | 'n' | 'a' | 'v' | 'i' | 'r' | 'u' | 's'>>,
]
