/*
 * 2688 - startswith
 * Difficulty: medium
 */

/* _____________ Your Code Here _____________ */
type StartsWith<T extends string, U extends string> =
  // テンプレートリテラル型によって前方一致をチェック
  T extends `${U}${infer _}` ? true : false

// 別解 : GitHub の解法を見ると、infer で推論せずとも任意の string で構成できた
type StartsWith2<T extends string, U extends string> =
  // テンプレートリテラル型によって前方一致をチェック
  T extends `${U}${string}` ? true : false

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<StartsWith<'abc', 'ac'>, false>>,
  Expect<Equal<StartsWith<'abc', 'ab'>, true>>,
  Expect<Equal<StartsWith<'abc', 'abc'>, true>>,
  Expect<Equal<StartsWith<'abc', 'abcd'>, false>>,
  Expect<Equal<StartsWith<'abc', ''>, true>>,
  Expect<Equal<StartsWith<'abc', ' '>, false>>,
  Expect<Equal<StartsWith<'', ''>, true>>,
]

type cases2 = [
  Expect<Equal<StartsWith2<'abc', 'ac'>, false>>,
  Expect<Equal<StartsWith2<'abc', 'ab'>, true>>,
  Expect<Equal<StartsWith2<'abc', 'abc'>, true>>,
  Expect<Equal<StartsWith2<'abc', 'abcd'>, false>>,
  Expect<Equal<StartsWith2<'abc', ''>, true>>,
  Expect<Equal<StartsWith2<'abc', ' '>, false>>,
  Expect<Equal<StartsWith2<'', ''>, true>>,
]
