## Установка
1. Открыть в консоли каталог проекта.
1. Выполнить команду `npm install`, которая установит все зависимости, указанные в `package.json`.

## Запуск
1. `npm start` - запуск сборки в режиме разработки на локальном сервере по адресу http://localhost:3000.
2. `npm run build` - сборка production-версии с минифицированными файлами.

## Структура проекта
* `app` - исходники
    * `common` - общие шрифты, графика, стили, скрипты
        * `fonts` - шрифты
        * `svg` - svg-иконки
        * `images` - изображения
        * `scripts` - скрипты
        * `styles` - стили
    * `components` - компоненты
    * `pages` - страницы
* `dist` - собранная верстка
