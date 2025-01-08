####################
# stage1: build
####################
FROM node:20.11.0-alpine AS build
WORKDIR '/app'
COPY . .
RUN yarn --frozen-lockfile
RUN yarn build

####################
# stage2: production 
####################
FROM nginx:1.27.0-alpine AS prod
COPY --from=build /app/build /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]