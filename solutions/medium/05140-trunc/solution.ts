/*
 * 5140 - trunc
 * Difficulty: medium
 */

/* _____________ Your Code Here _____________ */
type Trunc<T extends number | string> =
  // テンプレートリテラルで文字列に変換して条件型を適用させる
  // 小数点の有無をチェック(I: Integer, D: Decimal)
  `${T}` extends `${infer I}.${infer D}`
    // 整数部分がない場合、0 を省略することがある
    ? I extends '' | '-'
      ? `${I}0`
      : I
    : `${T}`

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Trunc<0.1>, '0'>>,
  Expect<Equal<Trunc<0.2>, '0'>>,
  Expect<Equal<Trunc<1.234>, '1'>>,
  Expect<Equal<Trunc<12.345>, '12'>>,
  Expect<Equal<Trunc<-5.1>, '-5'>>,
  Expect<Equal<Trunc<'.3'>, '0'>>,
  Expect<Equal<Trunc<'1.234'>, '1'>>,
  Expect<Equal<Trunc<'-.3'>, '-0'>>,
  Expect<Equal<Trunc<'-10.234'>, '-10'>>,
  Expect<Equal<Trunc<10>, '10'>>,
]
