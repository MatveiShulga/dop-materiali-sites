#!/usr/bin/env bash
# ============================================================================
# Заливает всё тяжёлое медиа (видео, фото, архивы) в GitHub Releases.
# Именно так лендинг остаётся лёгким: сам сайт — только текст, а файлы отдаёт
# GitHub. Ссылки в data.js уже указывают на этот релиз.
#
# ЗАПУСК:
#   1) gh auth login          # один раз, если ещё не залогинен
#   2) bash upload-to-github.sh
#
# Хочешь другой репозиторий/тег — поменяй REPO и TAG здесь И в data.js (вверху).
# ============================================================================
set -euo pipefail

REPO="MatveiShulga/dop-materiali-sites"   # <-- должно совпадать с data.js
TAG="v1"                                   # <-- должно совпадать с data.js
DIR="$(cd "$(dirname "$0")" && pwd)/release-assets"

echo "→ Репозиторий: $REPO   тег релиза: $TAG"
echo "→ Папка с файлами: $DIR"

# 0. gh установлен и залогинен?
command -v gh >/dev/null || { echo "✗ Нет gh CLI. Установи: https://cli.github.com"; exit 1; }
gh auth status >/dev/null 2>&1 || { echo "✗ Не залогинен. Запусти: gh auth login"; exit 1; }

# 1. Репозиторий существует? Если нет — создаём публичный.
if ! gh repo view "$REPO" >/dev/null 2>&1; then
  echo "→ Репозитория нет — создаю публичный $REPO"
  gh repo create "$REPO" --public --description "Media assets for landing (hosted via Releases)" --confirm
fi

# 2. Релиз с этим тегом есть? Если нет — создаём.
if ! gh release view "$TAG" --repo "$REPO" >/dev/null 2>&1; then
  echo "→ Релиза $TAG нет — создаю"
  gh release create "$TAG" --repo "$REPO" --title "Landing assets $TAG" --notes "Видео, фото, промпты и архивы для лендинга."
fi

# 3. Заливаем все файлы (--clobber перезапишет, если уже загружены).
echo "→ Загружаю файлы..."
shopt -s nullglob
FILES=("$DIR"/*)
gh release upload "$TAG" "${FILES[@]}" --repo "$REPO" --clobber

echo ""
echo "✓ Готово. Файлы доступны по адресу:"
echo "  https://github.com/$REPO/releases/download/$TAG/<имя-файла>"
echo ""
echo "Проверь одну ссылку в браузере, например:"
echo "  https://github.com/$REPO/releases/download/$TAG/site1-photo-main.jpg"
