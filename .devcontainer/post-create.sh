#!/bin/bash

echo "🚀 Dev Container セットアップを開始..."

# pnpmのインストール
echo "📦 pnpm をインストール..."
npm install -g pnpm@latest

# プロジェクトの初期化
echo "🔧 プロジェクトを初期化..."
if [ ! -f "package.json" ]; then
  pnpm init
fi

# オリジナルのtype-challengesから設定を参照
echo "📚 依存関係をインストール..."
pnpm add -D \
  typescript@latest \
  @types/node@20 \
  @total-typescript/ts-reset \
  tsx \
  vitest \
  @vitest/ui \
  eslint@^8.57.0 \
  @typescript-eslint/parser@^7.0.0 \
  @typescript-eslint/eslint-plugin@^7.0.0 \
  @antfu/eslint-config@^2.0.0

# ディレクトリ構造の作成
echo "📁 ディレクトリ構造を作成..."
mkdir -p solutions/{easy,medium,hard,extreme}
mkdir -p scripts
mkdir -p logs/daily
mkdir -p utils
mkdir -p .github/workflows

# 実行権限を付与
chmod +x scripts/*.sh 2>/dev/null || true

echo "✅ セットアップ完了！"