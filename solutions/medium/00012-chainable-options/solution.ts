/*
 * 12 - chainable-options
 * Difficulty: medium
 */

/* _____________ Your Code Here _____________ */
// 1️⃣`T` は(& によって)蓄積されたオブジェクトの型
type Chainable<T = {}> = {
  // 2️⃣ `option` は Chainable自身を返す
  // 左辺がプロパティ、右辺は 蓄積されたオブジェクト `T` に新しいプロパティを追加した型 `Chainable`
  option: <K extends string, V>(key: K extends keyof T ?
    V extends T[K] ? never : K
    : K, value: V) => Chainable<Omit<T, K> & Record<K, V>>
  // 1️⃣蓄積された型 `T` をそのまま帰す
  get: () => T
}

/* _____________ Test Cases _____________ */
import type { Alike, Expect } from '@type-challenges/utils'

declare const a: Chainable

const result1 = a
  .option('foo', 123)
  .option('bar', { value: 'Hello World' })
  .option('name', 'type-challenges')
  .get()

const result2 = a
  .option('name', 'another name')
  // @ts-expect-error
  .option('name', 'last name')
  .get()

const result3 = a
  .option('name', 'another name')
  // @ts-expect-error
  .option('name', 123)
  .get()

type cases = [
  Expect<Alike<typeof result1, Expected1>>,
  Expect<Alike<typeof result2, Expected2>>,
  Expect<Alike<typeof result3, Expected3>>,
]

type Expected1 = {
  foo: number
  bar: {
    value: string
  }
  name: string
}

type Expected2 = {
  name: string
}

type Expected3 = {
  name: number
}
