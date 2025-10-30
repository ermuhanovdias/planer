# Planer

Приложение на базе React + TypeScript + Vite с поддержкой Cloudflare Workers и Capacitor для Android.

## 🚀 Технологии

- **Frontend**: React 19, TypeScript, Vite
- **Backend**: Cloudflare Workers
- **Mobile**: Capacitor (Android)
- **Сборка**: Vite 7
- **Линтинг**: ESLint 9

## 📋 Предварительные требования

- Node.js (рекомендуется последняя LTS версия)
- npm или yarn
- Для Android разработки: Android Studio и Java Development Kit (JDK)

## 🛠️ Установка

```bash
# Установка зависимостей
npm install
```

## 💻 Разработка

### Веб-разработка

```bash
# Запуск dev сервера
npm run dev

# Сборка проекта
npm run build

# Предварительный просмотр production сборки
npm run preview

# Проверка кода
npm run lint
```

### Cloudflare Workers

```bash
# Деплой на Cloudflare Workers
npm run deploy

# Генерация типов для Cloudflare
npm run cf-typegen
```

### Android разработка

```bash
# Синхронизация с Capacitor (после сборки)
npm run cap:sync

# Открыть проект в Android Studio
npm run cap:open:android

# Запустить на Android устройстве/эмуляторе
npm run cap:run:android

# Собрать Android приложение
npm run cap:build:android
```

## 📁 Структура проекта

```
planer/
├── src/                    # Исходный код React приложения
│   ├── App.tsx            # Главный компонент
│   ├── main.tsx           # Точка входа
│   └── assets/            # Статические ресурсы
├── worker/                # Cloudflare Worker код
│   └── index.ts           # API endpoints
├── android/               # Capacitor Android проект
├── public/                # Публичные статические файлы
├── dist/                  # Собранные файлы
├── capacitor.config.ts    # Конфигурация Capacitor
├── wrangler.jsonc         # Конфигурация Cloudflare Workers
└── vite.config.ts         # Конфигурация Vite

```

## 🌐 API

Приложение включает базовый API endpoint в `worker/index.ts`, который можно расширять для добавления серверной логики.

## 📱 Мобильное приложение

Проект настроен для сборки Android приложения через Capacitor:
- **App ID**: `com.planer.app`
- **App Name**: planer
- **Web Directory**: `dist/client`

## 🔧 Конфигурация

- **Vite**: `vite.config.ts`
- **TypeScript**: `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json`
- **ESLint**: `eslint.config.js`
- **Capacitor**: `capacitor.config.ts`
- **Cloudflare Workers**: `wrangler.jsonc`

## 📝 Разработка

1. Внесите изменения в `src/` для frontend кода
2. Отредактируйте `worker/index.ts` для API/backend логики
3. Запустите `npm run dev` для горячей перезагрузки
4. Используйте `npm run cap:sync` для синхронизации изменений с мобильным приложением

## 🚢 Деплой

### Cloudflare Workers
```bash
npm run deploy
```

### Android
Соберите APK через Android Studio после выполнения:
```bash
npm run cap:build:android
```
