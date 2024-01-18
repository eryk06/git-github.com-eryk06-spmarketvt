# syntax=docker/dockerfile:1.2
FROM node:lts-alpine as base

WORKDIR /app

# Install build dependencies
RUN --mount=type=cache,target=/apk-cache apk --no-cache add --virtual .build-deps make g++

# Install pnpm globally
RUN npm install pnpm pm2 -g

# Set PM2_PUBLIC_KEY and PM2_SECRET_KEY environment variables
ENV PM2_PUBLIC_KEY 5dkhot0kvndntys
ENV PM2_SECRET_KEY k9luueq6w355k4g

# Copy only package files first to leverage Docker caching
COPY --chown=node:node package*.json pnpm-lock.yaml ./

# Install dependencies with pnpm using `pnpm ci`
RUN --mount=type=cache,target=/app/node_modules pnpm install --force --frozen-lockfile

# Development stage
FROM base as development

# Copy the rest of the application code
COPY --chown=node:node . .

# Cleanup unnecessary files after the build
RUN rm -rf /app/node_modules/.pnpm-store

# Builder stage
FROM development as builder

# Copy only necessary files for the build
COPY --chown=node:node src ./src

# Run the build command (replace with your build command)
RUN pnpm build

# Production stage
FROM base as production

# Set user to non-root
USER node

# Copy necessary files from the builder stage
COPY --from=builder --chown=node:node /app/node_modules ./node_modules
COPY --from=builder --chown=node:node /app/dist ./dist
COPY --from=builder --chown=node:node /app/public ./public
COPY --from=builder --chown=node:node /app/ecosystem.config.js .
COPY --from=builder --chown=node:node /app/.env .

# Install only production dependencies
RUN pnpm install --prod --ignore-scripts --prefer-offline \
    && pnpm prune --prod \
    && rm -rf /app/.pnpm-store /app/.pnpm

# Install Nginx
RUN --mount=type=cache,target=/apk-cache apk --no-cache add nginx

# Configure Nginx
COPY nginx/templates/default.conf.template /etc/nginx/templates/default.conf.template
COPY nginx/configuration/custom_proxy_setting.conf /etc/nginx/conf.d/custom_proxy_setting.conf

# Labels and expose are fine as they are
LABEL org.opencontainers.image.title="This is spmarketvt" \
      org.opencontainers.image.description="Spmarketvt" \
      org.opencontainers.image.version="1.0.0" \
      org.opencontainers.image.authors="eryk" \
      org.opencontainers.image.licenses="MIT"

# Expose ports
EXPOSE 4000 80

# Start Nginx and your Node.js app with PM2
CMD ["sh", "-c", "nginx -g 'daemon off;' & pm2-runtime ecosystem.config.js --env production"]
