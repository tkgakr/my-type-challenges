/*
 * 30958 - pascals-triangle
 * Difficulty: medium
 */

/* _____________ Your Code Here _____________ */

// ユーティリティ: 要素数 N 個のタプルを作成する（数値→タプル長への変換に使用）
// 例: Tuple<3> => [1, 1, 1]
type Tuple<N extends number, Result extends any[] = []> =
  Result['length'] extends N
    ? Result
    : Tuple<N, [...Result, 1]>;

// ユーティリティ: A + B の和を型レベルで求める
// Tuple で各数値をタプルに変換し、スプレッドで結合した長さを取得する
// 例: Add<2, 3> => 5
type Add<A extends number, B extends number> = [
  ...Tuple<A>,
  ...Tuple<B>
]['length'];

// 前の行の隣接する要素同士を足し合わせて、次の行の「内側部分」を生成する
// 先頭2要素を取り出して足し、残りに対して再帰的に処理する
// 例: AddRow<[1, 2, 1]> => [3, 3]  （1+2=3, 2+1=3）
type AddRow<Row extends number[]> =
  Row extends [
    infer A extends number,
    infer B extends number,
    ...infer R extends number[]
  ]
    ? [Add<A, B>, ...AddRow<[B, ...R]>]
    : [];

// ユーティリティ: 配列の最後の要素を取得する
type Last<T extends unknown[]> = T extends [...infer _, infer L] ? L : never;

// メイン: パスカルの三角形を N 行分構築する
// 初期値 [[1]] から開始し、前の行の最後の行を取得して
// [1, ...AddRow<前の行>, 1] で次の行を生成し、Rows に追加していく
// Rows の長さが N に達したら完成
type Pascal<N extends number, Rows extends number[][] = [[1]]> =
  Rows['length'] extends N
    ? Rows
    : Pascal<N, [...Rows, [1, ...AddRow<Last<Rows>>, 1]]>;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<
    Equal<
      Pascal<1>,
      [
        [1],
      ]
    >
  >,
  Expect<
    Equal<
      Pascal<3>,
      [
        [1],
        [1, 1],
        [1, 2, 1],
      ]
    >
  >,
  Expect<
    Equal<
      Pascal<5>,
      [
        [1],
        [1, 1],
        [1, 2, 1],
        [1, 3, 3, 1],
        [1, 4, 6, 4, 1],
      ]
    >
  >,
  Expect<
    Equal<
      Pascal<7>,
      [
        [1],
        [1, 1],
        [1, 2, 1],
        [1, 3, 3, 1],
        [1, 4, 6, 4, 1],
        [1, 5, 10, 10, 5, 1],
        [1, 6, 15, 20, 15, 6, 1],
      ]
    >
  >,
]
