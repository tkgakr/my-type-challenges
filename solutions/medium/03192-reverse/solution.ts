/*
 * 3192 - reverse
 * Difficulty: medium
 */

/* _____________ Your Code Here _____________ */
// 解法1: 最初の要素を後ろにつめていく再帰処理
type Reverse<T extends any[]> =
  T extends [infer First, ...infer Rest]
    ? [...Reverse<Rest>, First]
    : []

// 解法2: 最後の要素を前につめていく再帰処理
type Reverse2<T extends any[]> =
  T extends [...infer Rest, infer Last]
    ? [Last, ...Reverse2<Rest>]
    : []

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Reverse<[]>, []>>,
  Expect<Equal<Reverse<['a', 'b']>, ['b', 'a']>>,
  Expect<Equal<Reverse<['a', 'b', 'c']>, ['c', 'b', 'a']>>,
]

type errors = [
  // @ts-expect-error
  Reverse<'string'>,
  // @ts-expect-error
  Reverse<{ key: 'value' }>,
]

type cases2 = [
  Expect<Equal<Reverse2<[]>, []>>,
  Expect<Equal<Reverse2<['a', 'b']>, ['b', 'a']>>,
  Expect<Equal<Reverse2<['a', 'b', 'c']>, ['c', 'b', 'a']>>,
]

type errors2 = [
  // @ts-expect-error
  Reverse2<'string'>,
  // @ts-expect-error
  Reverse2<{ key: 'value' }>,
]
