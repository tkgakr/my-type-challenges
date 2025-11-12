/*
 * 14 - first
 * Difficulty: easy
 */

/* _____________ Your Code Here _____________ */
// Lookup 型を使用して、配列の最初の要素を取得した場合、空の配列に対応できない。
// type First<T extends any[]> = T[0]
// Conditional 型を使用して、配列のが空かどうかを判定して、空の場合は never を返す。空でない場合は、配列の最初の要素を返す
type First<T extends any[]> = T extends [] ? never : T[0]
// 別解 : Conditional 型で要素があることを判定した後、要素を返す
// type First<T extends any[]> = T extends [infer First, ...infer Rest] ? First : never

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<First<[3, 2, 1]>, 3>>,
  Expect<Equal<First<[() => 123, { a: string }]>, () => 123>>,
  Expect<Equal<First<[]>, never>>,
  Expect<Equal<First<[undefined]>, undefined>>,
]

type errors = [
  // @ts-expect-error
  First<'notArray'>,
  // @ts-expect-error
  First<{ 0: 'arrayLike' }>,
]

// 問題文より
type arr1 = ['a', 'b', 'c']
type arr2 = [3, 2, 1]

type head1 = First<arr1> // expected to be 'a'
type head2 = First<arr2> // expected to be 3
