/*
 * 34007 - compare-array-length
 * Difficulty: medium
 */

/* _____________ Your Code Here _____________ */
// 解法1: 再帰によって、ひとつずつ要素を減らしていき、先に要素がなくなったほうが小さいと判定するアプローチ
// - T, U の先頭要素を同時に取り除き、再帰的に比較する
// - T が先に空になれば T の方が短い (-1)、U が先に空になれば T の方が長い (1)
// - 同時に空になれば同じ長さ (0)
type CompareArrayLength<T extends any[], U extends any[]> =
  T extends [infer FirstT, ...infer RestT]
    ? U extends [infer FirstU, ...infer RestU]
      ? CompareArrayLength<RestT, RestU>
      : 1
    : U extends [infer FirstU, ...infer RestU]
      ? -1
      : 0

// 解法2: タプルの length と keyof を組み合わせたアプローチ（再帰不要）
// - まず T['length'] extends U['length'] で長さが等しいかを判定 → 等しければ 0
// - 次に U の長さ（数値）をテンプレートリテラルで文字列化し、T の keyof に含まれるか判定
//   - タプルの keyof にはインデックス "0" | "1" | ... | "length-1" が含まれる
//   - U['length'] が T の有効なインデックス内 → T の方が長い (1)
//   - U['length'] が T のインデックス外 → T の方が短い (-1)
type CompareArrayLength2<T extends any[], U extends any[]> =
  T['length'] extends U['length']
  ? 0
  : `${U['length']}` extends keyof T ? 1 : -1;

// 解法3: keyof 同士の部分集合関係で比較するアプローチ（再帰不要）
// - 長いタプルの keyof は短いタプルの keyof を包含する（インデックスが多いため）
// - keyof T extends keyof U: T のキーがすべて U にも存在する
//   - true かつ keyof U extends keyof T も true → キー集合が一致 → 同じ長さ (0)
//   - true かつ keyof U extends keyof T が false → U の方がキーが多い → T が短い (-1)
//   - false → T の方がキーが多い → T が長い (1)
type CompareArrayLength3<T extends any[], U extends any[]> =
  keyof T extends keyof U
    ? keyof U extends keyof T
      ? 0
      : -1
    : 1

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<CompareArrayLength<[1, 2, 3, 4], [5, 6]>, 1>>,
  Expect<Equal<CompareArrayLength<[1, 2], [3, 4, 5, 6]>, -1>>,
  Expect<Equal<CompareArrayLength<[], []>, 0>>,
  Expect<Equal<CompareArrayLength<[1, 2, 3], [4, 5, 6]>, 0>>,
]

type cases2 = [
  Expect<Equal<CompareArrayLength2<[1, 2, 3, 4], [5, 6]>, 1>>,
  Expect<Equal<CompareArrayLength2<[1, 2], [3, 4, 5, 6]>, -1>>,
  Expect<Equal<CompareArrayLength2<[], []>, 0>>,
  Expect<Equal<CompareArrayLength2<[1, 2, 3], [4, 5, 6]>, 0>>,
]

type cases3 = [
  Expect<Equal<CompareArrayLength3<[1, 2, 3, 4], [5, 6]>, 1>>,
  Expect<Equal<CompareArrayLength3<[1, 2], [3, 4, 5, 6]>, -1>>,
  Expect<Equal<CompareArrayLength3<[], []>, 0>>,
  Expect<Equal<CompareArrayLength3<[1, 2, 3], [4, 5, 6]>, 0>>,
]
