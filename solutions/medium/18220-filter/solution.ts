/*
 * 18220 - filter
 * Difficulty: medium
 */

/* _____________ Your Code Here _____________ */
// 解法1: アキュムレータを使用しないアプローチ
type Filter<T extends any[], P> =
  T extends [infer First, ...infer Rest]
    ? First extends P
      ? [First, ...Filter<Rest, P>]
      : Filter<Rest, P>
    : []

// 解法2: アキュムレータを使用するアプローチ
type Filter2<T extends any[], P, Result extends any[] = []> =
  T extends [infer First, ...infer Rest]
    ? First extends P
      ? Filter2<Rest, P, [...Result, First]>
      : Filter2<Rest, P, Result>
    : Result

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type Falsy = false | 0 | '' | null | undefined

type cases = [
  Expect<Equal<Filter<[0, 1, 2], 2>, [2]>>,
  Expect<Equal<Filter<[0, 1, 2], 0 | 1>, [0, 1]>>,
  Expect<Equal<Filter<[0, 1, 2], Falsy>, [0]>>,
]

type cases2 = [
  Expect<Equal<Filter2<[0, 1, 2], 2>, [2]>>,
  Expect<Equal<Filter2<[0, 1, 2], 0 | 1>, [0, 1]>>,
  Expect<Equal<Filter2<[0, 1, 2], Falsy>, [0]>>,
]
