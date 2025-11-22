/*
 * 3 - omit
 * Difficulty: medium
 */

/* _____________ Your Code Here _____________ */
// MyOmit は mapped type を用いてオブジェクト型を再構成する
// K は T のプロパティキーを表すユニオン型（keyof T）
type MyOmit<T, K extends keyof T> = {
  // Pick では [P in K] でプロパティを選択したが、今回は key remapping を使って
  // K に含まれないプロパティキーのみを残す必要がある
  // T の各プロパティ P に対して、 K に含まれるプロパティであれば、never を返し、そうでない場合は P を返す
  // `T[P]` は、T のプロパティ P の型を返す
  [P in keyof T as P extends K ? never : P]: T[P]
}

// 組み込みの Omit の実装は以下。
// `Exclude<keyof T, K>` で、K のプロパティを除外したユニオン型を生成し、
// それをPick で抽出している
type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Expected1, MyOmit<Todo, 'description'>>>,
  Expect<Equal<Expected2, MyOmit<Todo, 'description' | 'completed'>>>,
  Expect<Equal<Expected3, MyOmit<Todo1, 'description' | 'completed'>>>,
]

// @ts-expect-error
type error = MyOmit<Todo, 'description' | 'invalid'>

interface Todo {
  title: string
  description: string
  completed: boolean
}

interface Todo1 {
  readonly title: string
  description: string
  completed: boolean
}

interface Expected1 {
  title: string
  completed: boolean
}

interface Expected2 {
  title: string
}

interface Expected3 {
  readonly title: string
}
