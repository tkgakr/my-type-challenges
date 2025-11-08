#!/bin/bash

echo "🚀 Dev Container セットアップを開始..."

# Node.jsバージョン確認
echo "📦 Node.js バージョン: $(node --version)"
echo "📦 npm バージョン: $(npm --version)"

# Corepackを有効化（pnpm管理用）
echo "🔧 Corepack を有効化..."
sudo corepack enable
sudo corepack prepare pnpm@8.15.0 --activate

# pnpmバージョン確認
echo "📦 pnpm バージョン: $(pnpm --version)"

# 依存関係のインストール
echo "📚 依存関係をインストール..."
pnpm install

# ディレクトリ構造の作成
echo "📁 ディレクトリ構造を作成..."
mkdir -p solutions/{easy,medium,hard,extreme}

# 実行権限を付与
chmod +x scripts/*.sh 2>/dev/null || true

# Node.jsバージョンチェック
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 20 ]; then
    echo "⚠️  警告: Node.js 20以上を推奨します（現在: v$NODE_VERSION）"
fi

# submodulesの最新化
echo "🔄 original-type-challenges の最新化..."
git submodule update --remote --merge

echo "✅ セットアップ完了！"
