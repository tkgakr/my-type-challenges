/*
 * 5360 - unique
 * Difficulty: medium
 */

/* _____________ Your Code Here _____________ */
// 配列の中に要素が存在するかをチェックする
type Exists<T extends any[], U> =
  T extends [infer First, ...infer Rest]
    ? Equal<First, U> extends true
      ? true
      : Exists<Rest, U>
    : false
// 解法1: アキュムレータを配列とし、ユニークな要素を追加していくアプローチ
type Unique<T extends any[], Result extends any[] = []> =
  T extends [infer First, ...infer Rest]
    ? Exists<Result, First> extends true
      ? Unique<Rest, Result>
      : Unique<Rest, [...Result, First]>
    : Result

// 解法2 アキュムレータをユニオンとし、ユニークな要素を追加していくアプローチ
type Unique2<T, U = never> =
  T extends [infer First, ...infer Rest]
    // U を分配し、各要素(配列でラップされた形式)と[First]が一致するかをチェックする。
    // true と false のユニオンは結果としてtrue となるので、ユニオンの中に [First] と一致するものがあれば true となる
    ? true extends (U extends U ? Equal<U, [First]> : never)
      ? Unique2<Rest, U>
      // First を配列でラップすることで、ユニオン型の分配を防ぎ、要素全体を1つの単位として比較できるようにする
      : [First, ...Unique2<Rest, U | [First]>]
    : []
/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Unique<[1, 1, 2, 2, 3, 3]>, [1, 2, 3]>>,
  Expect<Equal<Unique<[1, 2, 3, 4, 4, 5, 6, 7]>, [1, 2, 3, 4, 5, 6, 7]>>,
  Expect<Equal<Unique<[1, 'a', 2, 'b', 2, 'a']>, [1, 'a', 2, 'b']>>,
  Expect<Equal<Unique<[string, number, 1, 'a', 1, string, 2, 'b', 2, number]>, [string, number, 1, 'a', 2, 'b']>>,
  Expect<Equal<Unique<[unknown, unknown, any, any, never, never]>, [unknown, any, never]>>,
]

type cases2 = [
  Expect<Equal<Unique2<[1, 1, 2, 2, 3, 3]>, [1, 2, 3]>>,
  Expect<Equal<Unique2<[1, 2, 3, 4, 4, 5, 6, 7]>, [1, 2, 3, 4, 5, 6, 7]>>,
  Expect<Equal<Unique2<[1, 'a', 2, 'b', 2, 'a']>, [1, 'a', 2, 'b']>>,
  Expect<Equal<Unique2<[string, number, 1, 'a', 1, string, 2, 'b', 2, number]>, [string, number, 1, 'a', 2, 'b']>>,
  Expect<Equal<Unique2<[unknown, unknown, any, any, never, never]>, [unknown, any, never]>>,
]
