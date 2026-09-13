FROM node:20-alpine AS builder
WORKDIR /app
# COPY dependency files first

COPY package* .json ./
RUN npm ci ---only = production


# ?copy the rest of the code

COPY ...
RUN npm run build
RUN npm run genrate

FROM node -20:alpine AS production

# create a non-root user for security purpose

RUN addgroup -S nameofgroup && adduser -S nameofuser -G nameofgroup

WORKDIR /app

# copy only production files from the first build stage 

COPY --from=builder /app/dist .dist
COPY --from=builder /app/package.json ./

# set the port you want the app should run on the production computer

EXPOSE 3000
USER nameofuser

# set the health condition to know that health status of the API
HEALTHCHECK --interval=30s --timeout=10s --retries=5 \
CMD wget --no-verbose --tries=1 --spider \
http://localhost:3000/health || exit 1 

# now start the application once the docker is up and ready 
CMD["node", "dist/server.js"]