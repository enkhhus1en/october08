FROM node:20-alpine AS builder

WORKDIR /app

# Add build tools for native modules (for Prisma, bcrypt, sharp, etc.)
RUN apk add --no-cache python3 make g++

# Copy only dependency files first for caching
COPY package.json yarn.lock ./

# Install dependencies using Yarn
RUN yarn install --frozen-lockfile

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

# Copy only needed files for runtime
COPY --from=builder /app/package.json ./
COPY --from=builder /app/yarn.lock ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/prisma ./prisma

EXPOSE 3000

CMD ["yarn", "start"]