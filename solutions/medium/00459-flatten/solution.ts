/*
 * 459 - flatten
 * Difficulty: medium
 */

/* _____________ Your Code Here _____________ */
// T は配列である制約をもつ
type Flatten<T extends any[]> =
  // T を最初の要素 F と残りの要素 R にわける
  T extends [infer F, ...infer R]
    // 最初の要素が配列かを判定
    ? F extends any[]
      // Fが配列の場合は再帰的にフラット化し、残りの要素も再帰的にフラット化して結合する
      ? [...Flatten<F>, ...Flatten<R>]
      // Fが配列でない場合はFのフラット化は終了、残りの要素は再帰的にフラット化して結合する
      : [F, ...Flatten<R>]
    // T が配列であることは制約しているので、ここに到達するのは空の配列
    : T

// GitHubの解法
// https://github.com/type-challenges/type-challenges/issues/511
// この解法はシンプルだが、Tが配列でない場合にエラーにならない。
type Flatten2<T> = T extends []
  ? [] 
  : T extends [infer First, ...infer Rest]
    ? [...Flatten2<First>, ...Flatten2<Rest>]
    : [T]

// GitHubの解法
// https://github.com/type-challenges/type-challenges/issues/1314
// 298 の解法と同様に、アキュムレータ T に結果を積み上げていく方法
// 初期値として空配列を持つアキュムレータ T を定義
// 例) Flatten3<[1, 2, [3, 4], [[[5]]]]>
type Flatten3<S extends any[], T extends any[] = []> =
  // 1. S を先頭要素 F と残り R に分割
  S extends [infer F, ...infer R]
    ? F extends any[]
      // 2. F が配列なら F を展開して先頭に押し戻し、再度処理する
      //    例) F = [3, 4] のとき `Flatten3<[[3, 4], ..., T]>` → `Flatten3<[3, 4, ...], T>`
      ? Flatten3<[...F, ...R], T>
      // 3. 配列でない要素なら T の末尾に積み上げ、残り R を処理する
      //    例) F = 1 のとき `Flatten3<[2, ...], [1]>` のように進む
      : Flatten3<[...R], [...T, F]>
  // 4. S が空配列になったら、結果を蓄えた T を返す
  //    上記の例では最終的に `[1, 2, 3, 4, 5]` を返す
  : T
/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Flatten<[]>, []>>,
  Expect<Equal<Flatten<[1, 2, 3, 4]>, [1, 2, 3, 4]>>,
  Expect<Equal<Flatten<[1, [2]]>, [1, 2]>>,
  Expect<Equal<Flatten<[1, 2, [3, 4], [[[5]]]]>, [1, 2, 3, 4, 5]>>,
  Expect<Equal<Flatten<[{ foo: 'bar', 2: 10 }, 'foobar']>, [{ foo: 'bar', 2: 10 }, 'foobar']>>,
]

// @ts-expect-error
type error = Flatten<'1'>

type cases2 = [
  Expect<Equal<Flatten2<[]>, []>>,
  Expect<Equal<Flatten2<[1, 2, 3, 4]>, [1, 2, 3, 4]>>,
  Expect<Equal<Flatten2<[1, [2]]>, [1, 2]>>,
  Expect<Equal<Flatten2<[1, 2, [3, 4], [[[5]]]]>, [1, 2, 3, 4, 5]>>,
  Expect<Equal<Flatten2<[{ foo: 'bar', 2: 10 }, 'foobar']>, [{ foo: 'bar', 2: 10 }, 'foobar']>>,
]

type error2 = Flatten2<'1'>

type cases3 = [
  Expect<Equal<Flatten3<[]>, []>>,
  Expect<Equal<Flatten3<[1, 2, 3, 4]>, [1, 2, 3, 4]>>,
  Expect<Equal<Flatten3<[1, [2]]>, [1, 2]>>,
  Expect<Equal<Flatten3<[1, 2, [3, 4], [[[5]]]]>, [1, 2, 3, 4, 5]>>,
  Expect<Equal<Flatten3<[{ foo: 'bar', 2: 10 }, 'foobar']>, [{ foo: 'bar', 2: 10 }, 'foobar']>>,
]

// @ts-expect-error
type error3 = Flatten3<'1'>
