FROM node:20 AS base
RUN mkdir /app
WORKDIR /app

FROM base AS dependencies
COPY package.json yarn.lock ./
RUN yarn

FROM base AS build
COPY --from=dependencies /app/node_modules /app/node_modules
COPY package.json \
    yarn.lock \
    tsconfig.json \
    tailwind.config.js \
    postcss.config.js \
    next.config.js \
    ./
COPY public ./public
COPY src ./src
RUN yarn build

FROM nginx:alpine AS runner
COPY --from=build /app/out /var/www/html
COPY .docker/nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
