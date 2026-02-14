# Use stable lightweight Node image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy only package files first (for caching)
COPY package*.json ./

# Improve npm reliability
RUN npm config set fetch-retries 5 \
    && npm config set fetch-retry-mintimeout 20000 \
    && npm config set fetch-retry-maxtimeout 120000 \
    && npm install

# Copy remaining source code
COPY . .

# Expose application port
EXPOSE 3000

# Start the app
CMD ["npm", "start"]