# TypeScript 型定義パターン チートシート

このリポジトリの `solutions/**/solution.ts` で何度も出てくる、実装で使い回しやすい型定義パターンをまとめたものです。Type Challenges 由来のテクニックのうち、実務でもそのまま応用しやすいものに絞っています。

## 1. `keyof` + mapped type でオブジェクト形状を作る

もっとも基本になるパターンです。`Pick`、`Readonly`、`Record` 系の自作にそのまま使えます。

```ts
type PickKeys<T, K extends keyof T> = {
  [P in K]: T[P]
}
```

使いどころ:

- 既存の型から一部のプロパティだけ抜き出したい
- すべてのキーを別の形に変換したい
- API レスポンスやフォーム値の派生型を作りたい

このリポジトリの例:

- `MyPick`
- `MyReadonly`
- `TupleToObject`

参照:

- `solutions/easy/00004-pick/solution.ts`
- `solutions/easy/00007-readonly/solution.ts`
- `solutions/easy/00011-tuple-to-object/solution.ts`

## 2. key remapping (`as`) でキーを残す・消す・名前を変える

プロパティ単位でフィルタしたいときの定型です。`never` にしたキーは落ちます。

```ts
type OmitByValue<T, U> = {
  [K in keyof T as T[K] extends U ? never : K]: T[K]
}
```

キー名そのものを変えることもできます。

```ts
type PublicProps<T> = {
  [K in keyof T as K extends `_${string}` ? never : K]: T[K]
}
```

使いどころ:

- 値型が `string` / `boolean` などのプロパティだけ除外したい
- private 風の `_foo` を公開型から落としたい
- index signature を除去したい

このリポジトリの例:

- `OmitByType`
- `PickByType`
- `PublicType`
- `RemoveIndexSignature`

参照:

- `solutions/medium/02852-omitbytype/solution.ts`
- `solutions/medium/02595-pickbytype/solution.ts`
- `solutions/medium/28333-public-type/solution.ts`
- `solutions/medium/01367-remove-index-signature/solution.ts`

## 3. 修飾子を操作する (`readonly`, `?`, `-readonly`, `-?`)

既存型の性質だけ変えたいときに使います。

```ts
type Mutable<T> = {
  -readonly [K in keyof T]: T[K]
}

type RequiredProps<T> = {
  [K in keyof T]-?: T[K]
}
```

一部のキーだけ変更したいときは、型を分けて最後に合成します。

```ts
type MyReadonly2<T, K extends keyof T = keyof T> =
  { readonly [P in K]: T[P] } &
  { [P in keyof T as P extends K ? never : P]: T[P] }
```

使いどころ:

- 入力 DTO は optional、保存後の型は required にしたい
- immutable な public 型と mutable な内部型を分けたい
- 一部のフィールドだけ readonly / optional にしたい

このリポジトリの例:

- `Mutable`
- `MyReadonly2`
- `PartialByKeys`

参照:

- `solutions/medium/02793-mutable/solution.ts`
- `solutions/medium/00008-readonly-2/solution.ts`
- `solutions/medium/02757-partialbykeys/solution.ts`

## 4. 交差型を最後に「ならす」

`A & B` をそのまま返すと、表示が読みにくかったり、修飾子が見えづらいことがあります。mapped type を 1 回通すと見た目を整えやすくなります。

```ts
type Simplify<T> = {
  [K in keyof T]: T[K]
}
```

```ts
type PartialByKeys<T, K extends keyof T = keyof T> = Simplify<
  Partial<Pick<T, K>> & Omit<T, K>
>
```

使いどころ:

- `Pick<T, K> & Omit<T, K>` のような合成型を最終形にしたい
- エディタ上の表示を読みやすくしたい
- 条件付きで作った部分型を 1 つのオブジェクトとして扱いたい

このリポジトリの例:

- `IntersectionToObj`
- `PartialByKeys`

参照:

- `solutions/medium/02757-partialbykeys/solution.ts`

## 5. 条件型で分岐する

型レベルの `if` です。基本形はこれです。

```ts
type IfExtends<T, U, Then, Else> = T extends U ? Then : Else
```

代表例:

```ts
type MyExclude<T, U> = T extends U ? never : T
type StartsWith<S extends string, Prefix extends string> =
  S extends `${Prefix}${string}` ? true : false
```

