/*
 * 4179 - flip
 * Difficulty: medium
 */

/* _____________ Your Code Here _____________ */
// T の各値を string | number | boolean に制約することで、テンプレートリテラル `${T[K]}` で文字列キーに変換可能にする
type Flip<T extends Record<string, string | number | boolean>> = {
  // Tの各プロパティの値を、戻り値のプロパティキーとして使用する。
  // テンプレートリテラルを使うことで、true/false などの boolean 値も文字列キーとして扱える
  [K in keyof T as `${T[K]}`]: K
}

/* _____________ Test Cases _____________ */
import type { Equal, Expect, NotEqual } from '@type-challenges/utils'

type cases = [
  Expect<Equal<{ a: 'pi' }, Flip<{ pi: 'a' }>>>,
  Expect<NotEqual<{ b: 'pi' }, Flip<{ pi: 'a' }>>>,
  Expect<Equal<{ 3.14: 'pi', true: 'bool' }, Flip<{ pi: 3.14, bool: true }>>>,
  Expect<Equal<{ val2: 'prop2', val: 'prop' }, Flip<{ prop: 'val', prop2: 'val2' }>>>,
]
