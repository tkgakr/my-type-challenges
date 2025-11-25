/*
 * 10 - tuple-to-union
 * Difficulty: medium
 */

/* _____________ Your Code Here _____________ */
// 解法: タプル型は添字アクセス T[number] で全要素のユニオン型に展開される
type TupleToUnion<T extends any[]> = T[number]

// 別解 infer を使う
// T extends Array<infer I> が成り立つとき、
// infer I は配列（タプル含む）の要素型を抽出します。
// 配列の添字アクセス型 (Array<I>[number]) は全要素のユニオンになるため、
// I にはそのユニオン型が推論されます。
// したがって I がタプル内の全要素型を表し、そのまま返すことでユニオン型が得られます。
type TupleToUnion2<T> = T extends Array<infer I> ? I : never  
/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<TupleToUnion<[123, '456', true]>, 123 | '456' | true>>,
  Expect<Equal<TupleToUnion<[123]>, 123>>,
  Expect<Equal<TupleToUnion2<[123, '456', true]>, 123 | '456' | true>>,
  Expect<Equal<TupleToUnion2<[123]>, 123>>,
]
