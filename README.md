# Nest + Vue Load Test Project

## Описание
Простое веб-приложение для нагрузочного теста API на NestJS + PostgreSQL, с фронтендом на Vue 3.

## Структура
- `backend/` — NestJS + TypeORM + PostgreSQL
- `frontend/` — Vue 3 приложение для нагрузки
- `docker-compose.yml` — поднимает PostgreSQL, backend и frontend контейнеры

## Запуск проекта

1. Склонировать репозиторий:
```bash
git clone https://github.com/abdrassulov/nest-vue-loadtest.git
cd nest-vue-loadtest

2. Поднять все сервисы через Docker:
docker compose up --build

3.Backend будет доступен по адресу:
http://localhost:3001/items

4.Frontend будет доступен по адресу:
http://localhost:5173/

5.Нагрузочное тестирование

На фронтенде можно задать количество запросов и задержку между ними.
Пример результатов:
Отправлено запросов: 500
Успешно: 500
Ошибки: 0
Время выполнения: 80140 мс


Оптимизации

Индексы на PK таблицы items (уже есть).

Поддержка пагинации (limit, offset) в GET /items.

CORS включен.

Возможность дальнейшего кеширования и connection pool для TypeORM.
