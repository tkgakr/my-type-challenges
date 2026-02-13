# Challenge #30430 - tower-of-hanoi

**難易度**: medium  
**実施日**: 2026-02-13  

## 問題

[オリジナルの問題](https://github.com/type-challenges/type-challenges/tree/main/questions/30430-medium-tower-of-hanoi)

## 解法

### アプローチ

ハノイの塔の古典的な再帰アルゴリズムをそのまま型レベルで再現する。

N 枚のディスクを `From` → `To` へ移動するには:

1. 上の N-1 枚を `From` → `Intermediate` へ移動（`To` を中継）
2. 残り 1 枚を `From` → `To` へ移動
3. N-1 枚を `Intermediate` → `To` へ移動（`From` を中継）

この 3 ステップを再帰的に展開し、すべての移動手順をタプルとして返す。

### 実装のポイント

- **再帰の深さをタプル `Index` で管理**: `Index['length']` が `N` に等しくなったら再帰を停止（＝ディスク 0 枚 → 移動不要 → `[]`）。再帰のたびに `[...Index, 1]` で要素を追加し、深さを +1 する。
- **Variadic Tuple Types（`...`）で結果を結合**: 手順1 の結果・手順2 の `[From, To]`・手順3 の結果をスプレッドで 1 つのタプルに結合。
- **型パラメータのデフォルト値で塔の名前を設定**: `From = 'A'`, `To = 'B'`, `Intermediate = 'C'` をデフォルトにし、再帰時に役割を入れ替えることでアルゴリズムを実現。
- **N を直接デクリメントしない**: TypeScript の型レベルでは数値の減算ができないため、`Index` タプルの長さで「処理済みの深さ」を追跡し、`N` との比較で終了判定を行う。

## 使用した型機能

- [x] Generics
- [x] Conditional Types (`T extends U ? X : Y`)
- [ ] Template Literal Types
- [ ] Mapped Types (`{ [K in keyof T]: ... }`)
- [ ] Type Inference (`infer`)
- [x] Recursive Types
- [ ] Utility Types
- [x] Index Access Types
- [ ] Union Types
- [ ] Intersection Types

## 学習メモ

### 新しく学んだこと、再確認したこと

- 型レベルでの「カウンタ」はタプルの `length` プロパティで実現できる。数値の加減算が直接できない TypeScript の型システムにおいて、タプルへの要素追加が +1 の役割を果たす。
- Variadic Tuple Types（`...Tuple`）を使うと、再帰的に生成した複数のタプルを 1 つに結合できる。これにより、ハノイの塔のような「分割統治」型の再帰を型レベルで自然に表現できる。
- 再帰の各ステップで型パラメータの役割（From / To / Intermediate）を入れ替えるだけで、ハノイの塔のアルゴリズムがそのまま型に落とし込める。

### つまずいたポイント

- 「N を減らす」のではなく「Index を増やして N と比較する」という逆転の発想が必要。ランタイムの再帰（`n - 1` を渡す）とは異なるアプローチ。

### 参考リンク

- [Wikipedia - Tower of Hanoi](https://en.wikipedia.org/wiki/Tower_of_Hanoi)
- [GeeksForGeeks - Tower of Hanoi](https://www.geeksforgeeks.org/c-program-for-tower-of-hanoi)

---
*Generated at 2026-02-13 22:23:15*
