# Claude Code Skills 使用例

## コードレビュースキルの使用例

### 基本的な使い方

```bash
# 単一ファイルをレビュー
claude-code run code-review --target=./src/app.js

# ディレクトリ全体をレビュー
claude-code run code-review --target=./src
```

### 高度な使い方

```bash
# 高重要度の問題のみを検出
claude-code run code-review --target=./src --severity=high

# JSON形式で出力（CI/CD統合用）
claude-code run code-review --target=./src --outputFormat=json > review-results.json
```

## テスト生成スキルの使用例

### JavaScriptプロジェクト

```bash
# Jestテストを生成
claude-code run test-generator --sourceFile=./src/utils.js --testFramework=jest

# 高カバレッジのテストを生成
claude-code run test-generator --sourceFile=./src/api.js --coverage=90
```

### Pythonプロジェクト

```bash
# pytestテストを生成
claude-code run test-generator --sourceFile=./app.py --testFramework=pytest

# 特定の出力先に保存
claude-code run test-generator --sourceFile=./utils.py --outputPath=./tests/test_utils.py
```

## APIドキュメント生成スキルの使用例

### REST API

```bash
# OpenAPI形式でドキュメントを生成
claude-code run api-doc-generator --source=./src/routes

# Swagger形式で出力
claude-code run api-doc-generator --source=./api --format=swagger --outputFile=./docs/swagger.yaml
```

### Markdown形式

```bash
# 開発者向けMarkdownドキュメントを生成
claude-code run api-doc-generator --source=./src --format=markdown --outputFile=./API.md
```

## スキルの組み合わせ

複数のスキルを連携させて、より高度なワークフローを実現できます：

```bash
# 1. テストを生成
claude-code run test-generator --sourceFile=./src/app.js

# 2. コードレビューを実行
claude-code run code-review --target=./src

# 3. APIドキュメントを更新
claude-code run api-doc-generator --source=./src
```

## CI/CDパイプラインでの使用

```yaml
# .github/workflows/code-quality.yml
name: Code Quality Check

on: [push, pull_request]

jobs:
  review:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Run Code Review
        run: |
          claude-code run code-review --target=./src --outputFormat=json > review.json
      - name: Upload Results
        uses: actions/upload-artifact@v2
        with:
          name: review-results
          path: review.json
```
