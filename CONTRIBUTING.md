# 貢献ガイド

agent-skill-pluginsプロジェクトへの貢献を歓迎します！このガイドでは、新しいスキルやプラグインを追加する方法を説明します。

## 新しいClaude Code Skillの追加

### 1. スキルの定義

`claude-code/skills/` ディレクトリに新しいJSONファイルを作成します：

```json
{
  "name": "your-skill-name",
  "version": "1.0.0",
  "description": "スキルの説明",
  "author": "あなたの名前",
  "parameters": {
    "param1": {
      "type": "string",
      "description": "パラメータの説明",
      "required": true
    }
  },
  "steps": [
    {
      "action": "action-name",
      "description": "ステップの説明",
      "parameters": {}
    }
  ],
  "examples": [
    {
      "description": "使用例の説明",
      "command": "your-skill-name --param1=value"
    }
  ]
}
```

### 2. ドキュメントの追加

スキルの使用例を `claude-code/examples/` に追加します。

### 3. テスト

スキルが正しく動作することを確認してください。

## 新しいCodex CLI Pluginの追加

### 1. プラグインの作成

`codex-cli/plugins/` ディレクトリに新しいJavaScriptファイルを作成します：

```javascript
module.exports = {
  name: 'your-plugin-name',
  version: '1.0.0',
  description: 'プラグインの説明',
  author: 'あなたの名前',
  
  commands: {
    'command-name': {
      description: 'コマンドの説明',
      options: {
        '--option': {
          description: 'オプションの説明',
          type: 'string',
          default: 'default-value'
        }
      },
      action: async (args, options) => {
        // コマンドの実装
        console.log('Hello from your plugin!');
      }
    }
  }
};
```

### 2. 使用例の追加

プラグインの使用例を `codex-cli/examples/` に追加します。

### 3. テスト

プラグインが正しく動作することを確認してください。

## コーディング規約

- **命名規則**: ケバブケース（kebab-case）を使用
- **言語**: 日本語のコメントとドキュメントを推奨
- **フォーマット**: JSON は2スペースインデント
- **エラーハンドリング**: 適切なエラーメッセージを提供

## プルリクエストのガイドライン

1. **明確なタイトル**: 変更内容が分かるタイトルをつける
2. **詳細な説明**: 何を追加/変更したか、なぜ必要かを説明
3. **使用例**: 新機能の使用例を含める
4. **テスト**: 動作確認済みであることを明記

## レビュープロセス

1. プルリクエストを作成
2. メンテナーによるレビュー
3. フィードバックへの対応
4. マージ

## 質問やサポート

質問や提案がある場合は、Issuesで報告してください。

## ライセンス

このプロジェクトに貢献することで、あなたの貢献がMITライセンスの下でリリースされることに同意したものとみなされます。
