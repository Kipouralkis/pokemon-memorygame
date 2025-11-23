# Build stage: compile the React app
FROM node:slim AS build
WORKDIR /memory-game

# install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the source code and build
COPY . .
RUN npm run build

# Production stage: serve static files via Ngnix
FROM nginx:alpine
# Copy compiled build to Nginx's web root
COPY --from=build /memory-game/dist /usr/share/nginx/html

# Expose HTTP port
EXPOSE 80

# start Nginx
CMD ["nginx", "-g", "daemon off;"]