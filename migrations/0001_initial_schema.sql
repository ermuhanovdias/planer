-- Миграция: Начальная схема базы данных
-- Создание таблицы для хранения версии приложения

DROP TABLE IF EXISTS app_version;

CREATE TABLE app_version (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    version TEXT NOT NULL,
    release_date TEXT NOT NULL,
    description TEXT,
    is_current INTEGER DEFAULT 0,
    created_at TEXT DEFAULT (datetime('now')),
    updated_at TEXT DEFAULT (datetime('now'))
);

-- Создание индекса для быстрого поиска текущей версии
CREATE INDEX idx_app_version_is_current ON app_version(is_current);

-- Вставка тестовой записи с версией приложения
INSERT INTO app_version (version, release_date, description, is_current) 
VALUES ('1.0.0', date('now'), 'Начальная версия приложения Planer', 1);

