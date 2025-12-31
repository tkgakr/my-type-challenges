/*
 * 3376 - inordertraversal
 * Difficulty: medium
 */

/* _____________ Your Code Here _____________ */
interface TreeNode {
  val: number
  left: TreeNode | null
  right: TreeNode | null
}
type InorderTraversal<T extends TreeNode | null> =
  // T のプロパティを参照するために、T が TreeNode であることを確定する必要がある
  // (ここを null で判定したければ工夫が必要)
  // [] で囲むことで union distribution を防ぎ、T 全体を1つの型として評価する
  [T] extends [TreeNode]
    // 再帰によって、左部分木 → 現在ノード → 右部分木 の順に要素が追加される（中間順走査）
    ? [...InorderTraversal<T['left']>, T['val'], ...InorderTraversal<T['right']>]
    // null の場合は再帰終了
    : []

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

const tree1 = {
  val: 1,
  left: null,
  right: {
    val: 2,
    left: {
      val: 3,
      left: null,
      right: null,
    },
    right: null,
  },
} as const

const tree2 = {
  val: 1,
  left: null,
  right: null,
} as const

const tree3 = {
  val: 1,
  left: {
    val: 2,
    left: null,
    right: null,
  },
  right: null,
} as const

const tree4 = {
  val: 1,
  left: null,
  right: {
    val: 2,
    left: null,
    right: null,
  },
} as const

type cases = [
  Expect<Equal<InorderTraversal<null>, []>>,
  Expect<Equal<InorderTraversal<typeof tree1>, [1, 3, 2]>>,
  Expect<Equal<InorderTraversal<typeof tree2>, [1]>>,
  Expect<Equal<InorderTraversal<typeof tree3>, [2, 1]>>,
  Expect<Equal<InorderTraversal<typeof tree4>, [1, 2]>>,
]
