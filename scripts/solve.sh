#!/bin/bash

# カラー出力の定義
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 使用方法を表示
show_usage() {
    echo "使用方法: solve.sh [番号]"
    echo "例: sh scripts/solve.sh 4"
    echo ""
    echo "指定した番号から難易度を自動検出します"
}

# 引数チェック
if [ $# -lt 1 ]; then
    show_usage
    exit 1
fi

CHALLENGE_NUM=$1
CHALLENGE_NUM_PADDED=$(printf "%05d" "$CHALLENGE_NUM")
DATE=$(date +%Y-%m-%d)
TIME=$(date +%H:%M:%S)

# チャレンジを検索（original-type-challengesディレクトリから）
echo -e "${BLUE}🔍 チャレンジ #${CHALLENGE_NUM_PADDED} を検索中...${NC}"
CHALLENGE_DIR=$(find original-type-challenges/questions -type d -name "${CHALLENGE_NUM_PADDED}-*" | head -1)

if [ -z "$CHALLENGE_DIR" ]; then
    echo -e "${RED}❌ チャレンジが見つかりません${NC}"
    echo -e "${YELLOW}ヒント: original-type-challengesディレクトリを確認してください${NC}"
    exit 1
fi

# チャレンジ情報を抽出
CHALLENGE_BASENAME=$(basename "$CHALLENGE_DIR")
DIFFICULTY=$(echo "$CHALLENGE_BASENAME" | cut -d'-' -f2)
CHALLENGE_NAME=$(echo "$CHALLENGE_BASENAME" | cut -d'-' -f3-)

if [ -z "$DIFFICULTY" ] || [ -z "$CHALLENGE_NAME" ]; then
    echo -e "${RED}❌ チャレンジ情報の解析に失敗しました${NC}"
    exit 1
fi
echo -e "${GREEN}✅ 発見: ${CHALLENGE_NAME}${NC}"

# ソリューションディレクトリを作成
SOLUTION_DIR="solutions/${DIFFICULTY}/${CHALLENGE_NUM_PADDED}-${CHALLENGE_NAME}"
mkdir -p "$SOLUTION_DIR"
# 問題をコピー
if [ -f "${CHALLENGE_DIR}/README.ja.md" ]; then
    cp "${CHALLENGE_DIR}/README.ja.md" "${SOLUTION_DIR}/question.md"
else
    cp "${CHALLENGE_DIR}/README.md" "${SOLUTION_DIR}/question.md"
fi

# 解答の雛形を作成
cat > "${SOLUTION_DIR}/solution.ts" << EOF
/*
 * ${CHALLENGE_NUM} - ${CHALLENGE_NAME}
 * Difficulty: ${DIFFICULTY}
 */

/* _____________ Your Code Here _____________ */
EOF

if [ -f "${CHALLENGE_DIR}/template.ts" ]; then
    cat "${CHALLENGE_DIR}/template.ts" >> "${SOLUTION_DIR}/solution.ts"
else
    echo "// template.ts が見つかりませんでした。" >> "${SOLUTION_DIR}/solution.ts"
fi

cat >> "${SOLUTION_DIR}/solution.ts" << EOF

/* _____________ Test Cases _____________ */
EOF

if [ -f "${CHALLENGE_DIR}/test-cases.ts" ]; then
    cat "${CHALLENGE_DIR}/test-cases.ts" >> "${SOLUTION_DIR}/solution.ts"
else
    echo "// test-cases.ts が見つかりませんでした。" >> "${SOLUTION_DIR}/solution.ts"
fi

# 解答メモを作成
cat > "${SOLUTION_DIR}/solution-notes.md" << EOF
# Challenge #${CHALLENGE_NUM} - ${CHALLENGE_NAME}

**難易度**: ${DIFFICULTY}  
**実施日**: ${DATE}  

## 問題

[オリジナルの問題](https://github.com/type-challenges/type-challenges/tree/main/questions/${CHALLENGE_NUM_PADDED}-${DIFFICULTY}-${CHALLENGE_NAME})

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

### 新しく学んだこと、再確認したこと
<!-- 新しい発見や学びを記述 -->

### つまずいたポイント
<!-- 難しかった部分とその解決方法 -->

### 参考リンク
<!-- 参考にした資料のリンク -->

---
*Generated at ${DATE} ${TIME}*
EOF

# ESLintでフォーマット
#npx eslint solution.ts --fix 2>/dev/null || true

echo -e "${GREEN}📁 ファイル作成完了: ${SOLUTION_DIR}${NC}"
