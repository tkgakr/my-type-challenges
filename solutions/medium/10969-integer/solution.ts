/*
 * 10969 - integer
 * Difficulty: medium
 */

/* _____________ Your Code Here _____________ */
// 解法1: infer による推論を用いたアプローチ
type Integer<T extends number> =
  // T が プリミティブ型か、数値リテラル型かをチェック
  Equal<T, number> extends true
    // プリミティブ型(テストの `typeof x`)の場合は never
    ? never
    // T が小数部分を持つかチェックするとともに、整数部(Integer)、小数部(Decimal)のそれぞれを文字ではなく数値で推論
    : `${T}` extends `${infer I extends number}.${infer D extends number}`
      // 小数部が 0 かチェック
      ? D extends 0
        // 小数部が 0 なら整数部を返す
        // (ここには到達しない。文字列化時に小数点がとれた整数になるため、D が 0かどうかの判定は不要だった)
        ? I
        // 小数部が 0 以外
        : never
      // 小数部をもたない number型は 整数
      : T

// 解法2: 解法1 をシンプルにリファクタリングしたバージョン
type Integer2<T extends number> =
  // T が プリミティブ型か、数値リテラル型かをチェック
  // (Equal を使わなくても number が T に代入可能か見るだけでよかった)
  number extends T
    // プリミティブ型(テストの `typeof x`)の場合は never
    ? never
    // T を文字列変換する際に、小数点以下が0の場合は自動的に小数点がとれた整数になる
    // (解法1の D が 0かどうかの判定は不要だった)
    : `${T}` extends `${number}.${number}`
      ? never
      // 小数部をもたない number型は 整数
      : T


// 解法3: bigint は小数になりえないことを利用したアプローチ
// bigint は整数のみを表現するため、`${bigint}` は整数リテラル文字列にのみマッチする
// number プリミティブ型は `${number}` そのままを返し文字列にならず、`${bigint}` にもマッチしない
type Integer3<T extends number> =
  `${T}` extends `${bigint}`
    ? T
    : never

// テンプレートリテラルの検証用
type TemplateLiteral<T extends number> = `${T}`
/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

let x = 1
let y = 1 as const

type cases1 = [
  Expect<Equal<Integer<1>, 1>>,
  Expect<Equal<Integer<1.1>, never>>,
  Expect<Equal<Integer<1.0>, 1>>,
  Expect<Equal<Integer<1.000000000>, 1>>,
  Expect<Equal<Integer<0.5>, never>>,
  Expect<Equal<Integer<28.00>, 28>>,
  Expect<Equal<Integer<28.101>, never>>,
  Expect<Equal<Integer<typeof x>, never>>,
  Expect<Equal<Integer<typeof y>, 1>>,
]

type cases2 = [
  Expect<Equal<Integer2<1>, 1>>,
  Expect<Equal<Integer2<1.1>, never>>,
  Expect<Equal<Integer2<1.0>, 1>>,
  Expect<Equal<Integer2<1.000000000>, 1>>,
  Expect<Equal<Integer2<0.5>, never>>,
  Expect<Equal<Integer2<28.00>, 28>>,
  Expect<Equal<Integer2<28.101>, never>>,
  Expect<Equal<Integer2<typeof x>, never>>,
  Expect<Equal<Integer2<typeof y>, 1>>,
]

type cases3 = [
  Expect<Equal<Integer3<1>, 1>>,
  Expect<Equal<Integer3<1.1>, never>>,
  Expect<Equal<Integer3<1.0>, 1>>,
  Expect<Equal<Integer3<1.000000000>, 1>>,
  Expect<Equal<Integer3<0.5>, never>>,
  Expect<Equal<Integer3<28.00>, 28>>,
  Expect<Equal<Integer3<28.101>, never>>,
  Expect<Equal<Integer3<typeof x>, never>>,
  Expect<Equal<Integer3<typeof y>, 1>>,
]

type tlcase = [
  Expect<Equal<TemplateLiteral<1>, '1'>>,
  Expect<Equal<TemplateLiteral<1.1>, '1.1'>>,
  Expect<Equal<TemplateLiteral<1.0>, '1'>>,
  Expect<Equal<TemplateLiteral<1.000000000>, '1'>>,
  Expect<Equal<TemplateLiteral<0.5>, '0.5'>>,
  Expect<Equal<TemplateLiteral<28.00>, '28'>>,
  Expect<Equal<TemplateLiteral<28.101>, '28.101'>>,
  Expect<Equal<TemplateLiteral<typeof x>, `${number}`>>,
  Expect<Equal<TemplateLiteral<typeof y>, "1">>,
]

