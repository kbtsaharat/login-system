# --- Frontend Dockerfile (Next.js Production) ---
FROM node:20-alpine AS builder
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# -------------------------------
# Production stage
# -------------------------------
FROM node:20-alpine AS runner
WORKDIR /usr/src/app

ENV NODE_ENV=production
COPY --from=builder /usr/src/app/.next ./.next
COPY --from=builder /usr/src/app/public ./public
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/package*.json ./

EXPOSE 3000
CMD ["npm", "run", "start"]
