/*
 * 5310 - join
 * Difficulty: medium
 */

/* _____________ Your Code Here _____________ */
// 解法1: アキュムレータ S に解をアペンドするアプローチ
type Join<T extends any[], U extends string | number = ',', S extends string = ''> =
  T extends [infer First extends string, ...infer Rest]
    ? S extends ''
      ? Join<Rest, U, `${First}`>
      : Join<Rest, U, `${S}${U}${First}`>
    : S

// 解法2: テンプレートリテラル内で再帰するアプローチ
type Join2<T extends any[], U extends string | number = ','> = T extends [infer First, ...infer Rest]
  // 要素の残りがあるか判定
  ? Rest['length'] extends 0
    // 唯一の配列要素を返して再帰終了
    ? `${First & string}`
    // First と U を結合し、残りは再帰で結合
    : `${First & string}${U}${Join2<Rest, U>}`
  : ''

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Join<['a', 'p', 'p', 'l', 'e'], '-'>, 'a-p-p-l-e'>>,
  Expect<Equal<Join<['Hello', 'World'], ' '>, 'Hello World'>>,
  Expect<Equal<Join<['2', '2', '2'], 1>, '21212'>>,
  Expect<Equal<Join<['o'], 'u'>, 'o'>>,
  Expect<Equal<Join<[], 'u'>, ''>>,
  Expect<Equal<Join<['1', '1', '1']>, '1,1,1'>>,
]

type cases2 = [
  Expect<Equal<Join2<['a', 'p', 'p', 'l', 'e'], '-'>, 'a-p-p-l-e'>>,
  Expect<Equal<Join2<['Hello', 'World'], ' '>, 'Hello World'>>,
  Expect<Equal<Join2<['2', '2', '2'], 1>, '21212'>>,
  Expect<Equal<Join2<['o'], 'u'>, 'o'>>,
  Expect<Equal<Join2<[], 'u'>, ''>>,
  Expect<Equal<Join2<['1', '1', '1']>, '1,1,1'>>,
]
