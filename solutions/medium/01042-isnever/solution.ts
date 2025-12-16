/*
 * 1042 - isnever
 * Difficulty: medium
 */

/* _____________ Your Code Here _____________ */
// 分配的条件型 (distributive conditional types)により、
// T に裸の never を渡した場合「要素数 0 のユニオン」として扱われる
// その結果、never に対して extends する条件分岐は一切実行されず、never になる
// type IsNever<T> = T extends never ? true : false
// この場合はタプルで包むことで、never がユニオンとして扱われることを防ぐ
type IsNever<T> = [T] extends [never] ? true : false

// 別解: @type-challenges/utils の Equal がそのまま使える
type IsNever2<T> = Equal<T, never>

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<IsNever<never>, true>>,
  Expect<Equal<IsNever<never | string>, false>>,
  Expect<Equal<IsNever<''>, false>>,
  Expect<Equal<IsNever<undefined>, false>>,
  Expect<Equal<IsNever<null>, false>>,
  Expect<Equal<IsNever<[]>, false>>,
  Expect<Equal<IsNever<{}>, false>>,
]

type cases2 = [
  Expect<Equal<IsNever2<never>, true>>,
  Expect<Equal<IsNever2<never | string>, false>>,
  Expect<Equal<IsNever2<''>, false>>,
  Expect<Equal<IsNever2<undefined>, false>>,
  Expect<Equal<IsNever2<null>, false>>,
  Expect<Equal<IsNever2<[]>, false>>,
  Expect<Equal<IsNever2<{}>, false>>,
]
