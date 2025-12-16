/*
 * 1097 - isunion
 * Difficulty: medium
 */

/* _____________ Your Code Here _____________ */
// 解法1: 分配条件型により、ユニオン時だけ各要素に対して条件が評価される性質を利用する
// `string | string` のような重複は TypeScript が正規化して `string` になる（特別な前提は不要）
type IsUnion<T, U = T> =
  // `T = never` のとき分配条件型が `never` になるため、タプルで包んで先に判定
  [T] extends [never] ? false :
  // U は「元の T」を保持するための退避（分配後の T と比較する）
  T extends U
    // 分配後の各要素 T に対して、元の全体 U がその要素 T に代入可能かを判定する
    // 代入可能ならユニオンではない（全体が単一要素と同型）
    ? [U] extends [T]
      // ユニオンでない
      ? false
      // ユニオンなら各要素がここにいたるので、結果が `true` のユニオン (= true) になる
      : true
    // U は元の T なので通常ここには到達しない
    : never

// 解法2
type IsUnionImpl<T, C extends T = T> =
  (T extends T
    ? C extends T
      ? true
      : unknown
    : never
  ) extends true
    ? false
    : true
type IsUnion2<T> = IsUnionImpl<T>

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<IsUnion<string>, false>>,
  Expect<Equal<IsUnion<string | number>, true>>,
  Expect<Equal<IsUnion<'a' | 'b' | 'c' | 'd'>, true>>,
  Expect<Equal<IsUnion<undefined | null | void | ''>, true>>,
  Expect<Equal<IsUnion<{ a: string } | { a: number }>, true>>,
  Expect<Equal<IsUnion<{ a: string | number }>, false>>,
  Expect<Equal<IsUnion<[string | number]>, false>>,
  // Cases where T resolves to a non-union type.
  Expect<Equal<IsUnion<string | never>, false>>,
  Expect<Equal<IsUnion<string | unknown>, false>>,
  Expect<Equal<IsUnion<string | any>, false>>,
  Expect<Equal<IsUnion<string | 'a'>, false>>,
  Expect<Equal<IsUnion<never>, false>>,
]

type cases2 = [
  Expect<Equal<IsUnion2<string>, false>>,
  Expect<Equal<IsUnion2<string | number>, true>>,
  Expect<Equal<IsUnion2<'a' | 'b' | 'c' | 'd'>, true>>,
  Expect<Equal<IsUnion2<undefined | null | void | ''>, true>>,
  Expect<Equal<IsUnion2<{ a: string } | { a: number }>, true>>,
  Expect<Equal<IsUnion2<{ a: string | number }>, false>>,
  Expect<Equal<IsUnion2<[string | number]>, false>>,
  // Cases where T resolves to a non-union type.
  Expect<Equal<IsUnion2<string | never>, false>>,
  Expect<Equal<IsUnion2<string | unknown>, false>>,
  Expect<Equal<IsUnion2<string | any>, false>>,
  Expect<Equal<IsUnion2<string | 'a'>, false>>,
  Expect<Equal<IsUnion2<never>, false>>,
]
