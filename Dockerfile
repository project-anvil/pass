FROM node:16-alpine AS build
# Add a work directory
WORKDIR /app
# Cache and Install dependencies
COPY . .
RUN npm install

# Build the app
RUN npm install --global rollup
RUN rollup -c

FROM dutchoven/express

# this is dangerous for larger apps due to the chances of collision
COPY --from=build /app/dist/index.js /app/src/resources/index.js
