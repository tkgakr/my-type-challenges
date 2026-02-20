/*
 * 35252 - isalphabet
 * Difficulty: medium
 */

/* _____________ Your Code Here _____________ */
// 解法1 愚直にユニオンで定義
type Alphabet = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H' | 'I' | 'J' | 'K' | 'L' | 'M' | 'N' | 'O' | 'P' | 'Q' | 'R' | 'S' | 'T' | 'U' | 'V' | 'W' | 'X' | 'Y' | 'Z'
              | 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g' | 'h' | 'i' | 'j' | 'k' | 'l' | 'm' | 'n' | 'o' | 'p' | 'q' | 'r' | 's' | 't' | 'u' | 'v' | 'w' | 'x' | 'y' | 'z'
type IsAlphabet<S extends string> =
  S extends Alphabet ? true : false

// 解法2 ユーティリティ型を使う
type IsAlphabet2<S extends string> =
  // アルファベットは大文字化と小文字化の結果が異なる（例: 'A' vs 'a'）
  // 非アルファベットは変換されないため両者が一致する（例: '9' vs '9'）
  // → Uppercase<S> extends Lowercase<S> が true なら非アルファベット
  Uppercase<S> extends Lowercase<S> ? false : true

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<IsAlphabet<'A'>, true>>,
  Expect<Equal<IsAlphabet<'z'>, true>>,
  Expect<Equal<IsAlphabet<'9'>, false>>,
  Expect<Equal<IsAlphabet<'!'>, false>>,
  Expect<Equal<IsAlphabet<'😂'>, false>>,
  Expect<Equal<IsAlphabet<''>, false>>,
]

type cases2 = [
  Expect<Equal<IsAlphabet2<'A'>, true>>,
  Expect<Equal<IsAlphabet2<'z'>, true>>,
  Expect<Equal<IsAlphabet2<'9'>, false>>,
  Expect<Equal<IsAlphabet2<'!'>, false>>,
  Expect<Equal<IsAlphabet2<'😂'>, false>>,
  Expect<Equal<IsAlphabet2<''>, false>>,
]
