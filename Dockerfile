FROM nexus-registry.cn133.azure.net/baselibrary/nginx:1.13-alpine

COPY nginx.conf /etc/nginx/nginx.conf
COPY nginx.default.conf /etc/nginx/conf.d/default.conf
COPY build/ /usr/share/nginx/build

RUN \
	mkdir /var/run/nginx && \
	chown -R nginx:nginx /var/run/nginx && \
	chown -R nginx:nginx /var/log/nginx

EXPOSE 8080

USER nginx

CMD ["nginx", "-g", "daemon off;"]