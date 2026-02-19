/*
 * 35191 - trace
 * Difficulty: medium
 */

/* _____________ Your Code Here _____________ */
// 解法1: 再帰でユニオン型を形成するアプローチ
// Index は補助タプルで、その長さ (Index['length']) が現在処理中の行・列インデックスを表す
type Trace<T extends any[][], Index extends any[] = []> =
  // T を最初の行と残りの行に分割
  T extends [infer First extends any[], ...infer Rest extends any[][]]
    // 現在の行 (First) から対角成分 (First[Index['length']]) を取り出し、
    // 残りの行 (Rest) に対してインデックスを 1 進めて再帰したものとのユニオン型にする
    ? First[Index['length']] | Trace<Rest, [...Index, 1]>
    : never

// 解法2: Mapped Type によって主対角成分を取得するアプローチ
type TupleToUnion<T extends any[]> = T[number]
type Trace2<T extends any[][]> = TupleToUnion<
  // `keyof T` はタプルの行インデックス ("0" | "1" | ...) のユニオン型
  // `T[P]` は P 番目の行 (例: T["0"] = [1, 2])
  // `P & keyof T[P]` は行インデックス P を列インデックスとして T[P] に渡すための交差型。
  // P は `keyof T` の文字列リテラル型であり、`keyof T[P]` (= T[P] の有効なインデックス型) との
  // 交差を取ることで TypeScript が型エラーなく T[P][P] としてアクセスできるようにしている
  // `T[P][P & keyof T[P]]` で「P 行 P 列目」= 主対角成分を取得
  {[P in keyof T]: T[P][P & keyof T[P]]}
>

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Trace<[[1, 2], [3, 4]]>, 1 | 4>>,
  Expect<Equal<Trace<[[0, 1, 1], [2, 0, 2], [3, 3, 0]]>, 0>>,
  Expect<Equal<Trace<[['a', 'b', ''], ['c', '', ''], ['d', 'e', 'f']]>, 'a' | '' | 'f'>>,
]

type cases2 = [
  Expect<Equal<Trace2<[[1, 2], [3, 4]]>, 1 | 4>>,
  Expect<Equal<Trace2<[[0, 1, 1], [2, 0, 2], [3, 3, 0]]>, 0>>,
  Expect<Equal<Trace2<[['a', 'b', ''], ['c', '', ''], ['d', 'e', 'f']]>, 'a' | '' | 'f'>>,
]
