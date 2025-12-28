/*
 * 3196 - flip-arguments
 * Difficulty: medium
 */

/* _____________ Your Code Here _____________ */
// タプルを反転させる Reverse 型を定義
type Reverse<T extends any[]> =
  T extends [infer First, ...infer Rest]
    ? [...Reverse<Rest>, First]
    : []

// 解法1: infer を使った推論によるアプローチ
// `T` は関数型である制約を設ける
type FlipArguments<T extends (...args: any) => any> =
  // 引数のタプル `P` と戻り値の型 `R` を推論
  T extends (...args: infer P) => infer R
    // 引数のタプルを反転させた関数を返す
    ? (...args: Reverse<P>) => R
    // T の 制約によりここに入ることはない
    : never

// 解法2: ユーティリティ型を使ったアプローチ
type FlipArguments2<T extends (...args: any) => any> =
    // `Parameters<T>` で引数のタプルを取得し反転, `ReturnType<T>`で戻り値の型を取得
    (...args: Reverse<Parameters<T>>) => ReturnType<T>

    /* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<FlipArguments<() => boolean>, () => boolean>>,
  Expect<Equal<FlipArguments<(foo: string) => number>, (foo: string) => number>>,
  Expect<Equal<FlipArguments<(arg0: string, arg1: number, arg2: boolean) => void>, (arg0: boolean, arg1: number, arg2: string) => void>>,
]

type errors = [
  // @ts-expect-error
  FlipArguments<'string'>,
  // @ts-expect-error
  FlipArguments<{ key: 'value' }>,
  // @ts-expect-error
  FlipArguments<['apple', 'banana', 100, { a: 1 }]>,
  // @ts-expect-error
  FlipArguments<null | undefined>,
]

type cases2 = [
  Expect<Equal<FlipArguments2<() => boolean>, () => boolean>>,
  Expect<Equal<FlipArguments2<(foo: string) => number>, (foo: string) => number>>,
  Expect<Equal<FlipArguments2<(arg0: string, arg1: number, arg2: boolean) => void>, (arg0: boolean, arg1: number, arg2: string) => void>>,
]

type errors2 = [
  // @ts-expect-error
  FlipArguments2<'string'>,
  // @ts-expect-error
  FlipArguments2<{ key: 'value' }>,
  // @ts-expect-error
  FlipArguments2<['apple', 'banana', 100, { a: 1 }]>,
  // @ts-expect-error
  FlipArguments2<null | undefined>,
]
