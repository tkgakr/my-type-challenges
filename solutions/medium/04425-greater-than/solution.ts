/*
 * 4425 - greater-than
 * Difficulty: medium
 */

/* _____________ Your Code Here _____________ */
// 数値の桁数を求める
type NumberOfDigits<T extends number, S extends string = `${T}`, A extends any[] = []> =
  S extends `${infer First}${infer Rest}`
    ? NumberOfDigits<T, Rest, [...A, 1]>
    : A['length']

// 文字列を number に変換する
type ParseInt<T extends string> =
  T extends `${infer Digit extends number}` ? Digit : never

type ReverseString<S extends string> =
  S extends `${infer First}${infer Rest}` ? `${ReverseString<Rest>}${First}` : ''
type RemoveLeadingZeros<S extends string> =
  S extends '0' ? S : S extends `${'0'}${infer R}` ? RemoveLeadingZeros<R> : S
type InternalMinusOne<S extends string> =
  S extends `${infer Digit extends number}${infer Rest}`
    ? Digit extends 0
      ? `9${InternalMinusOne<Rest>}`
      : `${[9, 0, 1, 2, 3, 4, 5, 6, 7, 8][Digit]}${Rest}`
    : never
// 数値をマイナス1する関数型
type MinusOne<T extends number> =
  ParseInt<
    RemoveLeadingZeros<
      ReverseString<
        InternalMinusOne<ReverseString<`${T}`>>
      >
    >
  >

// 解法1 配列の長さをカウントアップして比較するアプローチ
// 前提として、配列の長さの上限が T, U の上限になる
type GreaterThan1<T extends number, U extends number, Counter extends any[] = []> =
  // カウンターが先に T と一致した場合は、Uより小さいか、イコール
  Counter['length'] extends T ? false :
  // カウンターが先に U に一致した場合は、T はUより大きい
  Counter['length'] extends U ? true :
  // カウンターをインクリメントする再帰処理
  GreaterThan1<T, U, [...Counter, 1]>

// 解法2 文字列変換して、最上位桁を比較する
// 前提として、桁数が同じでなければならない
type GreaterThan2<T extends number, U extends number, ST = `${T}`, SU = `${U}`> =
  ST extends `${infer FT}${infer RT}`
    ? SU extends `${infer FU}${infer RU}`
      ? GreaterThan1<ParseInt<FT>, ParseInt<FU>> extends true
        // 桁数が同じであることを前提にしているので、上位桁がおおきければそのままTが大きい
        ? true
        // 現在の桁の値が同じかどうかを判定
        : GreaterThan1<ParseInt<FU>, ParseInt<FT>> extends true
          // Uのほうがおおきい
          ? false
          // 同じ場合は次の桁へ再帰処理
          : GreaterThan2<T, U, RT, RU>
      // SUが先に空になった（STにまだ桁が残っている）= Tが大きい
      // ※GreaterThanから桁数が同じ場合のみ呼ばれるため、通常この分岐には到達しない
      : true
    // STが空になった = 全ての桁を比較し終えた（全て同じだった）
    : false


type GreaterThan<T extends number, U extends number> =
  // まずは桁数で比較
  GreaterThan1<NumberOfDigits<T>, NumberOfDigits<U>> extends true
    // 桁数が大きい
    ? true
    // 桁数が同じかどうかを判定
    : GreaterThan1<NumberOfDigits<U>, NumberOfDigits<T>> extends true
      // 桁数が小さい
      ? false
      // 桁数が同じ場合は文字列ベースのチェック
      : GreaterThan2<T, U>

// 解法3: カウントダウン方式
// これは再帰深度制限にひっかかる
type GreaterThan3<T extends number, U extends number> =
  T extends 0
    // Tが先、または同時に0になった
    ? false
    : U extends 0
      // Uが先に0になった
      ? true
      // それぞれデクリメントして再帰処理
      : GreaterThan3<MinusOne<T>, MinusOne<U>>


/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'
import { countReset } from 'console'

type cases_number_of_digits = [
  Expect<Equal<NumberOfDigits<0>, 1>>,
  Expect<Equal<NumberOfDigits<11>, 2>>,
  Expect<Equal<NumberOfDigits<123456789012345>, 15>>,
]
type cases = [
  Expect<Equal<GreaterThan<1, 0>, true>>,
  Expect<Equal<GreaterThan<5, 4>, true>>,
  Expect<Equal<GreaterThan<4, 5>, false>>,
  Expect<Equal<GreaterThan<0, 0>, false>>,
  Expect<Equal<GreaterThan<10, 9>, true>>,
  Expect<Equal<GreaterThan<20, 20>, false>>,
  Expect<Equal<GreaterThan<10, 100>, false>>,
  Expect<Equal<GreaterThan<111, 11>, true>>,
  Expect<Equal<GreaterThan<1234567891011, 1234567891010>, true>>,
  // 追加テスト
  Expect<Equal<GreaterThan<123456789012345, 123456789012345>, false>>,
  Expect<Equal<GreaterThan<100, 99>, true>>,
  Expect<Equal<GreaterThan<99, 100>, false>>,
]

type cases3 = [
  Expect<Equal<GreaterThan3<1, 0>, true>>,
  Expect<Equal<GreaterThan3<5, 4>, true>>,
  Expect<Equal<GreaterThan3<4, 5>, false>>,
  Expect<Equal<GreaterThan3<0, 0>, false>>,
  Expect<Equal<GreaterThan3<10, 9>, true>>,
  Expect<Equal<GreaterThan3<20, 20>, false>>,
  Expect<Equal<GreaterThan3<10, 100>, false>>,
  Expect<Equal<GreaterThan3<111, 11>, true>>,
  Expect<Equal<GreaterThan3<1234567891011, 1234567891010>, true>>,
  // 追加テスト
  Expect<Equal<GreaterThan3<100, 99>, true>>,
]
