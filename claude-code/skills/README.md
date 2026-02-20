# Claude Code Skills

このディレクトリには、Claude Code用のスキル定義ファイルが含まれています。

## 利用可能なスキル

### code-review.json
コードレビューを自動実行するスキル。セキュリティ、パフォーマンス、スタイル、ベストプラクティスをチェックします。

**使い方:**
```bash
claude-code run code-review --target=./src/app.js
```

### test-generator.json
ソースコードからユニットテストを自動生成するスキル。Jest、Mocha、pytestなど、様々なテストフレームワークに対応。

**使い方:**
```bash
claude-code run test-generator --sourceFile=./src/utils.js --testFramework=jest
```

### api-doc-generator.json
APIエンドポイントからドキュメントを自動生成するスキル。OpenAPI、Swagger、Markdown形式に対応。

**使い方:**
```bash
claude-code run api-doc-generator --source=./src/routes --format=openapi
```

## スキルのインストール

1. 使用したいスキルファイルをダウンロード
2. Claude Codeの設定ディレクトリにコピー:
   ```bash
   cp *.json ~/.claude-code/skills/
   ```
3. Claude Codeを再起動

## カスタムスキルの作成

新しいスキルを作成する場合は、[貢献ガイド](../../CONTRIBUTING.md)を参照してください。
