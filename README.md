# Agent Skills & Plugins

このリポジトリは、Claude CodeとCodex CLI用のAgent SkillsとPluginsを管理するためのリポジトリです。

## 概要

- **Claude Code Skills**: Claude Codeエージェント用のカスタムスキル定義
- **Codex CLI Plugins**: Codex CLI用のプラグイン拡張

## ディレクトリ構成

```
agent-skill-plugins/
├── claude-code/          # Claude Code関連
│   ├── skills/           # スキル定義
│   └── examples/         # 使用例
├── codex-cli/            # Codex CLI関連
│   ├── plugins/          # プラグイン
│   └── examples/         # 使用例
└── docs/                 # ドキュメント
```

## Claude Code Skills

Claude Code用のスキルは、エージェントに特定のタスクを実行させるための定義ファイルです。

### 使い方

1. `claude-code/skills/` から使用したいスキルをコピー
2. Claude Codeの設定ディレクトリに配置
3. エージェントから呼び出し

詳細は [Claude Code Skillsドキュメント](./docs/claude-code-skills.md) を参照してください。

## Codex CLI Plugins

Codex CLI用のプラグインは、コマンドラインツールの機能を拡張するためのモジュールです。

### 使い方

1. `codex-cli/plugins/` から使用したいプラグインをコピー
2. Codex CLIのプラグインディレクトリに配置
3. プラグインを有効化

詳細は [Codex CLI Pluginsドキュメント](./docs/codex-cli-plugins.md) を参照してください。

## 貢献

新しいスキルやプラグインの追加を歓迎します！

1. このリポジトリをフォーク
2. 新しいブランチを作成 (`git checkout -b feature/new-skill`)
3. 変更をコミット (`git commit -am 'Add new skill'`)
4. ブランチにプッシュ (`git push origin feature/new-skill`)
5. プルリクエストを作成

## ライセンス

MIT License