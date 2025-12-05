/*
 * 116 - replace
 * Difficulty: medium
 */

/* _____________ Your Code Here _____________ */
// テンプレートリテラル型を使う
type Replace<S extends string, From extends string, To extends string> =
  From extends ''
    ? S
    : S extends `${infer L}${From}${infer R}`
      ? `${L}${To}${R}`
      : S

// 別解 From の 条件型をインラインにする
type Replace2<S extends string, From extends string, To extends string> =
  S extends `${infer L}${From extends '' ? never : From}${infer R}`
    ? `${L}${To}${R}`
    : S

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Replace<'foobar', 'bar', 'foo'>, 'foofoo'>>,
  Expect<Equal<Replace<'foobarbar', 'bar', 'foo'>, 'foofoobar'>>,
  Expect<Equal<Replace<'foobarbar', '', 'foo'>, 'foobarbar'>>,
  Expect<Equal<Replace<'foobarbar', 'bar', ''>, 'foobar'>>,
  Expect<Equal<Replace<'foobarbar', 'bra', 'foo'>, 'foobarbar'>>,
  Expect<Equal<Replace<'', '', ''>, ''>>,
]

type cases2 = [
  Expect<Equal<Replace2<'foobar', 'bar', 'foo'>, 'foofoo'>>,
  Expect<Equal<Replace2<'foobarbar', 'bar', 'foo'>, 'foofoobar'>>,
  Expect<Equal<Replace2<'foobarbar', '', 'foo'>, 'foobarbar'>>,
  Expect<Equal<Replace2<'foobarbar', 'bar', ''>, 'foobar'>>,
  Expect<Equal<Replace2<'foobarbar', 'bra', 'foo'>, 'foobarbar'>>,
  Expect<Equal<Replace2<'', '', ''>, ''>>,
]
