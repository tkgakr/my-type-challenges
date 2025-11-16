/*
 * 268 - if
 * Difficulty: easy
 */

/* _____________ Your Code Here _____________ */
// 問題文には「条件値`C` は`true`か`false`のどちらかであることが期待」と書いてあるので、
// 条件値 C が true または false であることを制約する
type If<C extends boolean, T, F> = C extends true ? T : F

// [発展]
// 条件値 C に制約を持たせず、falsy であれば F、truthy であれば T を返す型を作ってみる
// まずは、falsy をすべて集めたユニオン型を作る
// (JavaScript では空配列や空オブジェクトは truthyなので注意)
// https://typescriptbook.jp/reference/values-types-variables/truthy-falsy-values
type Falsy = false | 0 | 0n | '' | null | undefined // このユニオン型に `NaN` を含めようとすると、型ではないと怒られる
// NaN はリテラル型としては表現できず、型レベルでは number に丸められるため、
// 「NaN を含む幅広い数値型」と「真偽判定できる具体的な数値リテラル型」を区別する
// そのため、number が C に代入可能かどうかで分岐する
type MyIf<C, T, F> = C extends Falsy
  ? F
  : C extends number
    ? (number extends C ? F : T)
    : T
/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<If<true, 'a', 'b'>, 'a'>>,
  Expect<Equal<If<false, 'a', 2>, 2>>,
  Expect<Equal<If<boolean, 'a', 2>, 'a' | 2>>,
  Expect<Equal<MyIf<true, 'a', 'b'>, 'a'>>,
  Expect<Equal<MyIf<false, 'a', 2>, 2>>,
  Expect<Equal<MyIf<boolean, 'a', 2>, 'a' | 2>>,
  Expect<Equal<MyIf<'hoge', 'a', 'b'>, 'a'>>,
  Expect<Equal<MyIf<'', 'a', 'b'>, 'b'>>,
  Expect<Equal<MyIf<[], 'a', 'b'>, 'a'>>,
  Expect<Equal<MyIf<{}, 'a', 'b'>, 'a'>>,
  Expect<Equal<MyIf<null, 'a', 'b'>, 'b'>>,
  Expect<Equal<MyIf<number, 'a', 'b'>, 'b'>>,
]

// @ts-expect-error
type error = If<null, 'a', 'b'>
// @ts-expect-error
type error2 = If<[], 'a', 'b'>

type truthy1 = MyIf<'hoge', 'a', 'b'>
type truthy2 = MyIf<[], 'a', 'b'>
type falsy1 = MyIf<null, 'a', 'b'>
