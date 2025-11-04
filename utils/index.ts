// オリジナルのtype-challengesのユーティリティ型を再エクスポート
export type { Equal, Expect, NotEqual, IsAny, Debug, MergeInsertions } from '@type-challenges/utils'

// 追加のヘルパー型
export type Prettify<T> = {
  [K in keyof T]: T[K]
} & {}

export type DeepPrettify<T> = {
  [K in keyof T]: T[K] extends object ? DeepPrettify<T[K]> : T[K]
} & {}

// テスト用のアサーション
export type Assert<T extends true> = T
export type IsTrue<T extends true> = T
export type IsFalse<T extends false> = T

// デバッグ用
export type TODO = any
export type TODO_ANY = any
