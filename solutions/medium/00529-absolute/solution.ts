/*
 * 529 - absolute
 * Difficulty: medium
 */

/* _____________ Your Code Here _____________ */
// 数字のみで構成されているかをチェック
type IsNumeric<S extends string> = S extends `${number}` ? true : false

type Absolute<T extends number | string | bigint> =
  // T をテンプレートリテラルを使用して文字列にしたうえで条件型を適用
  `${T}` extends `-${infer U}`
    // もともとのテストだけなら素直に U を返せば良い
    // U が数字のみの場合は絶対値として返す、そうでなければそのまま返す
    ? IsNumeric<U> extends true ? U : `${T}`
    // テストによると、T が number や bigint の場合も文字列として返す必要がある
    : `${T}`

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Absolute<0>, '0'>>,
  Expect<Equal<Absolute<-0>, '0'>>,
  Expect<Equal<Absolute<10>, '10'>>,
  Expect<Equal<Absolute<-5>, '5'>>,
  Expect<Equal<Absolute<'0'>, '0'>>,
  Expect<Equal<Absolute<'-0'>, '0'>>,
  Expect<Equal<Absolute<'10'>, '10'>>,
  Expect<Equal<Absolute<'-5'>, '5'>>,
  Expect<Equal<Absolute<-1_000_000n>, '1000000'>>,
  Expect<Equal<Absolute<9_999n>, '9999'>>,
  // テストの追加
  // 数字でない文字列にマイナスが付いている場合はそのまま返す
  Expect<Equal<Absolute<'-abc'>, '-abc'>>,
]
