# Install dependencies only when needed
FROM docker.io/node:lts-alpine as dependencies
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /usr/src/app
COPY dist/apps/api-gateway/package*.json ./
RUN npm install --omit=dev

# Production image, copy all the files and run nest
FROM gcr.io/distroless/nodejs:18 AS app
ENV NODE_ENV production
ENV PORT 3333
WORKDIR /usr/src/app
COPY --from=dependencies /usr/src/app/node_modules ./node_modules
COPY --from=dependencies /usr/src/app/package.json ./package.json
COPY dist/apps/api-gateway .
EXPOSE 3333
CMD ["main.js"]
