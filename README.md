## API Генерации Изображений

Этот проект — это backend API для генерации изображений на основе промnта для DALL-E и их сохранения с метаданными.

### Для того чтобы запустить API на вашем локальном компьютере, выполните следующие шаги:

### 1. Убедитесь, что на вашем компьютере установлены следующие программы:
- Node.js (версия 14 или выше)
- npm

### 2. Клонируйте Репозиторий:
```bash
git clone https://github.com/your-repository/image-generator-api.git
```

### 4. Установите Зависимости:
  ```bash 
    npm install
  ```

### 5. Настройка API Генерации Изображений
   Вам необходимо зарегистрироватсья на сайте OpenAI и сгенерировать свой API ключ.
   Для этого выполните следующие шаги:
      *Создайте файл .env в корневой директории проекта.
      *Добавьте ваш API ключ в этот файл следующим образом:```API_KEY=your-api-key```
      
### 6. Настрйока PORT:
   В файле .env напишите на каком порту запуститься ваше приложение 
   ```bash 
     PORT = 5000
  ```

### 7. Запустите Сервер:
   ```bash 
     npm start
  ```

### 8. Тестирование Конечных Точек:
   Для генерации изображения отправьте POST-запрос на /generate с следующими параметрами:
     *prompt : Подсказка для изображения.
     *userId : ID пользователя, запрашивающего изображение.
   Пример с использованием в cmd с curl: 
   ```bash 
     curl -X POST http://localhost:5000/generate -H "Content-Type: application/json" -d "{\"prompt\": \"A beautiful sunset\", \"userId\": \"1234\"}"
  ```

### 9. Получение Изображений Пользователя 
  Для получения ранее сгенерированных изображений для конкретного пользователя отправьте GET-запрос на /images с параметром userId.
  Пример с использованием в cmd с curl:
  ```bash 
    curl -X GET "http://localhost:5000/images?userId=1234"
  ```
  
