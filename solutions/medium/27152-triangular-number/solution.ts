/*
 * 27152 - triangular-number
 * Difficulty: medium
 */

/* _____________ Your Code Here _____________ */
// インデックスカウンターとしての I と、三角数の解 Result をアキュムレータとして持つ
type Triangular<N extends number, I extends any[] = [], Result extends any[] = []> =
  I['length'] extends N
    // Iが指定の数に到達したら、解を返す
    ? Result['length']
    // I をインクリメントする要素追加と、前の数までの和に次の数を加える
    : Triangular<N, [...I, 1], [...Result, ...I, 1]>

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Triangular<0>, 0>>,
  Expect<Equal<Triangular<1>, 1>>,
  Expect<Equal<Triangular<3>, 6>>,
  Expect<Equal<Triangular<10>, 55>>,
  Expect<Equal<Triangular<20>, 210>>,
  Expect<Equal<Triangular<55>, 1540>>,
  Expect<Equal<Triangular<100>, 5050>>,
]
