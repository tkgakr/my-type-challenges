/*
 * 4471 - zip
 * Difficulty: medium
 */

/* _____________ Your Code Here _____________ */
// 解法1: infer による推論で、左側の要素から再帰処理で詰めていくアプローチ
type Zip<T extends any[], U extends any[]> =
  T extends [infer TF, ...infer TR]
    ? U extends [infer UF, ...infer UR]
      ? [[TF, UF], ...Zip<TR, UR>]
      : []
    : []

// 解法2: アキュムレータの長さによるインデックス指定で、再帰処理するアプローチ
type Zip2<T extends any[], U extends any[], Result extends any[] = []> =
  // アキュムレータの長さが T または U の長さに達したかをチェック
  Result['length'] extends T['length'] | U['length']
    // T または U のどちらか短い方に達した場合
    ? Result
    // どちらの長さにも達していない場合は、アキュムレータの長さをインデックスにして、
    // T と U の要素を組み合わせた配列をアキュムレータに追加して再帰処理する
    : Zip2<T, U, [...Result, [T[Result['length']], U[Result['length']]]]>

  /* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Zip<[], []>, []>>,
  Expect<Equal<Zip<[1, 2], [true, false]>, [[1, true], [2, false]]>>,
  Expect<Equal<Zip<[1, 2, 3], ['1', '2']>, [[1, '1'], [2, '2']]>>,
  Expect<Equal<Zip<[], [1, 2, 3]>, []>>,
  Expect<Equal<Zip<[[1, 2]], [3]>, [[[1, 2], 3]]>>,
]

type cases2 = [
  Expect<Equal<Zip2<[], []>, []>>,
  Expect<Equal<Zip2<[1, 2], [true, false]>, [[1, true], [2, false]]>>,
  Expect<Equal<Zip2<[1, 2, 3], ['1', '2']>, [[1, '1'], [2, '2']]>>,
  Expect<Equal<Zip2<[], [1, 2, 3]>, []>>,
  Expect<Equal<Zip2<[[1, 2]], [3]>, [[[1, 2], 3]]>>,
]
