FROM node:22-alpine AS builder
WORKDIR /app
COPY server/package*.json server/tsconfig.json ./
RUN npm ci
COPY server/src/ src/
RUN npx tsc

FROM node:22-alpine
WORKDIR /app
COPY server/package*.json ./
RUN npm ci --omit=dev
COPY --from=builder /app/dist/ dist/
EXPOSE 3001
CMD ["node", "dist/index.js"]
