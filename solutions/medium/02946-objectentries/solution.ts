/*
 * 2946 - objectentries
 * Difficulty: medium
 */

/* _____________ Your Code Here _____________ */
// 解法1: 条件型の分配法則を利用したアプローチ
type ObjectEntries<T, K extends keyof T = keyof T> =
  // K(キーのユニオン型)に対して条件型の分配法則を適用する
  K extends keyof T
    // Required で optional プロパティを required に変換して never チェックを行う
    ? [K, Required<T>[K] extends never
      // undefined 型のプロパティは Required 適用後に never になるため、undefined に戻す
      ? undefined
      // それ以外の場合は Required<T>[K] をそのまま使用
      : Required<T>[K]]
    : never

// 解法2: インデックスアクセス型を利用したアプローチ
type ObjectEntries2<T, U = Required<T>> = {
  // Mapped Types で各キーに対してタプル型を生成
  [K in keyof U]: [K, U[K] extends never ? undefined : U[K]]
  // インデックスアクセス型 [keyof U] で全てのプロパティの値型をユニオン型として取得
}[keyof U]

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

interface Model {
  name: string
  age: number
  locations: string[] | null
}

type ModelEntries = ['name', string] | ['age', number] | ['locations', string[] | null]

type cases = [
  Expect<Equal<ObjectEntries<Model>, ModelEntries>>,
  Expect<Equal<ObjectEntries<Partial<Model>>, ModelEntries>>,
  Expect<Equal<ObjectEntries<{ key?: undefined }>, ['key', undefined]>>,
  Expect<Equal<ObjectEntries<{ key: undefined }>, ['key', undefined]>>,
  Expect<Equal<ObjectEntries<{ key: string | undefined }>, ['key', string | undefined]>>,
]

type cases2 = [
  Expect<Equal<ObjectEntries2<Model>, ModelEntries>>,
  Expect<Equal<ObjectEntries2<Partial<Model>>, ModelEntries>>,
  Expect<Equal<ObjectEntries2<{ key?: undefined }>, ['key', undefined]>>,
  Expect<Equal<ObjectEntries2<{ key: undefined }>, ['key', undefined]>>,
  Expect<Equal<ObjectEntries2<{ key: string | undefined }>, ['key', string | undefined]>>,
]

type _ = ObjectEntries2<{ key?: undefined }>