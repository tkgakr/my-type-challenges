/*
 * 612 - kebabcase
 * Difficulty: medium
 */

/* _____________ Your Code Here _____________ */
// 小文字への変換用
interface ToLowerCase {
    A: 'a'
    B: 'b'
    C: 'c'
    D: 'd'
    E: 'e'
    F: 'f'
    G: 'g'
    H: 'h'
    I: 'i'
    J: 'j'
    K: 'k'
    L: 'l'
    M: 'm'
    N: 'n'
    O: 'o'
    P: 'p'
    Q: 'q'
    R: 'r'
    S: 's'
    T: 't'
    U: 'u'
    V: 'v'
    W: 'w'
    X: 'x'
    Y: 'y'
    Z: 'z'
}
// 大文字判定用の型 → 'A' | 'B' ...'Z'
type UpperCase = keyof ToLowerCase

/* 以下の方法は S extends `${infer L}${infer M extends UpperCase}${infer R}` の
 * Lが 1文字目しかキャプチャしないためうまくいかなかった
type KebabCase<S extends string> =
  // 最初の1文字目のが大文字かチェック
  S extends `${infer F extends UpperCase}${infer R}`
    // 1文字目を小文字に変換して再帰
    ? KebabCase<`${ToLowerCase[F]}${R}`>
    // 2文字目以降の文字が大文字かチェック
    : S extends `${infer L}${infer M extends UpperCase}${infer R}`
      // - + 小文字変換して再帰
      ? KebabCase<`${L}-${ToLowerCase[M]}${R}`>
      : S
*/

// 再帰の先頭かどうかを判断するためのオプションをつける
type KebabCase<S extends string, First extends boolean = true> =
  // 最初の文字と残りにわける
  S extends `${infer F}${infer R}`
    // F が大文字かチェック
    ? F extends UpperCase
      // F が大文字の場合は全体の先頭かによって `-` をつけるか考慮。2文字目以降を再帰で処理。
      ? `${First extends true ? '' : '-'}${ToLowerCase[F]}${KebabCase<R, false>}`
      // F が小文字の場合はそのまま残りの文字を再帰で処理
      : `${F}${KebabCase<R, false>}`
    // 文字列が空文字だった場合はそのまま返して再帰の終了条件とする
    : S

// 別解 先頭文字を小文字にする `Uncapitalize<StringType>` を用いた解法
type KebabCase2<S extends string> =
  // 最初の文字と残りにわける
  S extends `${infer L}${infer R}`
    // 残りの文字列の先頭（2文字目）が小文字かを判定
    ? R extends Uncapitalize<R>
      // 既に小文字。1文字目を小文字変換してのこりはそのまま再帰
      ? `${Uncapitalize<L>}${KebabCase2<R>}`
      // 大文字。1文字目を小文字変換して、ハイフンをつけて再帰(2文字目が小文字変換されるのは次回)
      : `${Uncapitalize<L>}-${KebabCase2<R>}`
    // 文字列が空文字だった場合はそのまま返して再帰の終了条件となる
    : S;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<KebabCase<'FooBarBaz'>, 'foo-bar-baz'>>,
  Expect<Equal<KebabCase<'fooBarBaz'>, 'foo-bar-baz'>>,
  Expect<Equal<KebabCase<'foo-bar'>, 'foo-bar'>>,
  Expect<Equal<KebabCase<'foo_bar'>, 'foo_bar'>>,
  Expect<Equal<KebabCase<'Foo-Bar'>, 'foo--bar'>>,
  Expect<Equal<KebabCase<'ABC'>, 'a-b-c'>>,
  Expect<Equal<KebabCase<'-'>, '-'>>,
  Expect<Equal<KebabCase<''>, ''>>,
  Expect<Equal<KebabCase<'😎'>, '😎'>>,
  // テスト追加最初の文字だけが大叔父
  Expect<Equal<KebabCase<'Abc'>, 'abc'>>,
  Expect<Equal<KebabCase<'ABc'>, 'a-bc'>>,
]

type cases2= [
  Expect<Equal<KebabCase2<'FooBarBaz'>, 'foo-bar-baz'>>,
  Expect<Equal<KebabCase2<'fooBarBaz'>, 'foo-bar-baz'>>,
  Expect<Equal<KebabCase2<'foo-bar'>, 'foo-bar'>>,
  Expect<Equal<KebabCase2<'foo_bar'>, 'foo_bar'>>,
  Expect<Equal<KebabCase2<'Foo-Bar'>, 'foo--bar'>>,
  Expect<Equal<KebabCase2<'ABC'>, 'a-b-c'>>,
  Expect<Equal<KebabCase2<'-'>, '-'>>,
  Expect<Equal<KebabCase2<''>, ''>>,
  Expect<Equal<KebabCase2<'😎'>, '😎'>>,
  // テスト追加最初の文字だけが大叔父
  Expect<Equal<KebabCase2<'Abc'>, 'abc'>>,
  Expect<Equal<KebabCase2<'ABc'>, 'a-bc'>>,
]
