####################
# stage1: build
####################
FROM node:20.11.1 AS build
WORKDIR '/app'
COPY . .
RUN yarn --frozen-lockfile
COPY docker/.env.template .env
RUN yarn build

####################
# stage2: production 
####################
FROM nginx:1.27.0-alpine AS prod

COPY docker/entrypoint.sh /
RUN chmod +x /entrypoint.sh
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build /app/dist /usr/share/nginx/html

CMD ["./entrypoint.sh"]