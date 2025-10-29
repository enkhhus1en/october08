FROM node:20-alpine AS builder

WORKDIR /app

# Add build tools for native modules
RUN apk add --no-cache python3 make g++

COPY package*.json ./

# Install dependencies safely (ignore peer dep issues)
RUN npm ci --legacy-peer-deps

COPY . .

RUN npx prisma generate
RUN npm run build

FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/prisma ./prisma

EXPOSE 3000

CMD ["npm", "start"]