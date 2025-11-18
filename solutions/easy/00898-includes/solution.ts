/*
 * 898 - includes
 * Difficulty: easy
 */

/* _____________ Your Code Here _____________ */
// 配列を先頭と残りに分離して、先頭がUと一致するかを判定する
// 一致する場合はtrue、そうでない場合は再帰的に残りの配列を判定する
// →このやり方は配列内の型とUの型が一致してなければだめだった。
// type Includes<T extends readonly any[], U> = T extends [infer First, ...infer Rest]
//   ? First extends U
//     ? true
//     : Includes<Rest, U>
//   : false

// Indexed Access 型を使用して、T を ユニオンに変換する
// ユニオン型に変換した各要素に対して条件を適用する
// Distributive Conditional Types を使って、Uがユニオンのいずれかの要素を満たすかを判定する
// → これも配列内の型とUの型が一致してなければだめだった。
// type Includes<T extends readonly any[], U> = U extends T[number] ? true : false

// 双方向に型の厳密一致を判定する型を作成
type IsEqual<X, Y> = (<T>() => T extends X ? 1 : 2) extends (<T>() => T extends Y ? 1 : 2)
  ? (<T>() => T extends Y ? 1 : 2) extends (<T>() => T extends X ? 1 : 2)
    ? true
    : false
  : false

type Includes<T extends readonly any[], U> = T extends [infer First, ...infer Rest]
  ? IsEqual<First, U> extends true
    ? true
    : Includes<Rest, U>
  : false

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Includes<['Kars', 'Esidisi', 'Wamuu', 'Santana'], 'Kars'>, true>>,
  Expect<Equal<Includes<['Kars', 'Esidisi', 'Wamuu', 'Santana'], 'Dio'>, false>>,
  Expect<Equal<Includes<[1, 2, 3, 5, 6, 7], 7>, true>>,
  Expect<Equal<Includes<[1, 2, 3, 5, 6, 7], 4>, false>>,
  Expect<Equal<Includes<[1, 2, 3], 2>, true>>,
  Expect<Equal<Includes<[1, 2, 3], 1>, true>>,
  Expect<Equal<Includes<[{}], { a: 'A' }>, false>>,
  Expect<Equal<Includes<[boolean, 2, 3, 5, 6, 7], false>, false>>,
  Expect<Equal<Includes<[true, 2, 3, 5, 6, 7], boolean>, false>>,
  Expect<Equal<Includes<[false, 2, 3, 5, 6, 7], false>, true>>,
  Expect<Equal<Includes<[{ a: 'A' }], { readonly a: 'A' }>, false>>,
  Expect<Equal<Includes<[{ readonly a: 'A' }], { a: 'A' }>, false>>,
  Expect<Equal<Includes<[1], 1 | 2>, false>>,
  Expect<Equal<Includes<[1 | 2], 1>, false>>,
  Expect<Equal<Includes<[null], undefined>, false>>,
  Expect<Equal<Includes<[undefined], null>, false>>,
]
