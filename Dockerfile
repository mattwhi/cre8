# 1. Install dependencies only when needed
FROM node:18-alpine AS deps
WORKDIR /app
# Copy package.json and lock file
COPY package.json package-lock.json* ./
# Install dependencies using npm ci for reproducible builds
RUN npm ci

# 2. Build the application
FROM node:18-alpine AS builder
WORKDIR /app
# Copy node_modules from deps stage
COPY --from=deps /app/node_modules ./node_modules
# Copy the rest of your application code
COPY . .
# Build the Next.js application
RUN npm run build

# 3. Production image, copy all the files and run next start
FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV production
# Copy essential files from the builder stage
COPY --from=builder /app/next.config.ts ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules
RUN npm install -g next
EXPOSE 3000
CMD ["npx","npm", "start"]
