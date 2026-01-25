/*
 * 16259 - to-primitive
 * Difficulty: medium
 */

/* _____________ Your Code Here _____________ */
// 解法1: Function を先にチェックするパターン
type ToPrimitive<T> =
  // 関数型かどうかを最初にチェック（Function は object のサブタイプなので先に判定）
  T extends Function ? Function
  // オブジェクト型なら各プロパティに再帰的に ToPrimitive を適用
  : T extends object ? { [K in keyof T]: ToPrimitive<T[K]> }
  // プリミティブ型の場合: valueOf メソッドを持つか確認し、戻り値の型を推論
  // ※ valueOf() はJavaScriptの全プリミティブラッパー(String, Number, Boolean等)が持つメソッド
  // ※ 例: "Tom" (リテラル型) は { valueOf(): string } を満たすので P = string となる
  // ※ 例: 30 (リテラル型) は { valueOf(): number } を満たすので P = number となる
  // ※ 例: false (リテラル型) は { valueOf(): boolean } を満たすので P = boolean となる
  // ※ これにより 'Tom' → string, 30 → number, false → boolean のように変換される
  : T extends { valueOf(): infer P } ? P
  // valueOf を持たない場合はそのまま返す
  : T

// 解法2: object を先にチェックするパターン
type ToPrimitive2<T> =
  // まずオブジェクト型かどうかをチェック
  T extends object
    ? (
      // 関数もオブジェクトの一種なので、ここで関数かどうかを判定
      T extends (...args: any[]) => any ? Function
      // 関数でないオブジェクトなら各プロパティに再帰適用
      : {
        [K in keyof T]: ToPrimitive2<T[K]>
      }
    )
    // プリミティブ型の場合
    : (
      // valueOf メソッドの戻り値型を推論してプリミティブ型を取得
      // ※ valueOf は Object.prototype に定義されており、プリミティブ値を返す
      // ※ String.prototype.valueOf() → string を返す
      // ※ Number.prototype.valueOf() → number を返す
      // ※ Boolean.prototype.valueOf() → boolean を返す
      // ※ TypeScript ではリテラル型 'Tom' も構造的に { valueOf: () => string } を満たす
      // ※ これはリテラル型がそのプリミティブ型のメソッドを継承しているため
      T extends { valueOf: () => infer P } ? P : T
    )

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type PersonInfo = {
  name: 'Tom'
  age: 30
  married: false
  addr: {
    home: '123456'
    phone: '13111111111'
  }
  hobbies: ['sing', 'dance']
  readonlyArr: readonly ['test']
  fn: () => any
}

type ExpectedResult = {
  name: string
  age: number
  married: boolean
  addr: {
    home: string
    phone: string
  }
  hobbies: [string, string]
  readonlyArr: readonly [string]
  fn: Function
}

type cases = [
  Expect<Equal<ToPrimitive<PersonInfo>, ExpectedResult>>,
]

type cases2 = [
  Expect<Equal<ToPrimitive2<PersonInfo>, ExpectedResult>>,
]
