/*
 * 15 - last
 * Difficulty: medium
 */

/* _____________ Your Code Here _____________ */
// #14 First の別解 (infer を使った解法) を前後反転させる。
// Conditional Types と 可変長タプル型(Variadic Tuple Types)を利用して、最後の要素とそれ以外にわける。
type Last<T extends any[]> = T extends [...infer _, infer L] ? L : never

// 別解
// 先頭に番兵を差し込んだタプルを用意し、元のタプル長をインデックスとして参照するアイデア:
// type Last2<T extends any[]> = [any, ...T][T['length']];
// → この解は空タプルの場合に番兵の any が返ってしまい、期待する never にならない。
//
// 改良版: 最初の要素と残りに分ける方針をとり、残りの要素の長さを T の要素番号として取り出す。
// 空タプルの場合は条件分岐で never を返す。
type Last2<T extends any[]> = T extends [infer First, ...infer Rest] ? T[Rest['length']] : never;


/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Last<[]>, never>>,
  Expect<Equal<Last<[2]>, 2>>,
  Expect<Equal<Last<[3, 2, 1]>, 1>>,
  Expect<Equal<Last<[() => 123, { a: string }]>, { a: string }>>,
]

type cases2 = [
  Expect<Equal<Last2<[]>, never>>,
  Expect<Equal<Last2<[2]>, 2>>,
  Expect<Equal<Last2<[3, 2, 1]>, 1>>,
  Expect<Equal<Last2<[() => 123, { a: string }]>, { a: string }>>,
]
