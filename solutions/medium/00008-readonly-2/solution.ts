/*
 * 8 - readonly-2
 * Difficulty: medium
 */

/* _____________ Your Code Here _____________ */
// 以下の実装は、Kに含まれないプロパティの就職しが保持できなかった
// // `K` が指定されていない場合は `keyof T` を既定値として扱う
// type MyReadonly2<T, K extends keyof T = keyof T> =
//   // `K` のプロパティのみ読み取り専用にする
//   { readonly [P in K]: T[P] } &
//   // それ以外のプロパティは従来どおり変更可能にする
//   { [P in Exclude<keyof T, K>]: T[P] }

// 組み込みのユーティリティ型を使った実装
// // `K` が指定されていない場合は `keyof T` を既定値として扱う
// type MyReadonly2<T, K extends keyof T = keyof T> =
//   // `K` のプロパティのみ読み取り専用にする（Pick で修飾子を保持）
//   Readonly<Pick<T, K>> &
//   // それ以外のプロパティは元の修飾子を保ったまま残す
//   Omit<T, K>

// 過去の実装を参照して組み込みのユーティリティ型を使わずに実装する
// `K` が指定されていない場合は `keyof T` を既定値として扱う
type MyReadonly2<T, K extends keyof T = keyof T> =
  // #7 readonly, #4 pick
  { readonly [P in K]: T[P] } &
  // #3 MyOmit
  { [P in keyof T as P extends K ? never : P] : T[P]}

/* _____________ Test Cases _____________ */
import type { Alike, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Alike<MyReadonly2<Todo1>, Readonly<Todo1>>>,
  Expect<Alike<MyReadonly2<Todo1, 'title' | 'description'>, Expected>>,
  Expect<Alike<MyReadonly2<Todo2, 'title' | 'description'>, Expected>>,
  Expect<Alike<MyReadonly2<Todo2, 'description' >, Expected>>,
]

// @ts-expect-error
type error = MyReadonly2<Todo1, 'title' | 'invalid'>

interface Todo1 {
  title: string
  description?: string
  completed: boolean
}

interface Todo2 {
  readonly title: string
  description?: string
  completed: boolean
}

interface Expected {
  readonly title: string
  readonly description?: string
  completed: boolean
}
