# ALMONDO-WebInterface/almondo-web-app/Dockerfile

# Use Node image
FROM node:20-alpine

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy all source code
COPY . .

# Build the React app
RUN npm run build

# Verify that the dist folder exists
RUN ls -la dist

EXPOSE 3000

# Install 'serve' globally to serve static files
RUN npm install -g serve

# Serve the dist folder with SPA fallback
CMD ["serve", "-s", "dist", "-l", "3000", "--single"]
