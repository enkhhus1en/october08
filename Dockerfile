FROM node:20-alpine AS deps

WORKDIR /app

# Copy only dependency files first for caching
COPY package.json yarn.lock ./

# Install dependencies with cache mount
RUN --mount=type=cache,target=/root/.yarn \
    yarn install --frozen-lockfile


# ---------- BUILDER STAGE ----------
FROM node:20-alpine AS builder

WORKDIR /app

# Add build tools for native modules (for Prisma, bcrypt, sharp, etc.)
RUN apk add --no-cache python3 make g++

# Copy node_modules from deps stage
COPY --from=deps /app/node_modules ./node_modules

# Copy dependency files
COPY package.json yarn.lock ./

# Copy the rest of the app
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Build your app
RUN yarn build


# ---------- RUNNER STAGE ----------
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

# Add runtime dependencies for Prisma
RUN apk add --no-cache openssl

# Copy only dependency files
COPY --from=builder /app/package.json ./
COPY --from=builder /app/yarn.lock ./

# Install only production dependencies
RUN --mount=type=cache,target=/root/.yarn \
    yarn install --frozen-lockfile --production

# Copy built app and necessary files
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/prisma ./prisma

# Generate Prisma client for production
RUN npx prisma generate

EXPOSE 3000

CMD ["yarn", "start"]