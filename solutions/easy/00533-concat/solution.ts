/*
 * 533 - concat
 * Difficulty: easy
 */

/* _____________ Your Code Here _____________ */
// 新しい配列の中で、それぞれの配列をスプレッド構文により展開して連結する
// type Concat<T, U> = [...T, ...U]   // → 最後がエラーにならない
// T と U がそれぞれ配列である制約をつける
// type Concat<T extends any[], U extends any[]> = [...T, ...U]  // → 3番目の `typeof tuple`「 型 'readonly [1]' は制約 'any[]' を満たしていません。」となる
// 制約にreadonly をつけると、readonly な配列と、可変な配列の両方の制約となる
type Concat<T extends readonly any[], U extends readonly any[]> = [...T, ...U]


/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

const tuple = [1] as const

type cases = [
  Expect<Equal<Concat<[], []>, []>>,
  Expect<Equal<Concat<[], [1]>, [1]>>,
  Expect<Equal<Concat<typeof tuple, typeof tuple>, [1, 1]>>,
  Expect<Equal<Concat<[1, 2], [3, 4]>, [1, 2, 3, 4]>>,
  Expect<Equal<Concat<['1', 2, '3'], [false, boolean, '4']>, ['1', 2, '3', false, boolean, '4']>>,
]

// @ts-expect-error
type error = Concat<null, undefined>
