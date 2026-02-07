/*
 * 27932 - mergeall
 * Difficulty: medium
 */

/* _____________ Your Code Here _____________ */
type Merge<F, S> = {
  // K は F と S の key を合わせたもの
  [K in keyof F | keyof S]:
    K extends keyof F
      ? K extends keyof S
        // F と S 両方のプロパティ
        ? F[K] | S[K]
        // F だけのプロパティ
        : F[K]
      : K extends keyof S
        // S だけのプロパティ
        ? S[K]
        : never
}
// 解法1: 再帰によってアキュムレータにオブジェクトを合成するアプローチ
type MergeAll<XS extends object[], Result extends object = {}> =
  XS extends [infer First, ...infer Rest extends object[]]
    ? MergeAll<Rest, Merge<Result, First>>
    : Result

// 解法2: XS を オブジェクトのユニオン型に置き換えて、再帰を使わずに合成するアプローチ
type MergeAll2<
  XS extends object[],
  U = XS[number], // XS を オブジェクトのユニオンに変換
  Keys extends PropertyKey = U extends U ? keyof U : never // Uにあるオブジェクトの全てのプロパティキーを取り出す(U を分配し、それぞれのオブジェクトキーを取り出してユニオンで束ねる)
> = {
  // 全てのキーにたいし、各オブジェクトに該当するキーがあればプロパティをユニオンで合成する
  [K in Keys]: U extends U ? U[K & keyof U] : never
}

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<MergeAll<[]>, {} >>,
  Expect<Equal<MergeAll<[{ a: 1 }]>, { a: 1 }>>,
  Expect<Equal<
    MergeAll<[{ a: string }, { a: string }]>,
    { a: string }
>
  >,
  Expect<Equal<
    MergeAll<[{ }, { a: string }]>,
    { a: string }
>
  >,
  Expect<Equal<
    MergeAll<[{ a: 1 }, { c: 2 }]>,
    { a: 1, c: 2 }
>
  >,
  Expect<Equal<
    MergeAll<[{ a: 1, b: 2 }, { a: 2 }, { c: 3 }]>,
    { a: 1 | 2, b: 2, c: 3 }
>
  >,
  Expect<Equal<MergeAll<[{ a: 1 }, { a: number }]>, { a: number }>>,
  Expect<Equal<MergeAll<[{ a: number }, { a: 1 }]>, { a: number }>>,
  Expect<Equal<MergeAll<[{ a: 1 | 2 }, { a: 1 | 3 }]>, { a: 1 | 2 | 3 }>>,
]

type cases2 = [
  Expect<Equal<MergeAll2<[]>, {} >>,
  Expect<Equal<MergeAll2<[{ a: 1 }]>, { a: 1 }>>,
  Expect<Equal<
    MergeAll2<[{ a: string }, { a: string }]>,
    { a: string }
>
  >,
  Expect<Equal<
    MergeAll2<[{ }, { a: string }]>,
    { a: string }
>
  >,
  Expect<Equal<
    MergeAll2<[{ a: 1 }, { c: 2 }]>,
    { a: 1, c: 2 }
>
  >,
  Expect<Equal<
    MergeAll2<[{ a: 1, b: 2 }, { a: 2 }, { c: 3 }]>,
    { a: 1 | 2, b: 2, c: 3 }
>
  >,
  Expect<Equal<MergeAll2<[{ a: 1 }, { a: number }]>, { a: number }>>,
  Expect<Equal<MergeAll2<[{ a: number }, { a: 1 }]>, { a: number }>>,
  Expect<Equal<MergeAll2<[{ a: 1 | 2 }, { a: 1 | 3 }]>, { a: 1 | 2 | 3 }>>,
]
