# クイックスタートガイド

## はじめに

このリポジトリには、Claude CodeとCodex CLI用のエージェントスキルとプラグインが含まれています。

## インストール

### Claude Code Skills

```bash
# スキルディレクトリを作成（存在しない場合）
mkdir -p ~/.claude-code/skills

# スキルをコピー
cp claude-code/skills/*.json ~/.claude-code/skills/
```

### Codex CLI Plugins

```bash
# プラグインディレクトリを作成（存在しない場合）
mkdir -p ~/.codex-cli/plugins

# プラグインをコピー
cp codex-cli/plugins/*.js ~/.codex-cli/plugins/
```

## 基本的な使い方

### Claude Code

```bash
# コードレビューを実行
claude-code run code-review --target=./src

# テストを生成
claude-code run test-generator --sourceFile=./src/app.js

# APIドキュメントを生成
claude-code run api-doc-generator --source=./src/routes
```

### Codex CLI

```bash
# 新しいプロジェクトを作成
codex project-scaffolder new --template=react --name=my-app

# コードをフォーマット
codex code-formatter format --fix

# スマートコミット
codex git-helper smart-commit --all
```

## さらに詳しく

- [Claude Code Skillsドキュメント](./docs/claude-code-skills.md)
- [Codex CLI Pluginsドキュメント](./docs/codex-cli-plugins.md)
- [使用例](./claude-code/examples/usage-examples.md)
- [貢献ガイド](./CONTRIBUTING.md)

## サポート

質問や問題がある場合は、[Issues](https://github.com/hirokts/agent-skill-plugins/issues)で報告してください。
