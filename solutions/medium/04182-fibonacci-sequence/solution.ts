/*
 * 4182 - fibonacci-sequence
 * Difficulty: medium
 */

/* _____________ Your Code Here _____________ */
// タプルの要素数で加算するアプローチ
// 前提として、解はタプルの長さの上限を超えられない
type Fibonacci<
  T extends number,
  // 現在のインデックス（1始まり）
  CurrentIndex extends any[] = [1],
  // ひとつ前の値
  Prev extends any[] = [],
  // 現在の値
  Current extends any[] = [1]
> =
  // 現在のインデックスが `T` に到達したかをチェック
  CurrentIndex['length'] extends T
    // 現在値の要素数を返す
    ? Current['length']
    // 再帰処理
    : Fibonacci<
      T,
      // インデックスのインクリメント
      [...CurrentIndex, 1],
      // 再帰処理におけるひとつ前の値
      Current,
      // ひとつ前の値(要素数)と現在の値(要素数)をスプレッド構文により合成する
      [...Prev, ...Current]
    >
/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Fibonacci<1>, 1>>,
  Expect<Equal<Fibonacci<2>, 1>>,
  Expect<Equal<Fibonacci<3>, 2>>,
  Expect<Equal<Fibonacci<8>, 21>>,
]
