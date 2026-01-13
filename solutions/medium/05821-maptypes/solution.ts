/*
 * 5821 - maptypes
 * Difficulty: medium
 */

/* _____________ Your Code Here _____________ */
// R は プロパティ `mapFrom` と `mapTo` をもつオブジェクトであることを制約する
type MapTypes<T, R extends { mapFrom: any, mapTo: any}> = {
  [K in keyof T] : T[K] extends R['mapFrom']
    // `T[K] extends R['mapFrom']` だけだと、R が union のとき `R['mapFrom']` も union になり、
    // `T[K]` がそのいずれかに extends すれば true となる。その結果 `R['mapTo']` は union 全体から取得され、
    // 本来関係ない `mapTo` まで含まれてしまう。そこで `R extends { mapFrom: T[K] }` を使うことで
    // conditional type の distributive 特性により R の各メンバーを個別に評価し、
    // `mapFrom` が `T[K]` に一致するメンバーの `mapTo` だけを取り出す。
    ? R extends {mapFrom: T[K]}
      ? R['mapTo']
      : never
    : T[K]
}

type MapTypesNG<T, R extends { mapFrom: any, mapTo: any}> = {
  [K in keyof T] : T[K] extends R['mapFrom']
    ? R['mapTo']
    : T[K]
}

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<MapTypes<{ stringToArray: string }, { mapFrom: string, mapTo: [] }>, { stringToArray: [] }>>,
  Expect<Equal<MapTypes<{ stringToNumber: string }, { mapFrom: string, mapTo: number }>, { stringToNumber: number }>>,
  Expect<Equal<MapTypes<{ stringToNumber: string, skipParsingMe: boolean }, { mapFrom: string, mapTo: number }>, { stringToNumber: number, skipParsingMe: boolean }>>,
  Expect<Equal<MapTypes<{ date: string }, { mapFrom: string, mapTo: Date } | { mapFrom: string, mapTo: null }>, { date: null | Date }>>,
  Expect<Equal<MapTypes<{ date: string }, { mapFrom: string, mapTo: Date | null }>, { date: null | Date }>>,
  Expect<Equal<MapTypes<{ fields: Record<string, boolean> }, { mapFrom: Record<string, boolean>, mapTo: string[] }>, { fields: string[] }>>,
  Expect<Equal<MapTypes<{ name: string }, { mapFrom: boolean, mapTo: never }>, { name: string }>>,
  Expect<Equal<MapTypes<{ name: string, date: Date }, { mapFrom: string, mapTo: boolean } | { mapFrom: Date, mapTo: string }>, { name: boolean, date: string }>>,
]

// { name: string | boolean, date: string | boolean }
type _ = MapTypesNG<{ name: string, date: Date }, { mapFrom: string, mapTo: boolean } | { mapFrom: Date, mapTo: string }>