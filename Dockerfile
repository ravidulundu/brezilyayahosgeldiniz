FROM node:24.20.0-trixie-slim@sha256:50c3b2f6988dfc307b86e5301d69611af31f4789bdf232863b07d3b02fe55ae0 AS builder
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

FROM nginxinc/nginx-unprivileged:1.30.4-alpine3.24-slim@sha256:bcf91d2c73ab64fa1c4ac7fbac5ac523057c8af7d553ab9251c7aef38c260979
USER root
RUN apk add --upgrade --no-cache libcrypto3=3.5.8-r0 libssl3=3.5.8-r0
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
USER 101
EXPOSE 8080
