/*
 * 43 - exclude
 * Difficulty: easy
 */

/* _____________ Your Code Here _____________ */
// Conditional Typesを用いて、Uに割り当て可能な型をTから除外する
type MyExclude<T, U> = T extends U ? never : T
// UがTの部分集合である制約を課した場合は、3番目と4番目のテストケースが通らない
// type MyExclude<T, U extends T> = T extends U ? never : T
/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<MyExclude<'a' | 'b' | 'c', 'a'>, 'b' | 'c'>>,
  Expect<Equal<MyExclude<'a' | 'b' | 'c', 'a' | 'b'>, 'c'>>,
  Expect<Equal<MyExclude<string | number | (() => void), Function>, string | number>>,
  // 実装の注意点として、UはTの部分集合である制限はないので、 T に存在しない型であっても U に指定可能となり
  // 意図しない型であってもエラーとならない
  Expect<Equal<MyExclude<'a' | 'b' | 'c', 'C'>, 'a' | 'b' | 'c'>>, // 本当は 'a' | 'b' を期待していたが、'c'が含まれている
]

type Result = Exclude<'a' | 'b' | 'c', 'a'> // 'b' | 'c'