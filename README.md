# ARHM — граф связей (Arkham Intel)

Проект с русской и английской версией интерактивного графа (расследование Silk Road / ByBit и др.).

## Локальный запуск

```bash
npm start
```

или

```bash
node server.js
```

Сервер: **http://localhost:3007/**  
- `/` — выбор языка  
- `/ru` — русская версия графа  
- `/en` — английская версия графа  

## Хостинг на GitHub (GitHub Pages)

### 1. Создать репозиторий на GitHub

- Зайди на [github.com](https://github.com) → **New repository**
- Имя, например: `ARHM` (или любое)
- Public, без README (у тебя уже есть файлы)

### 2. Инициализировать Git и отправить код

В папке проекта выполни:

```bash
git init
git add .
git commit -m "Initial commit: ARHM graph RU/EN"
git branch -M main
git remote add origin https://github.com/ТВОЙ_ЛОГИН/ARHM.git
git push -u origin main
```

Подставь свой логин и имя репозитория вместо `ТВОЙ_ЛОГИN/ARHM`.

### 3. Собрать сайт для GitHub Pages

```bash
npm run build:pages
```

Создаётся папка **docs/** с готовым статическим сайтом.

### 4. Включить GitHub Pages

- В репозитории: **Settings** → **Pages**
- **Source**: Deploy from a branch
- **Branch**: `main`  
- **Folder**: `/docs`
- **Save**

Через 1–2 минуты сайт будет доступен по адресу:

**https://ТВОЙ_ЛОГИН.github.io/ARHM/**

- Главная (выбор языка): `.../ARHM/`
- Русская версия: `.../ARHM/ru/`
- Английская версия: `.../ARHM/en/`

После изменений в проекте снова выполни `npm run build:pages`, закоммить изменения в `docs/` и сделай `git push` — сайт обновится.

## Сборка английской версии

После правок в `arkham-graph-clean.html` обновить английскую страницу:

```bash
npm run build:en
```

Создаётся/обновляется файл `arkham-graph-clean-en.html`. Перед следующей сборкой для GitHub Pages снова запусти `npm run build:pages`.
