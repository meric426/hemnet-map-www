ARG serviceName=realtime-map-www
FROM node:alpine
ARG GIT_COMMIT_SHA
ENV COMMIT=$GIT_COMMIT_SHA
WORKDIR ./
COPY . .
RUN yarn
RUN yarn build
CMD ["npm", "run", "serve"]
