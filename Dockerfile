FROM node:22.23.2-alpine3.24 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY index.html vite.config.js ./
COPY public ./public
COPY scripts ./scripts
COPY src ./src
ARG VITE_SITE_URL=https://bh.dulunduztec.com.br
ENV VITE_SITE_URL=${VITE_SITE_URL}
RUN case "$VITE_SITE_URL" in https://*) npm run build ;; *) echo "VITE_SITE_URL must be an https URL" >&2; exit 1 ;; esac

FROM nginx:1.30.4-alpine3.24
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
