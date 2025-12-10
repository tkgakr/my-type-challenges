/*
 * 527 - append-to-object
 * Difficulty: medium
 */

/* _____________ Your Code Here _____________ */
// U は プロパティキーである制約を加えないとエラーになる
type AppendToObject<T, U extends PropertyKey, V> = {
  // T のキーで構成されたユニオン型に U を追加した mapped type を定義
  // P が T のキーである場合は T[P]、そうでない場合は V
  [P in keyof T | U]: P extends keyof T ? T[P] : V
}

// 別解としてインターセクション型でオブジェクトを合成しようとしたが、
// ２つのオブジェクトのインターセクション型になってしい、単位のオブジェクト型にならない
type AppendToObject2<T, U extends PropertyKey, V> = {
  [P in keyof T]: T[P]
} & {
  // この書き方は 'U' という文字リテラルがプロパティ名として扱われ、ジェネリクス U が無視される
  // U: V
  // mapped type で U がプロパティ名として扱われ、ジェネリクス U が有効になる
  [P in U]: V
}

// { key: 'cat'; value: 'green' } & { home: boolean } となってしまう
type notFlatObject = AppendToObject2<test1, 'home', boolean>


/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type test1 = {
  key: 'cat'
  value: 'green'
}

type testExpect1 = {
  key: 'cat'
  value: 'green'
  home: boolean
}

type test2 = {
  key: 'dog' | undefined
  value: 'white'
  sun: true
}

type testExpect2 = {
  key: 'dog' | undefined
  value: 'white'
  sun: true
  home: 1
}

type test3 = {
  key: 'cow'
  value: 'yellow'
  sun: false
}

type testExpect3 = {
  key: 'cow'
  value: 'yellow'
  sun: false
  moon: false | undefined
}

type cases = [
  Expect<Equal<AppendToObject<test1, 'home', boolean>, testExpect1>>,
  Expect<Equal<AppendToObject<test2, 'home', 1>, testExpect2>>,
  Expect<Equal<AppendToObject<test3, 'moon', false | undefined>, testExpect3>>,
]
