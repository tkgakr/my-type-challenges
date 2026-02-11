/*
 * 29785 - deep-omit
 * Difficulty: medium
 */

/* _____________ Your Code Here _____________ */
// 解法1: 子要素の除去指定有無を先にチェックするアプローチ
type DeepOmit<T, U extends string> =
  // Uが子要素の除去を求めているかチェック
  U extends  `${infer Parent}.${infer Child}`
    ? {[K in keyof T]
        // プロパティーキー K が、除去対象の親要素であるかチェック
        : K extends Parent
          // プロパティー値に対して、子要素を除去対象に指定して再帰
          ? DeepOmit<T[K], Child>
          // 指定外のプロパティーはそのまま返す
          : T[K]
      }
    // 子要素の指定がなければ Omit の適用
    : Omit<T, U>

// 解法2: key remapping で除去と再帰を一つの mapped type にまとめるアプローチ
type DeepOmit2<T, U extends string> = {
  // key remapping により、U に一致するプロパティーは除去(`.`付きの場合は除去されない)
  [K in keyof T as K extends U ? never : K]
    // U が子要素の除去を求めているかチェック
    : U extends `${infer Parent}.${infer Child}`
      // Kが除去指定の親要素と一致するかチェック
      ? K extends Parent
        // プロパティー値に対して、子要素を除去対象に指定して再帰
        ? DeepOmit2<T[K], Child>
        // 指定外のプロパティーはそのまま返す
        : T[K]
      // 子要素のチェックを求めていなければ、プロパティ値をそのまま返す
      : T[K]
}

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type obj = {
  person: {
    name: string
    age: {
      value: number
    }
  }
}

type cases = [
  Expect<Equal<DeepOmit<obj, 'person'>, {}>>,
  Expect<Equal<DeepOmit<obj, 'person.name'>, { person: { age: { value: number } } }>>,
  Expect<Equal<DeepOmit<obj, 'name'>, obj>>,
  Expect<Equal<DeepOmit<obj, 'person.age.value'>, { person: { name: string, age: {} } }>>,
]

type cases2 = [
  Expect<Equal<DeepOmit2<obj, 'person'>, {}>>,
  Expect<Equal<DeepOmit2<obj, 'person.name'>, { person: { age: { value: number } } }>>,
  Expect<Equal<DeepOmit2<obj, 'name'>, obj>>,
  Expect<Equal<DeepOmit2<obj, 'person.age.value'>, { person: { name: string, age: {} } }>>,
]
