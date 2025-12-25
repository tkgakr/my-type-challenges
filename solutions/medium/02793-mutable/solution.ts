/*
 * 2793 - mutable
 * Difficulty: medium
 */

/* _____________ Your Code Here _____________ */
// T をオブジェクトまたはタプル型に限定する
type Mutable<T extends object> = {
  // `-` を付けて mapped type modifier を取り除く
  -readonly[K in keyof T]: T[K]
}


/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

interface Todo1 {
  title: string
  description: string
  completed: boolean
  meta: {
    author: string
  }
}

type List = [1, 2, 3]

type cases = [
  Expect<Equal<Mutable<Readonly<Todo1>>, Todo1>>,
  Expect<Equal<Mutable<Readonly<List>>, List>>,
]

type errors = [
  // @ts-expect-error
  Mutable<'string'>,
  // @ts-expect-error
  Mutable<0>,
]
