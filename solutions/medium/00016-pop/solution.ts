/*
 * 16 - pop
 * Difficulty: medium
 */

/* _____________ Your Code Here _____________ */
// #15 Last をベースに最後の要素を除いた残りを返す
type Pop<T extends any[]> = T extends [...infer Rest, infer Last] ? Rest : []

// 以下おまけ

// スプレッド構文で分解した可変長タプル(スタック)に要素を追加
type Push<T extends any[], U> = [...T, U]

// #14 First の別解をベースに最初の要素を除いた残りを返す
type Shift<T extends any[]> = T extends [infer First, ...infer Rest] ? Rest : []

// Push の逆で、タプルの先頭に要素を追加する
type Unshift<T extends any[], U> = [U, ...T]


/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Pop<[3, 2, 1]>, [3, 2]>>,
  Expect<Equal<Pop<['a', 'b', 'c', 'd']>, ['a', 'b', 'c']>>,
  Expect<Equal<Pop<[]>, []>>,
]

type cases2 = [
  Expect<Equal<Push<[3, 2], 1>, [3, 2, 1]>>,
  Expect<Equal<Push<['a', 'b', 'c'], 'd'>, ['a', 'b', 'c', 'd']>>,
  Expect<Equal<Push<[], {a: 'b'}>, [{a: 'b'}]>>,
]

type cases3 = [
  Expect<Equal<Shift<[3, 2, 1]>, [2, 1]>>,
  Expect<Equal<Shift<['a', 'b', 'c', 'd']>, ['b', 'c', 'd']>>,
  Expect<Equal<Shift<[]>, []>>,
]

type cases4 = [
  Expect<Equal<Unshift<[3, 2], 1>, [1, 3, 2]>>,
  Expect<Equal<Unshift<['a', 'b', 'c'], 'd'>, ['d', 'a', 'b', 'c']>>,
  Expect<Equal<Unshift<[], {a: 'b'}>, [{a: 'b'}]>>,
]
