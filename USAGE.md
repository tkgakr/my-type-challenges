# 初回起動とコミット
```bash
# IDEでプロジェクトを開く
cd my-type-challenges
code .  # IDEによって `cursor .` や `windsurf .` に読み替え

# Dev Containerを起動
# Cmd/Ctrl + Shift + P → "Dev Containers: Reopen in Container"

# Dev Container内で初期化
pnpm install
pnpm run lint

# 最初のコミット
git add .
git commit -m "🎉 Initial commit: Type Challenges environment
git push -u origin main
```

# 日々の学習フロー
```bash
# 1. 最新のチャレンジを取得
npm run sync-challenges

# 2. 日次ログを開始
npm run daily

# 3. チャレンジを開始
npm run solve 4 easy

# 4. ソリューションを編集（IDE上で）

# 5. ESLintでフォーマット
npm run format

# 6. テスト実行
npm test

# 7. 進捗を更新
npm run progress

# 8. GitHubにプッシュ
git push origin main
```