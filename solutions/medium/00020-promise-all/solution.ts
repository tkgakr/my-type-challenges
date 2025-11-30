/*
 * 20 - promise-all
 * Difficulty: medium
 */

/* _____________ Your Code Here _____________ */
/**
 * PromiseAll の型定義
 *
 * @template T - 配列型（タプル型を含む）を受け取るジェネリック型
 *
 * 【引数の型】
 * `readonly [...T]` - スプレッド演算子を使用することで、
 *   `as const` で渡されたタプル型のリテラル情報を保持する。
 *   例: [1, 2, 3] as const → T は [1, 2, 3] として推論される
 *
 * 【戻り値の型】
 * `Promise<{ [K in keyof T]: ... }>` - Mapped Types を使って
 *   配列/タプルの各要素を変換した結果を Promise でラップ。
 *
 * 【各要素の変換ロジック】
 * `T[K] extends Promise<infer R> ? R : T[K]`
 *   - 要素が Promise<R> 型なら → R を抽出（Awaited と同様の効果）
 *   - 要素が Promise でなければ → そのままの型を維持
 *
 * 【⚠️ Test4・Test5 が失敗する理由】
 * 条件型の分配法則（Distributive Conditional Types）は
 * 「裸の型パラメータ」にのみ適用される。
 *
 * `T[K]` はインデックスアクセス型であり、裸の型パラメータではないため、
 * `number | Promise<number>` のような union 型が分配されず、
 * 全体として評価される。
 *
 * 例: T[K] = number | Promise<number> の場合
 *   - 期待: number | number = number（各要素に分配）
 *   - 実際: (number | Promise<number>) extends Promise<infer R> ? ...
 *           → union 全体は Promise を継承しないため false
 *           → 結果は number | Promise<number> のまま
 *
 * 解決策: 分配を強制するヘルパー型を使用する
 *   type Awaited<T> = T extends Promise<infer R> ? R : T
 *   → T が裸の型パラメータなので union が分配される
 */
// declare function PromiseAll<T extends any[]>(values: readonly [...T]):
//   Promise<{ [K in keyof T]: T[K] extends Promise<infer R> ? R : T[K] }>

// 上記の解決策のままでは、Promise がネストしたときに失敗するため、再帰的に定義
type Awaited<T> = T extends Promise<infer R> ? Awaited<R> : T
declare function PromiseAll<T extends any[]>(values: readonly [...T]):
  Promise<{ [K in keyof T]: Awaited<T[K]> }>

  /* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

const promiseAllTest1 = PromiseAll([1, 2, 3] as const)
const promiseAllTest2 = PromiseAll([1, 2, Promise.resolve(3)] as const)
const promiseAllTest3 = PromiseAll([1, 2, Promise.resolve(3)])
const promiseAllTest4 = PromiseAll<Array<number | Promise<number>>>([1, 2, 3])
const promiseAllTest5 = PromiseAll<(number | Promise<string>)[]>([1, 2, Promise.resolve('3')])
// 追加: ネストした Promise のテスト
// 注: Promise.resolve は自動的にフラット化するため、明示的に型注釈でネストを強制
const nestedPromise: Promise<Promise<number>> = {} as any
const promiseAllTest6 = PromiseAll([nestedPromise] as const)

type cases = [
  Expect<Equal<typeof promiseAllTest1, Promise<[1, 2, 3]>>>,
  Expect<Equal<typeof promiseAllTest2, Promise<[1, 2, number]>>>,
  Expect<Equal<typeof promiseAllTest3, Promise<[number, number, number]>>>,
  Expect<Equal<typeof promiseAllTest4, Promise<number[]>>>,
  Expect<Equal<typeof promiseAllTest5, Promise<(number | string)[]>>>,
  Expect<Equal<typeof promiseAllTest6, Promise<[number]>>>,
]
