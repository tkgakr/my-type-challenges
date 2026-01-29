/*
 * 21104 - findall
 * Difficulty: medium
 */

/* _____________ Your Code Here _____________ */
//解法1: 一致する文字列があったら結果用アキュムレータにつめるアプローチ
// Accはインデックス(長さ)の取得用アキュムレータなので、要素は何でもいいが、イメージしやすいように処理中の文字を詰めていく想定とする
type FindAll<T extends string, P extends string, Acc extends any[] = [], Result extends number[] = []> =
  P extends ''
    // Pが空文字の場合は一致判定できないのでアーリーリターンする
    ? []
    // 文字列を1文字目と残りに分解
    : T extends `${infer First}${infer Rest}`
      // 文字列がPから始まるかをチェック
      ? T extends `${P}${string}`
        // 文字列がPから始まる場合は、アキュムレータに1文字目をつめ、現在のアキュムレータの長さを結果配列につめて残りの文字列を再帰
        ? FindAll<Rest, P, [...Acc, First], [...Result, Acc['length']]>
        // 文字列がPから始まらない場合は、アキュムレータに1文字目を詰めて再帰
        : FindAll<Rest, P, [...Acc, First], Result>
      // 文字列が空になったら結果を返す
      : Result

// 解法2: 結果タプルの中で、再帰をスタックさせるアプローチ
type FindAll2<T extends string, P extends string, Acc extends any[] = []> =
  P extends ''
    // Pが空文字の場合は一致判定できないのでアーリーリターンする
    ? []
    // 文字列を1文字目と残りに分解
    : T extends `${infer First}${infer Rest}`
      ? [
        // Pで始まるなら今のインデックスを結果の要素につめる、Pで始まらないならスキップ
        ...(T extends `${P}${string}` ? [Acc['length']] : []),
        // のこりの文字列を再帰で処理
        ...FindAll2<Rest, P, [...Acc, First]>
      ]
      : []

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<FindAll<'Collection of TypeScript type challenges', 'Type'>, [14]>>,
  Expect<Equal<FindAll<'Collection of TypeScript type challenges', 'pe'>, [16, 27]>>,
  Expect<Equal<FindAll<'Collection of TypeScript type challenges', ''>, []>>,
  Expect<Equal<FindAll<'', 'Type'>, []>>,
  Expect<Equal<FindAll<'', ''>, []>>,
  Expect<Equal<FindAll<'AAAA', 'A'>, [0, 1, 2, 3]>>,
  Expect<Equal<FindAll<'AAAA', 'AA'>, [0, 1, 2]>>,
]

type cases2 = [
  Expect<Equal<FindAll2<'Collection of TypeScript type challenges', 'Type'>, [14]>>,
  Expect<Equal<FindAll2<'Collection of TypeScript type challenges', 'pe'>, [16, 27]>>,
  Expect<Equal<FindAll2<'Collection of TypeScript type challenges', ''>, []>>,
  Expect<Equal<FindAll2<'', 'Type'>, []>>,
  Expect<Equal<FindAll2<'', ''>, []>>,
  Expect<Equal<FindAll2<'AAAA', 'A'>, [0, 1, 2, 3]>>,
  Expect<Equal<FindAll2<'AAAA', 'AA'>, [0, 1, 2]>>,
]
