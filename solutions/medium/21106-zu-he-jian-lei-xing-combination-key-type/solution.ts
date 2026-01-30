/*
 * 21106 - zu-he-jian-lei-xing-combination-key-type
 * Difficulty: medium
 */

/* _____________ Your Code Here _____________ */
// 实现 Combs
type Combs<T extends any[]> =
  // 文字列に制約した最初の要素と残りの要素にわける
  T extends [infer First extends string, ...infer Rest]
    // Rest[number]（'ctrl' | 'opt' | 'fn' のようなユニオン型）が　文字列に制約した Second として推論される
    ? Rest[number] extends infer Second extends string
      // 条件型の分配によって各メンバーに対して `${First} ${Second}` が適用され、ユニオン型になる。
      // 残りの要素についても再帰でユニオン型に結合
      ? `${First} ${Second}` | Combs<Rest>
      : never
    // 配列要素がなくなったら再帰終了
    : never

// 解法2: 解法1のリファクタリング
type Combs2<T extends any[]> =
  // 文字列に制約した最初の要素と残りの要素にわける
  T extends [infer First extends string, ...infer Rest extends string[]]
    // Rest[number]（'ctrl' | 'opt' | 'fn' のようなユニオン型）がテンプレートリテラルにある場合、それぞれを適用したユニオン型になる。
    // 残りの要素についても再帰でユニオン型に結合
    ? `${First} ${Rest[number]}` | Combs2<Rest>
    // 配列要素がなくなったら再帰終了
    : never

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type ModifierKeys = ['cmd', 'ctrl', 'opt', 'fn']
type CaseTypeOne = 'cmd ctrl' | 'cmd opt' | 'cmd fn' | 'ctrl opt' | 'ctrl fn' | 'opt fn'

type cases = [
  Expect<Equal<Combs<ModifierKeys>, CaseTypeOne>>,
  Expect<Equal<Combs2<ModifierKeys>, CaseTypeOne>>,
]
