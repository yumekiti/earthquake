FROM node:18.16.1-alpine AS builder

WORKDIR /usr/local/app

COPY . .

RUN yarn --frozen-lockfile && \
    yarn build

FROM nginx:1.25.3-alpine

COPY --from=builder /usr/local/app/dist /usr/share/nginx/html

CMD [ "nginx", "-g", "daemon off;" ]
