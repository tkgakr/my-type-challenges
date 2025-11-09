/*
 * 4 - pick
 * Difficulty: easy
 */

/* _____________ Your Code Here _____________ */
// T はオブジェクトの型。
// K は文字列リテラル型または文字列リテラル型のユニオン型で、オブジェクトの型Tのプロパティキーを指定する。
// つまり、K が T のキーの集合に含まれていない場合は、コンパイルエラーを発生させる
type MyPick<T, K extends keyof T> = {
  [P in K]: T[P]
}

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Expected1, MyPick<Todo, 'title'>>>,
  Expect<Equal<Expected2, MyPick<Todo, 'title' | 'completed'>>>,
  // @ts-expect-error
  MyPick<Todo, 'title' | 'completed' | 'invalid'>,  // invalid は Todo に存在しないキーなので、コンパイルエラー
]

interface Todo {
  title: string
  description: string
  completed: boolean
}

// Todo から title プロパティを抽出した型
interface Expected1 {
  title: string
}

// Todo から title プロパティと completed プロパティを抽出した型
interface Expected2 {
  title: string
  completed: boolean
}

// 問題文の例
type TodoPreview = MyPick<Todo, 'title' | 'completed'>
const todo: TodoPreview = {
  title: 'Clean room',
  completed: false,
}
