/*
 * 3312 - parameters
 * Difficulty: easy
 */

/* _____________ Your Code Here _____________ */
// Parameters<T> の Tは関数型の必要がある。
// この関数の引数からタブル型を構築する。
// Tの引数を取得するため、inferを使用する。
// Tが関数であるならば、Tの引数をPに代入する、そうでないならばneverを返す。
// `...args`は「可変長タプル型」であり `P` がタプル型であることが確定する。
// type MyParameters<T extends (...args: any[]) => any> = T extends (...args: infer P) => any ? P : never
// Tが関数型であることは、infer を使うために右辺で制約する必要があり、左辺でまで制約する必要はない?
type MyParameters<T> = T extends (...args: infer P) => any ? P : never

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

function foo(arg1: string, arg2: number): void {}
function bar(arg1: boolean, arg2: { a: 'A' }): void {}
function baz(): void {}

type cases = [
  Expect<Equal<MyParameters<typeof foo>, [string, number]>>,
  Expect<Equal<MyParameters<typeof bar>, [boolean, { a: 'A' }]>>,
  Expect<Equal<MyParameters<typeof baz>, []>>,
  // Tが関数でないパターンを追加
  Expect<Equal<MyParameters<string>, never>>,
]
