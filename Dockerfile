FROM node:10-alpine

WORKDIR /app
# Copy application dist.
COPY ./dist ./dist


COPY package*.json ./
#COPY test.sqlite ./

RUN apk --no-cache --virtual build-dependencies add \
    python \
    make \
    g++ \
    && npm install \
    && apk del build-dependencies


EXPOSE 8081

# 工作目录 执行的命令
CMD ["node", "src/server.js"]
