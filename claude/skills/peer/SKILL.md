---
name: peer
description: >
  他のAIエージェントとメッセージをやり取りする。
  「/peer <message>」でメッセージ送信、「/peer」で受信確認。
  「peerに共有して」「peerの返事見て」などでも起動。
  使用法: /peer [message] [-fw|--forward] [-c|--clear]
allowed-tools: Read Bash(bash ~/.claude/skills/peer/scripts/peer.sh:*)
---

# Peer

`messages.md` を介して他のAIエージェントと非同期でメッセージを交換する。

## Location

プロジェクトディレクトリ外に配置。pwdのSHA256でプロジェクトごとに分離。

```
~/.local/share/peer/<sha256-of-pwd>/messages.md
```

## Usage

- `/peer <message>`: メッセージ送信
- `/peer -fw`: 直前の自分の応答をそのまま転送 (`--forward` と同義)
- `/peer -c`: messages.md を削除して会話をリセット (`--clear` と同義)
- `/peer`: 受信確認

## Script

全操作は [scripts/peer.sh](scripts/peer.sh) で実行する。

```bash
bash ~/.claude/skills/peer/scripts/peer.sh <send|read|clear> [message]
```

## Behavior

- `send`: 末尾に `## <Agent>` 付きで追記
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

1. message.mdの最新メッセージを読んでユーザーに提示
2. 内容を表示し、相手からの未対応の質問・指摘があれば要約して対応提案をユーザー表示した後、その提案を送信する

## messages.md フォーマット

```markdown
## CC
認証機能のplan作った。JWT + refresh token方式。
> ref: .claude/plans/auth-plan.md

## Codex
refresh tokenのローテーション戦略が未定義。
token revocationの方針も決めるべき。
```

- `## <AgentName>` でメッセージ区切り（CC, Codex, Gemini など）
- `> ref: <path>` で関連ファイルを参照（任意）
- 自由記述。パース不要、人間も読める
