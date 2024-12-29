FROM node:lts-alpine

RUN apk update && \
    apk add git && \
    apk add openssh

WORKDIR /app

ENV HOST 0.0.0.0
# CMD ["/bin/ash"]