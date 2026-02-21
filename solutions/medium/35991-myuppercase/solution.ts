/*
 * 35991 - myuppercase
 * Difficulty: medium
 */

/* _____________ Your Code Here _____________ */
// 解法1: 1種類ずつ条件型を適用するアプローチ
type UpperCaseChar<C extends string> =
  C extends 'a' ? 'A':
  C extends 'b' ? 'B':
  C extends 'c' ? 'C':
  C extends 'd' ? 'D':
  C extends 'e' ? 'E':
  C extends 'f' ? 'F':
  C extends 'g' ? 'G':
  C extends 'h' ? 'H':
  C extends 'i' ? 'I':
  C extends 'j' ? 'J':
  C extends 'k' ? 'K':
  C extends 'l' ? 'L':
  C extends 'm' ? 'M':
  C extends 'n' ? 'N':
  C extends 'o' ? 'O':
  C extends 'p' ? 'P':
  C extends 'q' ? 'Q':
  C extends 'r' ? 'R':
  C extends 's' ? 'S':
  C extends 't' ? 'T':
  C extends 'u' ? 'U':
  C extends 'v' ? 'V':
  C extends 'w' ? 'W':
  C extends 'x' ? 'X':
  C extends 'y' ? 'Y':
  C extends 'z' ? 'Z':
  C 

type MyUppercase<T extends string> =
  T extends `${infer First}${infer Rest}`
    ? `${UpperCaseChar<First>}${MyUppercase<Rest>}`
    : ''

// 解法2: Mappingを使用するアプローチ
interface Mapping {
  a: 'A'
  b: 'B'
  c: 'C'
  d: 'D'
  e: 'E'
  f: 'F'
  g: 'G'
  h: 'H'
  i: 'I'
  j: 'J'
  k: 'K'
  l: 'L'
  m: 'M'
  n: 'N'
  o: 'O'
  p: 'P'
  q: 'Q'
  r: 'R'
  s: 'S'
  t: 'T'
  u: 'U'
  v: 'V'
  w: 'W'
  x: 'X'
  y: 'Y'
  z: 'Z'
}
type MyUppercase2<T extends string> =
  T extends `${infer First}${infer Rest}`
    // FirstがMappingのキーであるかを判定して、該当する値を取得する
    ? `${First extends keyof Mapping ? Mapping[First] : First}${MyUppercase2<Rest>}`
    : ''

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<MyUppercase<'a'>, 'A'>>,
  Expect<Equal<MyUppercase<'Z'>, 'Z'>>,
  Expect<Equal<MyUppercase<'A z h yy 😃cda\n\t  a   '>, 'A Z H YY 😃CDA\n\t  A   '>>,
]

type cases2 = [
  Expect<Equal<MyUppercase2<'a'>, 'A'>>,
  Expect<Equal<MyUppercase2<'Z'>, 'Z'>>,
  Expect<Equal<MyUppercase2<'A z h yy 😃cda\n\t  a   '>, 'A Z H YY 😃CDA\n\t  A   '>>,
]
