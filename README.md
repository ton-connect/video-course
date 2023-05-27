# Видео курс по Ton Connect

[Плейлист на Youtube](https://www.youtube.com/playlist?list=PLyDBPwv9EPsCJ226xS5_dKmXXxWx1CKz_)

## 1. Обзор Ton Connect
Обзор TonConnect и его реализаций. Рассматриваем область применения TonConnect, его преимущества и недостатки. Смотрим на TonConnect в реальных приложениях. Изучаем технические детали принципа работы протокола

[Youtube](https://www.youtube.com/watch?v=JMQUsWAGrgw)

[Презентация](1_overview/ton-connect-overview.pdf)

### Полезные ссылки
- [Документация и туториалы](https://docs.ton.org/develop/dapps/ton-connect/)
- [Спецификация протокола](https://github.com/ton-blockchain/ton-connect)
- [Список поддерживаемых кошельков](https://github.com/ton-blockchain/wallets-list)
- [Реализации на JS](https://github.com/ton-connect/sdk)
- [Реализация на Python](https://github.com/ClickoTON-Foundation/tonconnect/)
- [Реализация HTTP bridge на GO](https://github.com/ton-connect/bridge)
- Примеры интеграции
    * [Для React UI kit](https://github.com/ton-connect/demo-dapp-with-react-ui)
    * [Для JS SDK](https://github.com/ton-connect/demo-dapp)
    * [Проверка авторизации через Ton Connect на бэкэнде](https://github.com/ton-connect/demo-dapp-backend)
    * [Телеграм бот](https://github.com/ton-connect/demo-telegram-bot)

## 2. Ton Connect SDK на фронтенде, подключение кошелька и отправка транзакции
Использование TonConnect JavaScript SDK для создания фронтенда простого даппа. Подключение мобильных и браузерных кошельков, отправка транзакции.  

[Youtube](https://www.youtube.com/watch?v=lQcnh426QaY)

[Исходный код](2_js-sdk-frontend/src)

### Полезные ссылки
- [Ton Connect JS SDK](https://github.com/ton-connect/sdk/tree/main/packages/sdk)
- [Ton Connect JS full API docs](https://ton-connect.github.io/sdk/modules/_tonconnect_sdk.html)


## 3. Ton Connect SDK на фронтенде: единый QR-код и авторизация через ton_proof
Разбираемся в устройстве авторизации на бэкэнде через TonConnect с помощью ton_proof.
Добавляем к фронтенд-части с предыдущего урока единый QR-код и авторизацию на бэкэнде через ton_proof.

[Youtube](https://www.youtube.com/watch?v=lQcnh426QaY)

[Исходный код](3_single-qr&ton-proof/src)
[Презентация](3_single-qr&ton-proof/ton-connect-single-qr&ton-proof.pdf)

### Полезные ссылки
- [Репозиторий wallets list](https://github.com/ton-blockchain/wallets-list)
- [Спецификация ton_proof](https://github.com/ton-blockchain/ton-connect/blob/main/requests-responses.md#address-proof-signature-ton_proof)
- [Документация по использованию ton_proof в TonConnect SDK](https://github.com/ton-connect/sdk/tree/main/packages/sdk#backend-authorization)
- [Пример проверки ton_proof на Go](https://github.com/ton-connect/demo-dapp-backend)
- [Пример проверки ton_proof на JS](https://gist.github.com/TrueCarry/cac00bfae051f7028085aa018c2a05c6)


## 4. Ton Connect UI
Создаем дапп с использованием библиотеки TonConnect UI. Изучаем возможности кастомизации TonConnect UI.

[Youtube](https://www.youtube.com/watch?v=lQcnh426QaY)

[Презентация](4_ton-connect-ui/ton-connect-ui.pdf)
[Исходный код](4_ton-connect-ui/ton-connect-ui-with-bundler)

### Полезные ссылки
- [Репозиторий TonConnect UI](https://github.com/ton-connect/sdk/tree/main/packages/ui)
- [Пример использования](https://github.com/ton-connect/demo-dapp-with-react-ui)
