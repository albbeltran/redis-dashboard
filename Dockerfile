FROM node:22.0.0-alpine as builder

ADD . /app
WORKDIR /app

RUN npm install --legacy-peer-deps

RUN npm run build
#comment

RUN wget https://gobinaries.com/tj/node-prune --output-document - | /bin/sh && node-prune

FROM gcr.io/distroless/nodejs22-debian12

COPY --from=builder /app/.next/standalone /app/standalone
COPY --from=builder /app/.next/static /app/standalone/.next/static
COPY --from=builder /app/public /app/standalone/public

WORKDIR /app/standalone

EXPOSE 3000

CMD ["server.js"]