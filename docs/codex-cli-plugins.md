# Codex CLI Plugins ガイド

## プラグインとは

Codex CLI Pluginsは、Codex CLIコマンドラインツールの機能を拡張するためのモジュールです。プラグインを使用することで、独自のコマンドや機能を追加できます。

## プラグインの構造

プラグインは通常、以下の構造を持ちます：

```javascript
module.exports = {
  name: 'plugin-name',
  version: '1.0.0',
  description: 'プラグインの説明',
  commands: {
    'command-name': {
      description: 'コマンドの説明',
      options: {},
      action: async (args, options) => {
        // コマンドの実装
      }
    }
  }
};
```

## 利用可能なプラグイン

### 開発支援プラグイン

- **git-helper**: Git操作を補助
- **project-scaffolder**: プロジェクト雛形を生成
- **env-manager**: 環境変数を管理

### ユーティリティプラグイン

- **file-converter**: ファイル形式を変換
- **code-formatter**: コードフォーマットを統一
- **log-analyzer**: ログファイルを解析

### 統合プラグイン

- **github-integration**: GitHub APIと統合
- **slack-notifier**: Slackへ通知
- **jira-connector**: JIRAと連携

## プラグインのインストール

```bash
# プラグインディレクトリにコピー
cp plugin-name.js ~/.codex-cli/plugins/

# または、プラグインマネージャーを使用
codex plugin install plugin-name
```

## プラグインの使用

```bash
# プラグインのコマンドを実行
codex plugin-name command-name --option=value

# プラグイン一覧を表示
codex plugin list

# プラグインを有効化/無効化
codex plugin enable plugin-name
codex plugin disable plugin-name
```

## カスタムプラグインの作成

1. プラグインテンプレートを使用

```javascript
const { Plugin } = require('codex-cli');

class MyPlugin extends Plugin {
  constructor() {
    super({
      name: 'my-plugin',
      version: '1.0.0',
      description: 'My custom plugin'
    });
  }

  register() {
    this.addCommand('hello', {
      description: 'Say hello',
      action: () => console.log('Hello!')
    });
  }
}

module.exports = MyPlugin;
```

2. プラグインをテスト

```bash
codex plugin test ./my-plugin.js
```

3. プラグインを公開

```bash
codex plugin publish my-plugin
```

## ベストプラクティス

- プラグイン名は一意で分かりやすいものにする
- バージョン管理を適切に行う
- エラーメッセージは明確にする
- ドキュメントを充実させる
- テストを書く
