FROM alpine

WORKDIR /root

RUN apk add curl bash gnupg caddy --no-cache

ADD dist/ /root/ui

COPY entrypoint.sh /root
COPY Caddyfile /root/Caddyfile

RUN chmod +x /root/entrypoint.sh

EXPOSE 80 443

ENTRYPOINT ["/root/entrypoint.sh"]
