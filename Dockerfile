# Base image for both development and production stages
FROM node:lts-alpine as base

WORKDIR /app

# Install build dependencies
RUN apk --no-cache add --virtual .build-deps make g++

# Install pnpm globally
RUN npm install -g pnpm

# Copy only package files first to leverage Docker caching
COPY --chown=node:node package*.json pnpm-lock.yaml ./

# Install dependencies with pnpm using `pnpm ci`
RUN pnpm install --force --frozen-lockfile

# Development stage
FROM base as development

# Copy the rest of the application code
COPY --chown=node:node . .

# Cleanup unnecessary files after the build
RUN rm -rf /app/node_modules/.cache

# Builder stage
FROM development as builder

# Copy only necessary files for the build
COPY --chown=node:node src ./src

# Run the build command (replace with your build command)
RUN pnpm run build

# Production stage
FROM base as production

# Copy necessary files from the builder stage
COPY --chown=node:node --from=builder /app/node_modules ./node_modules
COPY --chown=node:node --from=builder /app/dist ./dist

# Install only production dependencies
RUN pnpm install --prod \
    && pnpm prune --prod \
    && rm -rf /app/.pnpm-store /app/.pnpm

# Set user to non-root
USER node

# Labels and expose are fine as they are
LABEL org.opencontainers.image.title="This is spmarketvt" \
      org.opencontainers.image.description="Spmarketvt" \
      org.opencontainers.image.version="1.0" \
      org.opencontainers.image.authors="eryk" \
      org.opencontainers.image.licenses="MIT"

EXPOSE 4000
