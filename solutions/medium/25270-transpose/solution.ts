/*
 * 25270 - transpose
 * Difficulty: medium
 */

/* _____________ Your Code Here _____________ */
// Rは元行列の最初の行。keyof Rで列インデックスを取得し、転置後の行インデックスとして使用
type Transpose<M extends number[][],R = M['length'] extends 0?[]:M[0]> = {
  // 転置後の各行に対して
  [X in keyof R]:{
    // 元行列の各行に対して
    [Y in keyof M]:
      // 元行列のY行目のX列目の要素を、結果行列のX行目のY列目に配置する
      X extends keyof M[Y]
        ? M[Y][X]
        : never
  }
}

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Transpose<[]>, []>>,
  Expect<Equal<Transpose<[[1]]>, [[1]]>>,
  Expect<Equal<Transpose<[[1, 2]]>, [[1], [2]]>>,
  Expect<Equal<Transpose<[[1, 2], [3, 4]]>, [[1, 3], [2, 4]]>>,
  Expect<Equal<Transpose<[[1, 2, 3], [4, 5, 6]]>, [[1, 4], [2, 5], [3, 6]]>>,
  Expect<Equal<Transpose<[[1, 4], [2, 5], [3, 6]]>, [[1, 2, 3], [4, 5, 6]]>>,
  Expect<Equal<Transpose<[[1, 2, 3], [4, 5, 6], [7, 8, 9]]>, [[1, 4, 7], [2, 5, 8], [3, 6, 9]]>>,
]
