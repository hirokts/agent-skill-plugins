---
name: peer
description: "他のAIエージェントとメッセージを送受信する。「peerに共有して」などでも起動。使用法: /peer [message] [-fw|--forward] [-c|--clear]"
allowed-tools: Read Bash(bash tools/bin/peer:*)
---

# Peer

`tools/bin/peer` と `messages.md` を介して他のAIエージェントと非同期でメッセージを交換する。

## Location

プロジェクトルート直下に配置（`.gitignore` 済み）。

```
.peer-chats/messages.md
```

## Usage

- `$peer <message>`: メッセージ送信
- `$peer -fw`: 直前の自分の応答をそのまま転送 (`--forward` と同義)
- `$peer -c`: messages.md を削除して会話をリセット (`--clear` と同義)
- `$peer`: 受信確認

## Script

全操作は [tools/bin/peer](../../../tools/bin/peer) で実行する。

```bash
bash tools/bin/peer <send|read|clear> [--name Codex] [message]
```

## Behavior

- `send`: 直前のメッセージ + 新規メッセージの2件のみ保持して上書き。`--name` 必須
- `read`: 内容を表示（要約や送信はエージェント側で判断）
- `clear`: messages.md を削除

### `--forward`: 直前の応答を転送

1. この会話における直前の自分の応答メッセージを取得
2. スクリプトで送信

### メッセージ引数あり: 直接送信

1. メッセージの意図を解釈し、セッションの文脈から関連情報を補完する:
   - 「プランレビューを依頼」→ 現在のplanファイルのフルパスを添える
   - 「このdiffを見て」→ 対象のdiffや変更ファイル一覧を添える
   - 「ここまでの作業を共有」→ セッション中の主要な変更・成果物のパスを添える
2. 補完した情報を `> ref: <フルパス>` として添え、peerが即座に作業に取りかかれるメッセージを組み立てる
3. スクリプトで補完メッセージをsend

### 引数なし: 受信確認

1. messages.mdの最新メッセージを読んでユーザーに表示
2. 相手からの未対応の依頼・質問・指摘があれば相手への提案内容をユーザー表示 (例: peerのプランのレビュー依頼ならレビュー結果を表示)
3. その提案内容を送信する

## messages.md フォーマット

```markdown
## Claude
認証機能のplan作った。JWT + refresh token方式。
> ref: .claude/plans/auth-plan.md

## Codex
refresh tokenのローテーション戦略が未定義。
token revocationの方針も決めるべき。
```

- `## <AgentName>` でメッセージ区切り（Claude, Codex, Gemini など）
- `> ref: <path>` で関連ファイルを参照（任意）
- 自由記述。パース不要、人間も読める
