# Generic Dockerfile reused by every app in the monorepo.
# Build with:  docker build -f docker/Dockerfile --build-arg APP=users-service -t users-service .
ARG NODE_VERSION=20-alpine

FROM node:${NODE_VERSION} AS builder
ARG APP
WORKDIR /workspace

COPY package*.json ./
COPY tsconfig*.json nest-cli.json ./
RUN npm install

COPY libs ./libs
COPY apps/${APP} ./apps/${APP}

RUN npx nest build ${APP}

FROM node:${NODE_VERSION} AS runner
ARG APP
ENV NODE_ENV=production
ENV APP=${APP}
WORKDIR /app

COPY package*.json ./
RUN npm install --omit=dev

COPY --from=builder /workspace/dist ./dist

# APP is baked at build time; entrypoint resolves to the right main.js
CMD ["sh", "-c", "node dist/apps/${APP}/main.js"]
