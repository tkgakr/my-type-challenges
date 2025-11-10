/*
 * 7 - readonly
 * Difficulty: easy
 */

/* _____________ Your Code Here _____________ */
type MyReadonly<T> = {
  // すべてのプロパティを展開しなおし、それぞれを readonly にする
  readonly [P in keyof T]: T[P]
}

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<MyReadonly<Todo1>, Readonly<Todo1>>>,
]

interface Todo1 {
  title: string
  description: string
  completed: boolean
  meta: {
    author: string
  }
}

// 問題文の例
interface Todo {
  title: string
  description: string
}

const todo: MyReadonly<Todo> = {
  title: "Hey",
  description: "foobar"
}

// @ts-expect-error
todo.title = "Hello" // Error: cannot reassign a readonly property
// @ts-expect-error
todo.description = "barFoo" // Error: cannot reassign a readonly property
