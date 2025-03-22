# 1️⃣ Etapa de compilación
FROM node:20-alpine AS builder

WORKDIR /app

# Instalar `pnpm` globalmente
RUN npm install -g pnpm

# Copiar archivos de dependencias
COPY package.json pnpm-lock.yaml ./
RUN corepack enable && pnpm install --frozen-lockfile

# Copiar el código fuente
COPY . .

# Construir la aplicación Next.js
RUN pnpm build

# 2️⃣ Etapa de ejecución
FROM node:20-alpine AS runner

WORKDIR /app

# Instalar `pnpm` también en la imagen final
RUN npm install -g pnpm

# Copiar archivos compilados
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./

# Asegurar que los archivos estén en la imagen
RUN ls -la /app

# Establecer variables de entorno
ENV PORT=3000
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["pnpm", "start"]
