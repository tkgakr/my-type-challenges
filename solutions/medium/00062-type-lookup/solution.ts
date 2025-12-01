/*
 * 62 - type-lookup
 * Difficulty: medium
 */

/* _____________ Your Code Here _____________ */
// Distributive Conditional Types によって
// ジェネリクス型引数 U がユニオン型の場合、それを構成する各メンバーに対して個別に条件判定が適用される。
// type プロパティに ジェネリクス T がマッチするメンバーを返し、それ以外は never とすることで、
// type の適合する型のみを返す。
type LookUp<U, T> = U extends { type: T } ? U : never

// オリジナルリポジトリで recommended されていた別解
// Mapped Types + Index Access Types を組み合わせたアプローチ。
// 1. `T extends string` で T を文字列リテラル型に制約
// 2. `{ [K in T]: ... }` で T をキーとするオブジェクト型を生成
//    例: T='dog' の場合 → { dog: Dog | never } → { dog: Dog }
// 3. `[T]` で Index Access Types によりキー T の値型を取り出す
// 条件部分では LookUp と同様に Distributive Conditional Types が適用される。
type LookUp2<U, T extends string> = {
  [K in T]: U extends { type: T } ? U : never
}[T]

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

interface Cat {
  type: 'cat'
  breeds: 'Abyssinian' | 'Shorthair' | 'Curl' | 'Bengal'
}

interface Dog {
  type: 'dog'
  breeds: 'Hound' | 'Brittany' | 'Bulldog' | 'Boxer'
  color: 'brown' | 'white' | 'black'
}

type Animal = Cat | Dog

type cases = [
  Expect<Equal<LookUp<Animal, 'dog'>, Dog>>,
  Expect<Equal<LookUp<Animal, 'cat'>, Cat>>,
]

type cases2 = [
  Expect<Equal<LookUp2<Animal, 'dog'>, Dog>>,
  Expect<Equal<LookUp2<Animal, 'cat'>, Cat>>,
]
