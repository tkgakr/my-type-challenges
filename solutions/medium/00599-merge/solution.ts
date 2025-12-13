/*
 * 599 - merge
 * Difficulty: medium
 */

/* _____________ Your Code Here _____________ */
type Merge<F, S> = {
  // P は F と S の key を合わせたもの
  [P in keyof F | keyof S]:
    // S のみ、または F と S に両方もつプロパティは S が優先
    P extends keyof S ? S[P]:
    // F のみのプロパティ
    P extends keyof F ? F[P]: never
}

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type Foo = {
  a: number
  b: string
}
type Bar = {
  b: number
  c: boolean
}

type cases = [
  Expect<Equal<Merge<Foo, Bar>, {
    a: number
    b: number
    c: boolean
  }>>,
]
