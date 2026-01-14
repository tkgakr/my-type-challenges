/*
 * 7544 - construct-tuple
 * Difficulty: medium
 */

/* _____________ Your Code Here _____________ */
// 再帰を用いてタプルを構築する。再帰深度制限により1000以上は扱えないが、要件の999までは動作する。
type ConstructTuple<L extends number, R extends unknown[] = []> =
  R['length'] extends L
    ? R
    : ConstructTuple<L, [...R, unknown]>


// string を number に変換する
type ParseInt<T extends string> =
  T extends `${infer Digit extends number}` ? Digit : never
// タプルの長さを10倍にする
type Expand10<T extends any[]> = [...T, ...T, ...T, ...T, ...T, ...T, ...T, ...T, ...T, ...T]

// 1000を超えるタプルを生成する拡張版
type ConstructTupleEx<S extends number | string, R extends any[] = []> =
  // 左端の桁と残りの桁に分離
  `${S}` extends `${infer L}${infer Rest}`
    // アキュムレータの長さを10倍にしたものに、左端の桁の長さ分のタプルを結合して、残りの桁を再帰処理
    ? ConstructTupleEx<Rest, [...Expand10<R>, ...ConstructTuple<ParseInt<L>>]>
    // 全ての桁を処理し終わったらアキュムレータを返す
    : R
/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<ConstructTuple<0>, []>>,
  Expect<Equal<ConstructTuple<2>, [unknown, unknown]>>,
  Expect<Equal<ConstructTuple<999>['length'], 999>>,
  // @ts-expect-error
  Expect<Equal<ConstructTuple<1000>['length'], 1000>>,
]

type cases2 = [
  Expect<Equal<ConstructTupleEx<0>, []>>,
  Expect<Equal<ConstructTupleEx<2>, [unknown, unknown]>>,
  Expect<Equal<ConstructTupleEx<999>['length'], 999>>,
  Expect<Equal<ConstructTupleEx<1000>['length'], 1000>>,
  Expect<Equal<ConstructTupleEx<9999>['length'], 9999>>,
]