使いどころ:

- 条件に応じて別の型へ切り替えたい
- `Exclude` / `Extract` / `NonNullable` 相当を自作したい
- 文字列パターンにマッチするかを判定したい

このリポジトリの例:

- `MyExclude`
- `If`
- `StartsWith`
- `EndsWith`

参照:

- `solutions/easy/00043-exclude/solution.ts`
- `solutions/easy/00268-if/solution.ts`
- `solutions/medium/02688-startswith/solution.ts`
- `solutions/medium/02693-endswith/solution.ts`

## 6. `infer` で内部の型を取り出す

関数、`Promise`、タプル、テンプレート文字列の中身を抽出するときの中心パターンです。

```ts
type MyReturnType<T> =
  T extends (...args: any[]) => infer R ? R : never

type MyParameters<T> =
  T extends (...args: infer P) => any ? P : never

type MyAwaited<T> =
  T extends Promise<infer R> ? MyAwaited<R> : T
```

使いどころ:

- 関数の戻り値型や引数型を再利用したい
- 非同期 API の解決後の型を取りたい
- ラッパー型の中身を安全に取り出したい

このリポジトリの例:

- `MyReturnType`
- `MyParameters`
- `Awaited`

参照:

- `solutions/medium/00002-return-type/solution.ts`
- `solutions/easy/03312-parameters/solution.ts`
- `solutions/medium/00020-promise-all/solution.ts`
- `solutions/easy/00189-awaited/solution.ts`

## 7. タプルを分解して再帰する

配列風 API を正確に型付けしたいときの定番です。

```ts
type First<T extends unknown[]> =
  T extends [infer Head, ...infer _Rest] ? Head : never

type Last<T extends unknown[]> =
  T extends [...infer _Rest, infer Tail] ? Tail : never

type Shift<T extends unknown[]> =
  T extends [infer _Head, ...infer Rest] ? Rest : []
```

再帰で構造を作ることもできます。

```ts
type TupleToNestedObject<T, U> =
  T extends [infer First, ...infer Rest]
    ? { [K in First & string]: TupleToNestedObject<Rest, U> }
    : U
```

使いどころ:

- 可変長引数の変換
- ルーティングパラメータやパンくず階層の型生成
- `zip`、`concat`、`flatten` のような配列操作型

このリポジトリの例:

- `First`
- `Last`
- `Shift`
- `Zip`
- `TupleToNestedObject`

参照:

- `solutions/easy/00014-first/solution.ts`
- `solutions/medium/00015-last/solution.ts`
- `solutions/medium/03062-shift/solution.ts`
- `solutions/medium/04471-zip/solution.ts`
- `solutions/medium/03188-tuple-to-nested-object/solution.ts`

## 8. テンプレートリテラル型で文字列を解析する

文字列ベースの API 名、イベント名、CSS クラス名などを型安全にしたいときに使います。

```ts
type ReplaceAll<
  S extends string,
  From extends string,
  To extends string
> =
  From extends ''
    ? S
    : S extends `${infer L}${From}${infer R}`
      ? `${L}${To}${ReplaceAll<R, From, To>}`
      : S
```

1 文字ずつ処理するパターンも頻出です。

```ts
type StringToUnion<S extends string> =
  S extends `${infer C}${infer Rest}` ? C | StringToUnion<Rest> : never
```

使いどころ:

- `fooBar` を `foo-bar` に変換したい
- `"a.b.c"` のような path 文字列を分解したい
- 命名規則を型で制約したい

このリポジトリの例:

- `Replace`
- `ReplaceAll`
- `Trim`
- `KebabCase`
- `PercentageParser`

参照:

- `solutions/medium/00116-replace/solution.ts`
- `solutions/medium/00119-replaceall/solution.ts`
- `solutions/medium/00108-trim/solution.ts`
- `solutions/medium/00612-kebabcase/solution.ts`
- `solutions/medium/01978-percentage-parser/solution.ts`

## 9. 深いオブジェクト変換は「ベースケースを先に決める」

再帰型は、どこで止めるかを先に決めると整理しやすいです。

```ts
type ToPrimitive<T> =
  T extends Function ? Function
  : T extends object ? { [K in keyof T]: ToPrimitive<T[K]> }
  : T extends { valueOf(): infer P } ? P
  : T
```

