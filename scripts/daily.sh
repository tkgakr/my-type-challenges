#!/bin/bash

DATE=$(date +%Y-%m-%d)
TIME=$(date +%H:%M:%S)
WEEKDAY=$(date +%A)

# 日次ログファイル
LOG_FILE="logs/daily/${DATE}.md"
mkdir -p logs/daily

# ログファイルを作成
cat > "$LOG_FILE" << EOF
# Daily Practice Log

## 📅 ${DATE} (${WEEKDAY})

### ⏰ セッション記録
- 開始: ${TIME}
- 終了: 
- 作業時間: 

### 🎯 本日の目標
- [ ] Easy最低1問
- [ ] コードをESLintでフォーマット
- [ ] 解法の言語化

### 📝 取り組んだチャレンジ
<!-- 
例:
- ✅ #4 Pick (Easy) - 完了
- 🔄 #2 Return Type (Medium) - 作業中
-->

### 💡 学習メモ
<!-- 新しく学んだ型テクニックや気づき -->

### 🤔 疑問点
<!-- 調査が必要な内容 -->

### 📊 本日の成果
- 解決: 0問
- 試行: 0問

### 🚀 明日への申し送り
<!-- 次回優先的に取り組むこと -->

---
*Consistency is key! 🔥*
EOF

# ESLintでフォーマット
npx eslint "$LOG_FILE" --fix 2>/dev/null || true

# Gitコミット
git add "$LOG_FILE"
git commit -m "📝 Daily log: ${DATE}

Daily TypeScript practice session
- Date: ${DATE}
- Day: ${WEEKDAY}

#TypeScript #StudyLog"

echo "✅ 日次ログを作成しました: ${LOG_FILE}"
