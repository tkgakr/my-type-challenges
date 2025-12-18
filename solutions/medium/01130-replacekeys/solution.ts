/*
 * 1130 - replacekeys
 * Difficulty: medium
 */

/* _____________ Your Code Here _____________ */
type ReplaceKeys<U, T, Y> =
  // conditional type により U を分配（{} は null/undefined を除外する）
  U extends {}
    ? {
        // U の各プロパティに対して
        [K in keyof U]
          // T（置換対象キー union）に含まれるか判定
          : K extends T
            // 置き換え発生 → Y のキーであれば 値を置き換え、Yのキーでなければ never にする
            ? K extends keyof Y ? Y[K] : never
            // T で指定されたキーでなければ、置き換えをしない
            : U[K]
      }
    : never

// 解法2:
// 一見すると「U から 1 つのオブジェクト型を生成」しているように見えるが、
// `{ [K in keyof U]: ... }` のように `keyof U` / `U[K]` を使う mapped type は
// TypeScript では homomorphic mapped type として扱われる。
// そのため `U` がユニオンの場合は自動的に分配され、
// `ReplaceKeys2<A | B>` は `ReplaceKeys2<A> | ReplaceKeys2<B>` のように
// 各要素ごとに mapped type が適用された結果のユニオンになる。
// （もし分配されなければ `keyof (A | B)` は共通キーだけになり、`name` / `id` などが落ちてテストに通らない）
type ReplaceKeys2<U, T, Y> = {
  [K in keyof U]
    : K extends T
      ? K extends keyof Y
        ? Y[K] : never
      : U[K]
}

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type NodeA = {
  type: 'A'
  name: string
  flag: number
}

type NodeB = {
  type: 'B'
  id: number
  flag: number
}

type NodeC = {
  type: 'C'
  name: string
  flag: number
}

type ReplacedNodeA = {
  type: 'A'
  name: number
  flag: string
}

type ReplacedNodeB = {
  type: 'B'
  id: number
  flag: string
}

type ReplacedNodeC = {
  type: 'C'
  name: number
  flag: string
}

type NoNameNodeA = {
  type: 'A'
  flag: number
  name: never
}

type NoNameNodeC = {
  type: 'C'
  flag: number
  name: never
}

type Nodes = NodeA | NodeB | NodeC
type ReplacedNodes = ReplacedNodeA | ReplacedNodeB | ReplacedNodeC
type NodesNoName = NoNameNodeA | NoNameNodeC | NodeB

type cases = [
  Expect<Equal<ReplaceKeys<Nodes, 'name' | 'flag', { name: number, flag: string }>, ReplacedNodes>>,
  Expect<Equal<ReplaceKeys<Nodes, 'name', { aa: number }>, NodesNoName>>,
]

type cases2 = [
  Expect<Equal<ReplaceKeys2<Nodes, 'name' | 'flag', { name: number, flag: string }>, ReplacedNodes>>,
  Expect<Equal<ReplaceKeys2<Nodes, 'name', { aa: number }>, NodesNoName>>,
]
