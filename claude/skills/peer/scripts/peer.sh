#!/bin/bash
set -e

PEER_BASE="$HOME/.local/share/peer"
DIR=$(pwd -P)
SHADIR=$(echo "$DIR" | shasum -a 256 | sed "s/  -//")
PEER_DIR="$PEER_BASE/$SHADIR"
MESSAGES="$PEER_DIR/messages.md"

ACTION="${1:?Usage: peer.sh <send|read|clear> [message]}"
shift

case "$ACTION" in
  send)
    MESSAGE="$*"
    if [ -z "$MESSAGE" ]; then
      echo "エラー: メッセージを指定してください" >&2
      exit 1
    fi
    mkdir -p "$PEER_DIR"
    PREV=""
    if [ -f "$MESSAGES" ]; then
      LAST_HEADER=$(grep -n "^## " "$MESSAGES" | tail -1 | cut -d: -f1)
      if [ -n "$LAST_HEADER" ]; then
        PREV=$(tail -n +"$LAST_HEADER" "$MESSAGES")
      fi
    fi
    {
      if [ -n "$PREV" ]; then
        printf "%s\n" "$PREV"
      fi
      printf "\n## %s\n%s\n" "${PEER_NAME:-CC}" "$MESSAGE"
    } > "$MESSAGES"
    echo "送信完了: $MESSAGES"
    ;;
  read)
    if [ ! -f "$MESSAGES" ]; then
      echo "まだメッセージはありません"
      exit 0
    fi
    cat "$MESSAGES"
    ;;
  clear)
    if [ -f "$MESSAGES" ]; then
      rm "$MESSAGES"
      echo "会話をリセットしました"
    else
      echo "リセットするメッセージがありません"
    fi
    ;;
  *)
    echo "エラー: 不明なアクション: $ACTION" >&2
    echo "Usage: peer.sh <send|read|clear>" >&2
    exit 1
    ;;
esac
