# Claude Code Skills ガイド

## スキルとは

Claude Code Skillsは、AIエージェントに特定のタスクを実行させるための定義ファイルです。スキルを定義することで、エージェントの能力を拡張し、特定のワークフローを自動化できます。

## スキルの構造

スキルは通常、以下の要素で構成されます：

```json
{
  "name": "skill-name",
  "description": "スキルの説明",
  "parameters": {
    "param1": {
      "type": "string",
      "description": "パラメータの説明"
    }
  },
  "steps": [
    {
      "action": "実行するアクション",
      "parameters": {}
    }
  ]
}
```

## 利用可能なスキル

### コード解析スキル

- **code-review**: コードレビューを自動化
- **refactor-detector**: リファクタリングの機会を検出
- **dependency-checker**: 依存関係の問題をチェック

### ドキュメント生成スキル

- **api-doc-generator**: APIドキュメントを自動生成
- **readme-generator**: READMEファイルを生成

### テストスキル

- **test-generator**: ユニットテストを自動生成
- **coverage-analyzer**: テストカバレッジを分析

## スキルの使い方

1. スキルファイルをダウンロード
2. Claude Codeの設定ディレクトリ（`~/.claude-code/skills/`）に配置
3. Claude Codeを再起動
4. スキルを呼び出す

```bash
claude-code run skill-name --param1=value1
```

## カスタムスキルの作成

独自のスキルを作成する場合：

1. スキルのテンプレートをコピー
2. `name`、`description`、`parameters`を編集
3. `steps`に実行するアクションを定義
4. テストして動作を確認

## ベストプラクティス

- スキル名は明確で説明的なものにする
- パラメータには適切なデフォルト値を設定
- エラーハンドリングを適切に実装
- ドキュメントを充実させる
