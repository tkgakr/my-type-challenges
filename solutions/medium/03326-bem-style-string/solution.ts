/*
 * 3326 - bem-style-string
 * Difficulty: medium
 */

/* _____________ Your Code Here _____________ */
// タプルをユニオンに変換する
type TupleToUnion<T extends any[]> = T[number]

// Element を整形したユニオンを返す
type Element<E extends string[]> =
    // E が 空の配列かを判定
    E extends []
      ? ''
      // テンプレートリテラルの中で変数にユニオン型を指定した場合、返す結果もそれぞれのユニオン型になる
      : `__${TupleToUnion<E>}`

// Modifier を整形したユニオンを返す
type Modifier<M extends string[]> =
    // M が 空の配列かを判定
    M extends []
      ? ''
      // テンプレートリテラルの中で変数にユニオン型を指定した場合、返す結果もそれぞれのユニオン型になる
      : `--${TupleToUnion<M>}`

type BEM<B extends string, E extends string[], M extends string[]> =
  // ユニオン型が複数の場合は全てを展開したユニオン型になる
  `${B}${Element<E>}${Modifier<M>}`

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<BEM<'btn', ['price'], []>, 'btn__price'>>,
  Expect<Equal<BEM<'btn', ['price'], ['warning', 'success']>, 'btn__price--warning' | 'btn__price--success' >>,
  Expect<Equal<BEM<'btn', [], ['small', 'medium', 'large']>, 'btn--small' | 'btn--medium' | 'btn--large' >>,
  // テスト追加 複数*複数の場合
  Expect<Equal<BEM<'btn', ['price', 'tax'], ['warning', 'success']>, 'btn__price--warning' | 'btn__price--success' | 'btn__tax--warning' | 'btn__tax--success' >>,
]
