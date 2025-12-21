/*
 * 2257 - minusone
 * Difficulty: medium
 */

/* _____________ Your Code Here _____________ */
type ParseInt<T extends string> =
  // 先頭に0がある文字列(例: "09")だと、infer が number に widen してリテラル数値にならないため、
  // 0を除外して数値リテラルに変換
  RemoveLeadingZeros<T> extends `${infer Digit extends number}` ? Digit : never

type RemoveLeadingZeros<S extends string> =
  S extends '0' ? S : S extends `${'0'}${infer R}` ? RemoveLeadingZeros<R> : S

// 解法1: 愚直に最終桁を1減らして数値変換する
type MinusOne<T extends number> =
  `${T}` extends `${infer L}1` ? ParseInt<`${L}0`> :
  `${T}` extends `${infer L}2` ? ParseInt<`${L}1`> :
  `${T}` extends `${infer L}3` ? ParseInt<`${L}2`> :
  `${T}` extends `${infer L}4` ? ParseInt<`${L}3`> :
  `${T}` extends `${infer L}5` ? ParseInt<`${L}4`> :
  `${T}` extends `${infer L}6` ? ParseInt<`${L}5`> :
  `${T}` extends `${infer L}7` ? ParseInt<`${L}6`> :
  `${T}` extends `${infer L}8` ? ParseInt<`${L}7`> :
  `${T}` extends `${infer L}9` ? ParseInt<`${L}8`> :
  // 最終桁が0の場合、一桁上の位を繰り下げる
  `${T}` extends `${infer L}0` ? ParseInt<`${MinusOne<ParseInt<L>>}9`> :
  // T は 正数であることが前提
  never

// 解法2: 数字を「文字列として」計算して、最後に数値へ戻す（issue #13507）
// - TypeScript 4.8+ の `infer Digit extends number` を利用して、文字列→数値(ParseInt)を安全に行う
// - 10進数の繰り下げは下位桁(末尾)から伝播するため、いったん文字列を反転して「先頭」から処理する
// - `InternalMinusOne` は反転済み文字列の先頭(=元の最下位桁)を 1 減らし、0 の場合は 9 にして次へ繰り下げる
// - 計算後に再度反転し、ParseInt で数値へ戻す
// - この手法の上限は JavaScript の安全な整数範囲(2^53 - 1)付近
type ReverseString<S extends string> =
  S extends `${infer First}${infer Rest}` ? `${ReverseString<Rest>}${First}` : ''
type InternalMinusOne<S extends string> =
  S extends `${infer Digit extends number}${infer Rest}`
    ? Digit extends 0
      ? `9${InternalMinusOne<Rest>}`
      : `${[9, 0, 1, 2, 3, 4, 5, 6, 7, 8][Digit]}${Rest}`
    : never
type MinusOne2<T extends number> =
  ParseInt<
    ReverseString<
      InternalMinusOne<
        ReverseString<`${T}`>
      >
    >
  >
type test = MinusOne<9007199254740992>

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<MinusOne<1>, 0>>,
  Expect<Equal<MinusOne<55>, 54>>,
  Expect<Equal<MinusOne<3>, 2>>,
  Expect<Equal<MinusOne<100>, 99>>,
  Expect<Equal<MinusOne<1101>, 1100>>,
  Expect<Equal<MinusOne<9_007_199_254_740_992>, 9_007_199_254_740_991>>,
  // 繰り下げのテスト
  Expect<Equal<MinusOne<1234000>, 1233999>>,
]

type Nine = MinusOne<10>

type cases2 = [
  Expect<Equal<MinusOne2<1>, 0>>,
  Expect<Equal<MinusOne2<55>, 54>>,
  Expect<Equal<MinusOne2<3>, 2>>,
  Expect<Equal<MinusOne2<100>, 99>>,
  Expect<Equal<MinusOne2<1101>, 1100>>,
  Expect<Equal<MinusOne2<9_007_199_254_740_992>, 9_007_199_254_740_991>>,
  // 繰り下げのテスト
  Expect<Equal<MinusOne2<1234000>, 1233999>>,
]
