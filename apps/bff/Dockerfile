FROM node:18.6.0-slim AS builder
WORKDIR /app
# Install pnpm
ENV PNPM_HOME="/root/.local/share/pnpm"
ENV PATH="${PATH}:${PNPM_HOME}"
SHELL ["/bin/bash", "-c"]
RUN npm install --global pnpm \
    && SHELL=bash pnpm setup \
    && source /root/.bashrc
RUN pnpm install -g turbo

COPY . .
RUN turbo prune --scope=bff --docker

###########################################################
# Add lockfile and package.json's of isolated subworkspace
###########################################################
FROM node:18.6.0-slim AS installer
WORKDIR /app
# Install pnpm
ENV PNPM_HOME="/root/.local/share/pnpm"
ENV PATH="${PATH}:${PNPM_HOME}"
SHELL ["/bin/bash", "-c"]
RUN npm install --global pnpm \
    && SHELL=bash pnpm setup \
    && source /root/.bashrc

# First install the dependencies (as they change less often)
COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
RUN pnpm install

# Build the project
COPY --from=builder /app/out/full/ .
COPY turbo.json turbo.json
RUN pnpm turbo run build --filter=bff...

###########################################################
# Run the bff app
###########################################################
FROM node:18.6.0-slim AS runner
ENV NODE_ENV production

WORKDIR /app

# Don't run production as root
RUN addgroup --system --gid 1001 bff
RUN adduser --system --uid 1001 bff
RUN mkdir generated
RUN chown bff:bff generated
USER bff
COPY --from=installer /app .

CMD node apps/bff/dist/main.js
