# Codex CLI Plugins

このディレクトリには、Codex CLI用のプラグインファイルが含まれています。

## 利用可能なプラグイン

### git-helper.js
Git操作を簡単にするヘルパープラグイン。スマートコミット機能やブランチクリーンアップ機能を提供します。

**主な機能:**
- `smart-commit`: AIを使って適切なコミットメッセージを生成
- `branch-cleanup`: マージ済みブランチを自動削除

**使い方:**
```bash
codex git-helper smart-commit --all
```

### project-scaffolder.js
プロジェクトの雛形を素早く生成するプラグイン。React、Vue、Node.js、Python、Goなど様々なテンプレートに対応。

**主な機能:**
- `new`: 新しいプロジェクトを作成
- `add-component`: プロジェクトにコンポーネントを追加

**使い方:**
```bash
codex project-scaffolder new --template=react --name=my-app
```

### code-formatter.js
コードフォーマットを統一するプラグイン。Prettier、ESLint、Black、gofmtなどに対応。

**主な機能:**
- `format`: コードをフォーマット
- `lint`: コードをリント
- `analyze`: コード品質を分析

**使い方:**
```bash
codex code-formatter format --fix
```

## プラグインのインストール

1. 使用したいプラグインファイルをダウンロード
2. Codex CLIのプラグインディレクトリにコピー:
   ```bash
   cp *.js ~/.codex-cli/plugins/
   ```
3. プラグインを有効化:
   ```bash
   codex plugin enable plugin-name
   ```

## カスタムプラグインの作成

新しいプラグインを作成する場合は、[貢献ガイド](../../CONTRIBUTING.md)を参照してください。
