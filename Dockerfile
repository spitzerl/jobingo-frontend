FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY --from=build /app/public/config.json.template /usr/share/nginx/html/
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80

CMD ["sh", "-c", "envsubst '$$VITE_API_URL' < /usr/share/nginx/html/config.json.template > /usr/share/nginx/html/config.json && nginx -g 'daemon off;'"]
