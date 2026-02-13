/*
 * 30430 - tower-of-hanoi
 * Difficulty: medium
 */

/* _____________ Your Code Here _____________ */

/**
 * ハノイの塔を型レベルで再帰的に解く。
 *
 * 【アルゴリズム（古典的な再帰解法）】
 *   N 枚のディスクを From → To へ移動するには:
 *     1. 上の N-1 枚を From → Intermediate へ移動（To を中継）
 *     2. 残り 1 枚を From → To へ移動
 *     3. N-1 枚を Intermediate → To へ移動（From を中継）
 *
 * 【型パラメータ】
 *   N           - ディスクの総数（数値リテラル型）
 *   From        - 移動元の塔（デフォルト 'A'）
 *   To          - 移動先の塔（デフォルト 'B'）
 *   Intermediate - 中継用の塔（デフォルト 'C'）
 *   Index       - 再帰の深さを追跡するタプル（length で現在の深さを表現）
 *
 * 【再帰の仕組み】
 *   Index['length'] extends N → 深さが N に達したら空配列 [] を返す（= 0 枚なので移動不要）
 *   それ以外 →
 *     ...Hanoi<N, From, Intermediate, To, [...Index, 1]>  ← 手順1: 上の N-1 枚を From → Intermediate
 *     [From, To]                                          ← 手順2: 1 枚を From → To
 *     ...Hanoi<N, Intermediate, To, From, [...Index, 1]>  ← 手順3: N-1 枚を Intermediate → To
 *
 *   Index に要素を 1 つ追加して再帰することで「残りディスク数を 1 減らす」効果を得ている。
 *   Index['length'] が N に等しくなった時点で再帰が停止する。
 */
type Hanoi<N extends number, From = 'A', To = 'B', Intermediate = 'C', Index extends any[] = []> =
  Index['length'] extends N
    ? []
    : [
      ...Hanoi<N, From, Intermediate, To, [...Index,1]>,
      [From, To],
      ...Hanoi<N, Intermediate, To, From, [...Index, 1]>
    ];



/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type Tests = [
  Expect<Equal<Hanoi<0>, []>>,
  Expect<Equal<Hanoi<1>, [['A', 'B']]>>,
  Expect<Equal<Hanoi<2>, [['A', 'C'], ['A', 'B'], ['C', 'B']]>>,
  Expect<Equal<Hanoi<3>, [['A', 'B'], ['A', 'C'], ['B', 'C'], ['A', 'B'], ['C', 'A'], ['C', 'B'], ['A', 'B']]>>,
  Expect<Equal<Hanoi<5>, [['A', 'B'], ['A', 'C'], ['B', 'C'], ['A', 'B'], ['C', 'A'], ['C', 'B'], ['A', 'B'], ['A', 'C'], ['B', 'C'], ['B', 'A'], ['C', 'A'], ['B', 'C'], ['A', 'B'], ['A', 'C'], ['B', 'C'], ['A', 'B'], ['C', 'A'], ['C', 'B'], ['A', 'B'], ['C', 'A'], ['B', 'C'], ['B', 'A'], ['C', 'A'], ['C', 'B'], ['A', 'B'], ['A', 'C'], ['B', 'C'], ['A', 'B'], ['C', 'A'], ['C', 'B'], ['A', 'B']]>>,
]