path 文字列で深いキーを辿るパターンもあります。

```ts
type DeepOmit<T, U extends string> =
  U extends `${infer Parent}.${infer Child}`
    ? {
        [K in keyof T]:
          K extends Parent ? DeepOmit<T[K], Child> : T[K]
      }
    : Omit<T, U>
```

使いどころ:

- API のレスポンスを UI 用に変換したい
- 深いネストの一部だけ除外したい
- schema や config から別の型を導出したい

このリポジトリの例:

- `ToPrimitive`
- `DeepOmit`
- `JSONSchema2TS`

参照:

- `solutions/medium/16259-to-primitive/solution.ts`
- `solutions/medium/29785-deep-omit/solution.ts`
- `solutions/medium/26401-json-schema-to-typescript/solution.ts`

## 10. 分配条件型を理解して、必要なら止める

`T extends U ? X : Y` の `T` が裸の型パラメータだと、union ごとに分配されます。

```ts
type ToArray<T> = T extends unknown ? T[] : never
// string | number -> string[] | number[]
```

分配を止めたいときは、タプルで包みます。

```ts
type IsNever<T> = [T] extends [never] ? true : false
```

`PromiseAll` のように、あえて分配を使いたい場面もあります。

```ts
type Awaited<T> = T extends Promise<infer R> ? Awaited<R> : T
```

使いどころ:

- `never` 判定
- union ごとの変換
- 期待した分配が起きない理由の切り分け

このリポジトリの例:

- `IsNever`
- `Awaited`
- `PromiseAll` の解説コメント

参照:

- `solutions/medium/01042-isnever/solution.ts`
- `solutions/medium/00020-promise-all/solution.ts`

## 11. 厳密な型一致判定が必要なときは関数シグネチャを使う

`extends` の片方向判定だけでは、`readonly` の違いや union の広さを見落とすことがあります。

```ts
type IsEqual<X, Y> =
  (<T>() => T extends X ? 1 : 2) extends
  (<T>() => T extends Y ? 1 : 2)
    ? (
        (<T>() => T extends Y ? 1 : 2) extends
        (<T>() => T extends X ? 1 : 2)
          ? true
          : false
      )
    : false
```

使いどころ:

- テスト用の型ユーティリティ
- タプル内に「同じ型があるか」を判定したい
- `readonly` の差も含めて比較したい

このリポジトリの例:

- `IsEqual`
- `Includes`

参照:

- `solutions/easy/00898-includes/solution.ts`

## 12. 関数シグネチャでは `readonly [...T]` が効く

呼び出し側のリテラル情報を保ったまま配列を受けたいときの定型です。

```ts
declare function PromiseAll<T extends unknown[]>(
  values: readonly [...T]
): Promise<{ [K in keyof T]: Awaited<T[K]> }>
```

使いどころ:

- `as const` で渡されたタプルをそのまま保持したい
- 可変長引数を安全に受けたい
- ライブラリ関数で推論精度を上げたい

このリポジトリの例:

- `PromiseAll`

参照:

- `solutions/medium/00020-promise-all/solution.ts`

## 実装で迷ったときの最短パターン

```ts
type Simplify<T> = { [K in keyof T]: T[K] }

type FilterKeys<T, U> = {
  [K in keyof T as T[K] extends U ? K : never]: T[K]
}

type OmitKeys<T, K extends keyof T> = {
  [P in keyof T as P extends K ? never : P]: T[P]
}

type ExtractReturn<T> = T extends (...args: any[]) => infer R ? R : never

type ExtractArgs<T> = T extends (...args: infer P) => any ? P : never

type UnwrapPromise<T> = T extends Promise<infer R> ? UnwrapPromise<R> : T

type Head<T extends unknown[]> = T extends [infer H, ...infer _] ? H : never

type Tail<T extends unknown[]> = T extends [infer _, ...infer R] ? R : []

type IsNever<T> = [T] extends [never] ? true : false
```

## 使い分けの目安

- オブジェクトのキーを触るなら、まず mapped type を考える
- 型の中身を取り出すなら、まず `infer` を考える
- 配列や引数列を触るなら、タプル分解を考える
- 文字列の命名規則を扱うなら、テンプレートリテラル型を考える
- 深い変換なら、ベースケースを先に決めて再帰する
- union が絡んで挙動がおかしいなら、分配条件型を疑う
