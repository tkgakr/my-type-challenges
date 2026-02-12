/*
 * 30301 - isodd
 * Difficulty: medium
 */

/* _____________ Your Code Here _____________ */
type ReverseString<S extends string> =
  S extends `${infer First}${infer Rest}` ? `${ReverseString<Rest>}${First}` : ''
// 注意: 裸の `T` は number なので文字列にしてから条件型を適用しないと意図したマッチングにならない
type IsOdd<T extends number> =
  // 小数点の有無をチェック
  `${T}` extends `${number}.${number}`
    // 「偶数」「奇数」は整数に対して定義されるので、小数点があれば、1.0 などであっても「奇数」とは言わない
    ? false
    // 指数表記かチェック
    : `${T}` extends `${infer C extends number}e${infer E extends number}`
      ? E extends 0
        // C×10の0乗はCなので、再帰
        ? IsOdd<C>
        // Eが1以上なら10の倍数になるので偶数
        : false
      // 文字列を反転させて、最後の桁を最初に持ってくる
      // 1桁の場合も考慮する(`${infer First}${number}` は 2桁ないとマッチングしない)
      : ReverseString<`${T}`> extends `${infer First}${string}`
        ? First extends '1' | '3' | '5' | '7' | '9'
          ? true
          : false
        : never

// 文字列の反転を使わない別解(小数と指数の考慮なし)
type IsOdd2<T extends number> =
  `${T}` extends `${number | ''}${1 | 3 | 5 | 7 | 9}`
    ? true
    : false

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<IsOdd<5>, true>>,
  Expect<Equal<IsOdd<2023>, true>>,
  Expect<Equal<IsOdd<1453>, true>>,
  Expect<Equal<IsOdd<1926>, false>>,
  Expect<Equal<IsOdd<2.3>, false>>,
  Expect<Equal<IsOdd<3e23>, false>>,
  Expect<Equal<IsOdd<3e0>, true>>,
  Expect<Equal<IsOdd<number>, false>>,
]

type cases2 = [
  Expect<Equal<IsOdd2<5>, true>>,
  Expect<Equal<IsOdd2<2023>, true>>,
  Expect<Equal<IsOdd2<1453>, true>>,
  Expect<Equal<IsOdd2<1926>, false>>,
  // @ts-expect-error
  Expect<Equal<IsOdd2<2.3>, false>>,
  // @ts-expect-error
  Expect<Equal<IsOdd2<3e23>, false>>,
  Expect<Equal<IsOdd2<3e0>, true>>,
  Expect<Equal<IsOdd2<number>, false>>,
]
// 指数を文字列化すると+ 記号が入る
// 3e23 -> "3e+23"
type _ = `${3e23}`