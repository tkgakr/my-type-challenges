# Type Challenges 学習ガイド

## 学習環境の起動

```bash
# VSCodeでプロジェクトを開く
cd my-type-challenges
code .

# Dev Containerを起動
# Cmd/Ctrl + Shift + P → "Dev Containers: Reopen in Container"
```

## サブモジュールの最新化

original-type-challenges を最新版に更新したい場合は、以下のスクリプトを実行します。

```bash
sh scripts/update-submodule.sh
```

実行後、変更を親リポジトリにコミットしてください。

```bash
git add original-type-challenges
git commit -m "chore: update original-type-challenges submodule"
```

## 学習フロー

1. チャレンジを開始

    ```bash
    sh scripts/solve.sh 4 easy
    ```

2. ソリューションを編集（IDE上で）

    - `solution.ts` に解答を記述する
    - `solution-notes.md` に解説を記述する
    - 全体をタイプチェックしたい場合は pnpm コマンドでチェックする

        ```bash
        pnpm run check
        ```

3. Gitで進捗を更新
