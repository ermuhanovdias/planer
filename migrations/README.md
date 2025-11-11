# D1 Database Migrations

Этот каталог содержит SQL миграции для базы данных D1.

## Применение миграций

### Локальная разработка

Для применения миграций локально:

```bash
npx wrangler d1 migrations apply planer-db --local
```

### Production

Для применения миграций в production:

```bash
npx wrangler d1 migrations apply planer-db --remote
```

## Создание новой миграции

Создайте новый SQL файл с именем формата `NNNN_description.sql`, где:
- `NNNN` - порядковый номер (например, 0002, 0003)
- `description` - краткое описание миграции

Пример:
```bash
migrations/0002_add_users_table.sql
```

## Текущие миграции

- `0001_initial_schema.sql` - Начальная схема с таблицей версий приложения

## Проверка статуса миграций

```bash
# Локально
npx wrangler d1 migrations list planer-db --local

# Production
npx wrangler d1 migrations list planer-db --remote
```

## Доступные API endpoints

После применения миграций доступны следующие endpoints:

- `GET /api/version` - Получить текущую версию приложения
- `GET /api/versions` - Получить все версии приложения

