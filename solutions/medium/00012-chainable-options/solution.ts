/*
 * 12 - chainable-options
 * Difficulty: medium
 */

/* _____________ Your Code Here _____________ */
// `Chainable<T>` はオブジェクトの型 `T` を段階的に積み上げるビルダー
// - T: これまでに `option` の呼び出しで蓄積されたプロパティを表す型
type Chainable<T = {}> = {
  // K: 追加したいプロパティ名。既存プロパティと衝突する場合は never で型エラー
  // V: 追加したいプロパティの値の型
  // 返り値: 追加後のプロパティを含む新しい `Chainable`
  option: <K extends string, V>(
    key: K extends keyof T ? never : K,
    value: V
  ) => Chainable<Omit<T, K> & Record<K, V>>
  // これまでに蓄積した型 `T` をそのまま返すアクセサ
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
