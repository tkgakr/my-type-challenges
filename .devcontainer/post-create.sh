#!/bin/bash

echo "🚀 Dev Container セットアップを開始..."

# Node.jsバージョン確認
echo "📦 Node.js バージョン: $(node --version)"
echo "📦 npm バージョン: $(npm --version)"

# Corepackを有効化（pnpm管理用）
echo "🔧 Corepack を有効化..."
corepack enable
corepack prepare pnpm@latest --activate

# pnpmバージョン確認
echo "📦 pnpm バージョン: $(pnpm --version)"

# プロジェクトの初期化
echo "🔧 プロジェクトを初期化..."
if [ ! -f "package.json" ]; then
  pnpm init
fi

# 依存関係のインストール
echo "📚 依存関係をインストール..."
pnpm install

# ディレクトリ構造の作成
echo "📁 ディレクトリ構造を作成..."
mkdir -p solutions/{easy,medium,hard,extreme}
mkdir -p scripts
mkdir -p logs/daily
mkdir -p utils
mkdir -p .github/workflows

# 実行権限を付与
chmod +x scripts/*.sh 2>/dev/null || true

# Node.jsバージョンチェック
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 20 ]; then
    echo "⚠️  警告: Node.js 20以上を推奨します（現在: v$NODE_VERSION）"
fi

echo "✅ セットアップ完了！"
