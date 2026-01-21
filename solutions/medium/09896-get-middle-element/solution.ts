/*
 * 9896 - get-middle-element
 * Difficulty: medium
 */

/* _____________ Your Code Here _____________ */
// 解法1: 要素数が2つ以内の場合でもinfer による推論を適用するアプローチ
type GetMiddleElement<T extends any[]> =
  // 左右に１つずつ、かつ、任意の要素数をその間に持つ形で推測
  T extends [infer L, ...infer M, infer R]
    // 真ん中に要素を持つかチェック
    ? M extends []
      // 真ん中に要素がないということは、左右にひとつずつの2要素
      ? [L, R]
      // 要素が3つ以上ある場合は、左右の要素を落として再帰
      : GetMiddleElement<M>
    // 両端に要素がないということは、要素がないか、真ん中のひとつだけ
    : T

// 解法2: 要素が2つ以内であれば、それが解なので無駄な推論をしないアプローチ
type GetMiddleElement2<T extends any[]> =
  T['length'] extends 0 | 1 | 2
    // 要素数が2以下ならそのまま返す
    ? T
    // 要素数が3以上の場合、両端の要素を落とした真ん中の要素を推論
    // 左右の要素は使わないので infer での推論は不要
    : T extends [any, ...infer M, any]
      // 真ん中の要素で再帰
      ? GetMiddleElement2<M>
      // ここには到達しない
      : never

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<GetMiddleElement<[]>, []>>,
  Expect<Equal<GetMiddleElement<[1, 2, 3, 4, 5]>, [3]>>,
  Expect<Equal<GetMiddleElement<[1, 2, 3, 4, 5, 6]>, [3, 4]>>,
  Expect<Equal<GetMiddleElement<[() => string]>, [() => string]>>,
  Expect<Equal<GetMiddleElement<[() => number, '3', [3, 4], 5]>, ['3', [3, 4]]>>,
  Expect<Equal<GetMiddleElement<[() => string, () => number]>, [() => string, () => number]>>,
  Expect<Equal<GetMiddleElement<[never]>, [never]>>,
]
// @ts-expect-error
type error = GetMiddleElement<1, 2, 3>

// 上記は引数の数でエラーになっているので追加の確認
// @ts-expect-error
type error2 = GetMiddleElement<1>

type cases2 = [
  Expect<Equal<GetMiddleElement2<[]>, []>>,
  Expect<Equal<GetMiddleElement2<[1, 2, 3, 4, 5]>, [3]>>,
  Expect<Equal<GetMiddleElement2<[1, 2, 3, 4, 5, 6]>, [3, 4]>>,
  Expect<Equal<GetMiddleElement2<[() => string]>, [() => string]>>,
  Expect<Equal<GetMiddleElement2<[() => number, '3', [3, 4], 5]>, ['3', [3, 4]]>>,
  Expect<Equal<GetMiddleElement2<[() => string, () => number]>, [() => string, () => number]>>,
  Expect<Equal<GetMiddleElement2<[never]>, [never]>>,
]
