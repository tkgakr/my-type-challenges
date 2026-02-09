/*
 * 28333 - public-type
 * Difficulty: medium
 */

/* _____________ Your Code Here _____________ */
type PublicType<T extends object> = {
  // プロパティーキー `K` に対して `_` で始まるものを除外する
  [K in keyof T as K extends `_${string}` ? never : K]: T[K]
}

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<PublicType<{ a: number }>, { a: number }>>,
  Expect<Equal<PublicType<{ _b: string | bigint }>, {}>>,
  Expect<Equal<PublicType<{ readonly c?: number }>, { readonly c?: number }>>,
  Expect<Equal<PublicType<{ d: string, _e: string }>, { d: string }>>,
  Expect<Equal<PublicType<{ _f: () => bigint[] }>, {}>>,
  Expect<Equal<PublicType<{ g: '_g' }>, { g: '_g' }>>,
  Expect<Equal<PublicType<{ __h: number, i: unknown }>, { i: unknown }>>,
]
