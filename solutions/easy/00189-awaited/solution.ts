/*
 * 189 - awaited
 * Difficulty: easy
 * 
 */

/* _____________ Your Code Here _____________ */
// Promise ライクな型がresolve されたとき、内包する型を取得する
// → 型をアンラップする

// Conditional Types を使って、Promiseでラップされた型ならば、中身を取り出し、
// そうでなければ元の型を返す
// ただし、条件型だけでは、ラップがネストしたときに剥がしきれない
// type MyAwaited<T> = T extends Promise<infer R> ? R : T

// そこで、再帰的に型を剥がす
// が、これでもまだ最後の問題がエラーになる(問題文は「Promiseライクな型」といっている！)
// type MyAwaited<T> = T extends Promise<infer R> ? MyAwaited<R> : T

// Promise で決め打たずに、PromiseLike<any>に置き換える
// type MyAwaited<T> = T extends PromiseLike<infer R>
//   ? R extends PromiseLike<any> // R が Promise ライクであるならば
//     ? MyAwaited<R> // 再帰的に剥がす
//     : R // そうでなければ元の型を返す
//   : T // T が Promise ライクでない(最初から裸の状態)ならば、元の型を返す

// ↑でもいったん全ての用意されたテストは通った

// 問題文によると、「Promise ライクな型が..」と言っており、T は制約をつける必要があった
type MyAwaited<T extends PromiseLike<any>> = T extends PromiseLike<infer R>
  ? R extends PromiseLike<any> // R が Promise ライクであるならば
    ? MyAwaited<R> // 再帰的に剥がす
    : R // そうでなければ元の型を返す
  : never // T は裸であることがありえないので、never を返す

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type X = Promise<string>
type Y = Promise<{ field: number }>
type Z = Promise<Promise<string | number>>
type Z1 = Promise<Promise<Promise<string | boolean>>>
type T = { then: (onfulfilled: (arg: number) => any) => any }
// 追加のテスト
type isA = boolean

type cases = [
  Expect<Equal<MyAwaited<X>, string>>,
  Expect<Equal<MyAwaited<Y>, { field: number }>>,
  Expect<Equal<MyAwaited<Z>, string | number>>,
  Expect<Equal<MyAwaited<Z1>, string | boolean>>,
  Expect<Equal<MyAwaited<T>, number>>,
  // TがPromiseライクな型でなければならないのでエラーになる
  // @ts-expect-error
  Expect<Equal<MyAwaited<isA>, never>>,
]
