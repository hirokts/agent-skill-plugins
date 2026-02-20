# Codex CLI Plugins 使用例

## Git Helper プラグインの使用例

### スマートコミット

```bash
# 変更内容を解析してコミットメッセージを自動生成
codex git-helper smart-commit

# すべての変更をステージングしてコミット
codex git-helper smart-commit --all

# コミット後に自動プッシュ
codex git-helper smart-commit --all --push
```

### ブランチクリーンアップ

```bash
# マージ済みブランチの一覧を表示
codex git-helper branch-cleanup --dry-run

# マージ済みブランチを削除
codex git-helper branch-cleanup
```

## Project Scaffolder プラグインの使用例

### 新規プロジェクト作成

```bash
# Reactプロジェクトを作成
codex project-scaffolder new --template=react --name=my-app

# Node.jsプロジェクトを作成（Git初期化なし）
codex project-scaffolder new --template=node --name=my-api --git=false

# Pythonプロジェクトを作成（依存関係インストールなし）
codex project-scaffolder new --template=python --name=my-script --install=false
```

### コンポーネント追加

```bash
# 新しいReactコンポーネントを追加
codex project-scaffolder add-component --name=Header --type=component

# 新しいサービスを追加
codex project-scaffolder add-component --name=AuthService --type=service

# 新しいモデルを追加
codex project-scaffolder add-component --name=User --type=model
```

## Code Formatter プラグインの使用例

### フォーマット

```bash
# プロジェクト全体をフォーマット
codex code-formatter format --fix

# 特定のディレクトリをフォーマット
codex code-formatter format --path=./src --fix

# JavaScriptファイルのみをフォーマット
codex code-formatter format --type=js --fix

# フォーマットチェック（修正なし）
codex code-formatter format --check
```

### リント

```bash
# コードをリント
codex code-formatter lint

# 自動修正を適用
codex code-formatter lint --fix

# 特定のディレクトリをリント
codex code-formatter lint --path=./src
```

### コード品質分析

```bash
# コード品質を分析してレポート生成
codex code-formatter analyze

# 特定のディレクトリを分析
codex code-formatter analyze --path=./src

# カスタム出力先にレポートを保存
codex code-formatter analyze --output=./reports/quality.html
```

## プラグインの組み合わせ

複数のプラグインを連携させて効率的な開発ワークフローを実現：

```bash
# 1. 新しいプロジェクトを作成
codex project-scaffolder new --template=react --name=awesome-app

# 2. プロジェクトディレクトリに移動
cd awesome-app

# 3. コンポーネントを追加
codex project-scaffolder add-component --name=Dashboard

# 4. コードをフォーマット
codex code-formatter format --fix

# 5. コード品質をチェック
codex code-formatter analyze

# 6. 変更をコミット
codex git-helper smart-commit --all --push
```

## ワークフロー自動化

シェルスクリプトを使ってワークフローを自動化：

```bash
#!/bin/bash
# dev-workflow.sh

# 新機能の開発フロー
echo "新機能の開発を開始..."

# コンポーネント作成
codex project-scaffolder add-component --name=$1 --type=component

# フォーマット
codex code-formatter format --path=./src --fix

# リント
codex code-formatter lint --path=./src --fix

# 分析
codex code-formatter analyze

# コミット
codex git-helper smart-commit --all

echo "開発フロー完了！"
```

使用例：
```bash
chmod +x dev-workflow.sh
./dev-workflow.sh UserProfile
```
