/*
 * 4499 - chunk
 * Difficulty: medium
 */

/* _____________ Your Code Here _____________ */
// 解法1: Result を アキュムレータ として使用するアプローチ
type Chunk<T extends any[], N extends number, C extends any[] = [], R extends any[] = [] > =
  // T を最初の要素と残りに分割
  T extends [infer First, ...infer Rest]
    // C に First を加えた配列の長さが N を満たしたかをチェック
    ? [...C, First]['length'] extends N
      // 長さを満たした場合は C を空にリセットして、R に チャンクを加えて再帰処理
      ? Chunk<Rest, N, [], [...R, [...C, First]]>
      // 長さを満たしていない場合は、チャンクに First を加えて再帰処理
      : Chunk<Rest, N, [...C, First], R>
    // T が空になったら C が空かどうかを確認
    : C extends []
      // C が空なら R をそのまま返す
      ? R
      // 長さN を満たさない場合は、Rの後ろに C を付けて返す
      : [...R, C]


// 解法2: Result を アキュムレータに置かないアプローチ
type Chunk2<T extends any[], N extends number, Swap extends any[] = []> =
  // チャンクの長さをチェック
  Swap['length'] extends N
    // 長さ N を満たした場合は、Swap を先頭に配置して、残りを再帰処理
    ? [Swap, ...Chunk2<T, N>]
    // T を最初の要素と残りに分割
    : T extends [infer K, ...infer L]
      // チャンクに K を詰めて再帰処理
      ? Chunk2<L, N, [...Swap, K]>
      // T の要素がなくなったときチャンクが空かチェック
      : Swap extends []
        // 空の場合はそのまま空配列を返す
        ? Swap
        // 長さN に満たないチャンクは、再帰処理のスプレッド構文で展開されないようにタプルで包んで返す
        : [Swap]

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Chunk<[], 1>, []>>,
  Expect<Equal<Chunk<[1, 2, 3], 1>, [[1], [2], [3]]>>,
  Expect<Equal<Chunk<[1, 2, 3], 2>, [[1, 2], [3]]>>,
  Expect<Equal<Chunk<[1, 2, 3, 4], 2>, [[1, 2], [3, 4]]>>,
  Expect<Equal<Chunk<[1, 2, 3, 4], 5>, [[1, 2, 3, 4]]>>,
  Expect<Equal<Chunk<[1, true, 2, false], 2>, [[1, true], [2, false]]>>,
]

type cases2 = [
  Expect<Equal<Chunk2<[], 1>, []>>,
  Expect<Equal<Chunk2<[1, 2, 3], 1>, [[1], [2], [3]]>>,
  Expect<Equal<Chunk2<[1, 2, 3], 2>, [[1, 2], [3]]>>,
  Expect<Equal<Chunk2<[1, 2, 3, 4], 2>, [[1, 2], [3, 4]]>>,
  Expect<Equal<Chunk2<[1, 2, 3, 4], 5>, [[1, 2, 3, 4]]>>,
  Expect<Equal<Chunk2<[1, true, 2, false], 2>, [[1, true], [2, false]]>>,
]
