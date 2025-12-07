/*
 * 296 - permutation
 * Difficulty: medium
 */

/* _____________ Your Code Here _____________ */
// `T` のコピーとして、オプショナルの `K` を定義する 
type Permutation<T, K = T> =
  // 5. 再帰の終了条件、`T` が `never` かどうかを判定するには、`[]` で包む必要がある
  [T] extends [never]
    // 6. スプレッド構文で結合されると要素が追加されない（再帰の終端）
    // ['A', 'B', ...[]] | ['B', 'A', ...[]]
    // → ['A', 'B'] | ['B', 'A']
    ? []
    // 1. Distributive Conditional Types によって `T` がユニオン型の場合に分配則が適用される
    // 例) T = 'A' | 'B' の場合
    : T extends T
      // 2. ここでの `K` は、Conditional Types が適用されていないもとの `T`
      // ['A', ...Permutation<Exclude<K, 'A'>>] | ['B', ...Permutation<Exclude<K, 'B'>>]
      // 3. Excludeで、`K`(もとの`T`)から要素をのぞく
      // ['A', ...Permutation<'B'>] | ['B', ...Permutation<'A'>]
      // 4. 最後まで Exclude していくと、`T` が `never` になる
      // ['A', 'B', ...Permutation<never>] | ['B', 'A', ...Permutation<never>]
      ? [T, ...Permutation<Exclude<K, T>>]
      : never

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Permutation<'A'>, ['A']>>,
  Expect<Equal<Permutation<'A' | 'B' | 'C'>, ['A', 'B', 'C'] | ['A', 'C', 'B'] | ['B', 'A', 'C'] | ['B', 'C', 'A'] | ['C', 'A', 'B'] | ['C', 'B', 'A']>>,
  Expect<Equal<Permutation<'B' | 'A' | 'C'>, ['A', 'B', 'C'] | ['A', 'C', 'B'] | ['B', 'A', 'C'] | ['B', 'C', 'A'] | ['C', 'A', 'B'] | ['C', 'B', 'A']>>,
  Expect<Equal<Permutation<boolean>, [false, true] | [true, false]>>,
  Expect<Equal<Permutation<never>, []>>,
]
