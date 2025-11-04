#!/bin/bash

# カラー出力の定義
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 使用方法を表示
show_usage() {
    echo "使用方法: npm run solve [番号] [難易度]"
    echo "例: npm run solve 4 easy"
    echo ""
    echo "難易度: easy | medium | hard | extreme"
}

# 引数チェック
if [ $# -lt 2 ]; then
    show_usage
    exit 1
fi

CHALLENGE_NUM=$1
DIFFICULTY=$2
DATE=$(date +%Y-%m-%d)
TIME=$(date +%H:%M:%S)

# チャレンジを検索（original-type-challengesディレクトリから）
echo -e "${BLUE}🔍 チャレンジ #${CHALLENGE_NUM} を検索中...${NC}"
CHALLENGE_DIR=$(find original-type-challenges/questions -type d -name "*${CHALLENGE_NUM}-${DIFFICULTY}*" | head -1)

if [ -z "$CHALLENGE_DIR" ]; then
    echo -e "${RED}❌ チャレンジが見つかりません${NC}"
    echo -e "${YELLOW}ヒント: original-type-challengesディレクトリを確認してください${NC}"
    exit 1
fi

# チャレンジ名を抽出
CHALLENGE_NAME=$(basename "$CHALLENGE_DIR" | sed "s/^[0-9]*-${DIFFICULTY}-//")
echo -e "${GREEN}✅ 発見: ${CHALLENGE_NAME}${NC}"

# ソリューションディレクトリを作成
SOLUTION_DIR="solutions/${DIFFICULTY}/${CHALLENGE_NUM}-${CHALLENGE_NAME}"
mkdir -p "$SOLUTION_DIR"

# ソリューションファイルを作成（ESLintフォーマット準拠）
cat > "${SOLUTION_DIR}/solution.ts" << EOF
/*
 * Challenge #${CHALLENGE_NUM} - ${CHALLENGE_NAME}
 * Difficulty: ${DIFFICULTY}
 * Date: ${DATE}
 */

import type { Equal, Expect } from '@type-challenges/utils'

/* _____________ Your Code Here _____________ */

type MyType = any // TODO: implement

/* _____________ Test Cases _____________ */

type cases = [
  // TODO: Add test cases from original challenge
]

export type { MyType }
EOF

# テストファイルを作成
if [ -f "${CHALLENGE_DIR}/test-cases.ts" ]; then
    # オリジナルのテストケースを参照用にコピー
    cp "${CHALLENGE_DIR}/test-cases.ts" "${SOLUTION_DIR}/original-test-cases.ts"
fi

# Vitestテストファイルを作成
cat > "${SOLUTION_DIR}/solution.test.ts" << EOF
import { describe, expect, it } from 'vitest'
import type { Equal, Expect } from '@type-challenges/utils'

describe('Challenge #${CHALLENGE_NUM}: ${CHALLENGE_NAME}', () => {
  it('should compile without errors', () => {
    // TypeScriptコンパイルチェック
    expect(true).toBe(true)
  })

  it('type checks', () => {
    // ここに型テストを追加
    type Test = true
    const test: Expect<Equal<Test, true>> = true
    expect(test).toBe(true)
  })
})
EOF

# READMEファイルがあればコピー
if [ -f "${CHALLENGE_DIR}/README.md" ]; then
    cp "${CHALLENGE_DIR}/README.md" "${SOLUTION_DIR}/challenge.md"
fi

# ソリューション管理ファイルを作成
cat > "${SOLUTION_DIR}/README.md" << EOF
# Challenge #${CHALLENGE_NUM}: ${CHALLENGE_NAME}

**難易度**: ${DIFFICULTY}  
**開始日時**: ${DATE} ${TIME}  
**状態**: 🔄 作業中

## 問題

[オリジナルの問題](https://github.com/type-challenges/type-challenges/tree/main/questions/${CHALLENGE_NUM}-${DIFFICULTY}-${CHALLENGE_NAME})

## 解法

### アプローチ
<!-- ここに解法のアプローチを記述 -->

### 実装のポイント
<!-- 重要な実装ポイントを記述 -->

## 使用した型機能

- [ ] Generics
- [ ] Conditional Types (\`T extends U ? X : Y\`)
- [ ] Template Literal Types
- [ ] Mapped Types (\`{ [K in keyof T]: ... }\`)
- [ ] Type Inference (\`infer\`)
- [ ] Recursive Types
- [ ] Utility Types
- [ ] Index Access Types
- [ ] Union Types
- [ ] Intersection Types

## 学習メモ

### 新しく学んだこと
<!-- 新しい発見や学びを記述 -->

### つまずいたポイント
<!-- 難しかった部分とその解決方法 -->

### 参考リンク
<!-- 参考にした資料のリンク -->

---
*Generated at ${DATE} ${TIME}*
EOF

# GitでステージングしてESLintを実行
cd "$SOLUTION_DIR"
git add .

# ESLintでフォーマット
npx eslint solution.ts --fix 2>/dev/null || true

echo -e "${GREEN}📁 ファイル作成完了: ${SOLUTION_DIR}${NC}"
echo -e "${YELLOW}📝 次のステップ:${NC}"
echo "  1. cd ${SOLUTION_DIR}"
echo "  2. solution.ts を編集"
echo "  3. npm run lint でコードフォーマット"
echo "  4. npm test で型チェック"
echo "  5. npm run progress で進捗更新"
