#!/bin/bash

# original-type-challenges サブモジュールを最新化するスクリプト
# 実行後、親リポジトリへのコミットが必要です

set -e

echo "🔄 original-type-challenges を最新化..."

# サブモジュールのリモートから最新を取得してマージ
git submodule update --remote --merge

echo "✅ サブモジュールを最新化しました"
echo ""
echo "📝 以下のコマンドで変更をコミットしてください:"
echo "   git add original-type-challenges"
echo "   git commit -m \"chore: update original-type-challenges submodule\""
