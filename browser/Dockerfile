FROM node:8.11-slim as builder

RUN mkdir -p /opt/src
COPY . /opt/src

WORKDIR /opt/src
RUN npm install --registry=https://registry.npm.taobao.org && \
    npm cache clean --force && \
    npm run build

FROM nginx:1.15-alpine

COPY --from=builder /opt/src/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
COPY runner.sh /tmp/runner.sh

CMD /tmp/runner.sh
