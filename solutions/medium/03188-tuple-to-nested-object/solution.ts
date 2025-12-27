/*
 * 3188 - tuple-to-nested-object
 * Difficulty: medium
 */

/* _____________ Your Code Here _____________ */
type TupleToNestedObject<T, U> =
  // T を最初の要素と残りに分割
  T extends [infer First, ...infer Rest]
    // First をプロパティキーとして扱うために Mapped Key Type を使い、その配下で Rest を再帰的に処理する
    // First は string | number | symbol の可能性があるためプロパティキーとして安全に扱うには string へ絞り込む必要がある
    // First & string と書くことで string に割り当て可能な型のみを取り出し、K をオブジェクトキーとして利用できるようにしている
    ? { [K in First & string]: TupleToNestedObject<Rest, U> }
    // タプルに要素がなくなったら U を返す
    : U

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<TupleToNestedObject<['a'], string>, { a: string }>>,
  Expect<Equal<TupleToNestedObject<['a', 'b'], number>, { a: { b: number } }>>,
  Expect<Equal<TupleToNestedObject<['a', 'b', 'c'], boolean>, { a: { b: { c: boolean } } }>>,
  Expect<Equal<TupleToNestedObject<[], boolean>, boolean>>,
]

type _ = TupleToNestedObject<['a'], string>