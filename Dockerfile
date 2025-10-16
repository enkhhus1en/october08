# Use a lightweight Node.js image
FROM node:18-alpine AS builder

WORKDIR /app

# Copy dependency files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy everything (including .env created by GitHub Actions)
COPY . .

# 👇 Ensure Prisma CLI has access to .env during build
RUN npx prisma generate
RUN npx prisma db push

# Build Next.js for production
RUN npm run build

# ---- Production stage ----
FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

# Copy built assets and node_modules from builder
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/.env .env

EXPOSE 3000
CMD ["npm", "start"]