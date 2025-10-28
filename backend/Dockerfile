# --- Backend Dockerfile (NestJS Production) ---
FROM node:20-alpine AS builder
WORKDIR /usr/src/app

# ติดตั้ง dependencies
COPY package*.json ./
RUN npm install

# คัดลอกโค้ดทั้งหมดและ build
COPY . .
RUN npm run build

# -------------------------------
# Production stage
# -------------------------------
FROM node:20-alpine AS runner
WORKDIR /usr/src/app

# Copy only built files + node_modules
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY package*.json ./

ENV NODE_ENV=production
EXPOSE 3000

# run server แบบ production
CMD ["node", "dist/main.js"]
