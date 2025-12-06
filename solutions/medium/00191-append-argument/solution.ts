/*
 * 191 - append-argument
 * Difficulty: medium
 */

/* _____________ Your Code Here _____________ */
// Fn は関数型であることを制約し、unknown が渡された場合はエラーにする(3番目のテスト)
type AppendArgument<Fn extends (...args: any[]) => unknown, A> =
  // 引数をタプル型に推論、戻り値も推論
  Fn extends (...args: infer T) => infer R
    // タプル型にAを加えて関数型の引数とし展開しなおす
    ? (...args: [...T, A]) => R
    : never


/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type Case1 = AppendArgument<(a: number, b: string) => number, boolean>
type Result1 = (a: number, b: string, x: boolean) => number

type Case2 = AppendArgument<() => void, undefined>
type Result2 = (x: undefined) => void

type cases = [
  Expect<Equal<Case1, Result1>>,
  Expect<Equal<Case2, Result2>>,
  // @ts-expect-error
  AppendArgument<unknown, undefined>,
]
