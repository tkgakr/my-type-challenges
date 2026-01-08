/*
 * 4518 - fill
 * Difficulty: medium
 */

/* _____________ Your Code Here _____________ */
// 解法1 : 結果をアキュムレータに詰めるアプローチ
type Fill<
  T extends unknown[],
  N,
  Start extends number = 0,
  End extends number = T['length'],
  R extends unknown[] = [],
> =
  T extends [infer First, ...infer Rest]
    ? R['length'] extends Start
      // Startに到達
      ? R['length'] extends End
        // Start === End なので N で埋める範囲がない、元の要素をそのまま追加し、以降も埋めないよう -1 で再帰
        ? Fill<Rest, N, -1, -1, [...R, First]>
        // Start に到達し、かつ End には到達していないので N で埋める
        : Fill<Rest, N, [...R, N]['length'], End, [...R, N]>
      // Startに到達していない
      : Fill<Rest, N, Start, End, [...R, First]>
    // T の要素がなくなったら結果を返す
    : R

// 解法2 : N で埋めるかどうか(Start <= インデックス(Index['length']) < End)を Flag にセットするアプローチ
type Fill2<
  T extends unknown[],
  N,
  Start extends number = 0,
  End extends number = T['length'],
  Index extends any[] = [],
  Flag extends boolean = Index['length'] extends Start ? true : false
> = Index['length'] extends End
  // インデックスが End に到達したら T の残りを返して再帰終了
  ? T
  // T を最初の要素と残りの要素に分割
  : T extends [infer First, ...infer Rest]
    // フラグ判定
    ? Flag extends false
      // T の最初の要素は N で埋めずに残りの要素を再帰処理(Flag は省略し、デフォルト引数で次のインデックスが Start に到達したか判定)
      ? [First, ...Fill2<Rest, N, Start, End, [...Index, 1]>]
      // フラグが立っている場合は、Tの最初の要素を N で埋めて残りの要素を再帰処理(Flag は true)
      : [N, ...Fill2<Rest, N, Start, End, [...Index, 1], Flag>]
    // T の要素がなくなれば再帰終了(空配列を返す)
    : T

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Fill<[], 0>, []>>,
  Expect<Equal<Fill<[], 0, 0, 3>, []>>,
  Expect<Equal<Fill<[1, 2, 3], 0, 0, 0>, [1, 2, 3]>>,
  Expect<Equal<Fill<[1, 2, 3], 0, 2, 2>, [1, 2, 3]>>,
  Expect<Equal<Fill<[1, 2, 3], 0>, [0, 0, 0]>>,
  Expect<Equal<Fill<[1, 2, 3], true>, [true, true, true]>>,
  // end を含まず、その直前までを埋める
  Expect<Equal<Fill<[1, 2, 3], true, 0, 1>, [true, 2, 3]>>,
  // start 埋め始める位置のゼロから始まるインデックス
  Expect<Equal<Fill<[1, 2, 3], true, 1, 3>, [1, true, true]>>,
  Expect<Equal<Fill<[1, 2, 3], true, 10, 0>, [1, 2, 3]>>,
  Expect<Equal<Fill<[1, 2, 3], true, 10, 20>, [1, 2, 3]>>,
  Expect<Equal<Fill<[1, 2, 3], true, 0, 10>, [true, true, true]>>,
  // テスト追加
  Expect<Equal<Fill<[1, 2, 3, 4], true, 1, 3>, [1, true, true, 4]>>,
]

type cases2 = [
  Expect<Equal<Fill2<[], 0>, []>>,
  Expect<Equal<Fill2<[], 0, 0, 3>, []>>,
  Expect<Equal<Fill2<[1, 2, 3], 0, 0, 0>, [1, 2, 3]>>,
  Expect<Equal<Fill2<[1, 2, 3], 0, 2, 2>, [1, 2, 3]>>,
  Expect<Equal<Fill2<[1, 2, 3], 0>, [0, 0, 0]>>,
  Expect<Equal<Fill2<[1, 2, 3], true>, [true, true, true]>>,
  Expect<Equal<Fill2<[1, 2, 3], true, 0, 1>, [true, 2, 3]>>,
  Expect<Equal<Fill2<[1, 2, 3], true, 1, 3>, [1, true, true]>>,
  Expect<Equal<Fill2<[1, 2, 3], true, 10, 0>, [1, 2, 3]>>,
  Expect<Equal<Fill2<[1, 2, 3], true, 10, 20>, [1, 2, 3]>>,
  Expect<Equal<Fill2<[1, 2, 3], true, 0, 10>, [true, true, true]>>,
  // テスト追加
  Expect<Equal<Fill2<[1, 2, 3, 4], true, 1, 3>, [1, true, true, 4]>>,
]
