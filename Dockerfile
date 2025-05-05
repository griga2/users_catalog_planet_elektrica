# Этап сборки приложения
FROM node:lts-alpine AS build-stage

WORKDIR /app

# Копируем зависимости и устанавливаем их
COPY package*.json ./
RUN npm install

# Копируем исходный код и собираем проект
COPY . .
RUN npm run build

# Этап production
FROM nginx:stable-alpine AS production-stage

# Копируем собранные файлы из этапа сборки в Nginx
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Копируем конфиг Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Открываем порт 80
EXPOSE 80

# Запускаем Nginx
CMD ["nginx", "-g", "daemon off;"]