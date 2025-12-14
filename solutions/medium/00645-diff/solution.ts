/*
 * 645 - diff
 * Difficulty: medium
 */

/* _____________ Your Code Here _____________ */
/**
 * 失敗: プロパティを全列挙してしまっており、value に never を入れてしまっていた
type Diff<O, O1> = {
  // O と O1 全ての key について Mapped Types で網羅
  [P in keyof O | keyof O1]:
    P extends keyof O
      ? P extends keyof O1
        ? never
        : O[P]
      : P extends keyof O1
        ? O1[P]
        :never
}
 */

// 解法1 オブジェクト型から直接重複するキーを取り除く
// `keyof (O | O1)` は O と O1 の共通プロパティになる
// それをユーティリティ型のオミットにより、 O と O1 の交差型から取り除く
type Diff<O, O1> = Omit<O & O1, keyof (O | O1)>

// 解法2 重複しないキーを取り出して、Mapped Types に適用する
type UnionDiff<T,U> = Exclude<T, U> | Exclude<U, T>
// ユニオンのDiff はこうもかける。こっちのほうが直感的かもしれない。
type UnionDiff2<T,U> = Exclude<T | U, T & U>
type Diff2<O, O1> = {
  // 差分プロパティに対して、交差型から値を取り出す。
  [P in UnionDiff2<keyof O, keyof O1>]: (O & O1)[P]
}

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type Foo = {
  name: string
  age: string
}
type Bar = {
  name: string
  age: string
  gender: number
}
type Coo = {
  name: string
  gender: number
}

type cases = [
  Expect<Equal<Diff<Foo, Bar>, { gender: number }>>,
  Expect<Equal<Diff<Bar, Foo>, { gender: number }>>,
  Expect<Equal<Diff<Foo, Coo>, { age: string, gender: number }>>,
  Expect<Equal<Diff<Coo, Foo>, { age: string, gender: number }>>,
]

type intersectionFooBar = Foo & Bar
// = {
//     name: string;
//     age: string;
// } & {
//     name: string;
//     age: string;
//     gender: number;
// }

type unionFooBar = Foo | Bar
// = {
//     name: string;
//     age: string;
// } | {
//     name: string;
//     age: string;
//     gender: number;
// }

type keyofUnionFooBar = keyof(Foo | Bar)
// = (keyof Foo) & (keyof Bar)
// = "name" | "age"


type cases2 = [
  Expect<Equal<UnionDiff<keyof Foo, keyof Bar>, 'gender'>>,
  Expect<Equal<UnionDiff<keyof Bar, keyof Foo>, 'gender'>>,
  Expect<Equal<UnionDiff<keyof Foo, keyof Coo>, 'age' | 'gender'>>,
  Expect<Equal<UnionDiff<keyof Coo, keyof Foo>, 'age' | 'gender'>>,
  Expect<Equal<UnionDiff2<keyof Foo, keyof Bar>, 'gender'>>,
  Expect<Equal<UnionDiff2<keyof Bar, keyof Foo>, 'gender'>>,
  Expect<Equal<UnionDiff2<keyof Foo, keyof Coo>, 'age' | 'gender'>>,
  Expect<Equal<UnionDiff2<keyof Coo, keyof Foo>, 'age' | 'gender'>>,
  Expect<Equal<Diff2<Foo, Bar>, { gender: number }>>,
  Expect<Equal<Diff2<Bar, Foo>, { gender: number }>>,
  Expect<Equal<Diff2<Foo, Coo>, { age: string, gender: number }>>,
  Expect<Equal<Diff2<Coo, Foo>, { age: string, gender: number }>>,
]
