# Use the latest LTS version of Node on Alpine Linux
FROM node:22-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package files first to leverage Docker's cache layer
COPY package*.json ./

# Install dependencies
# Using 'npm ci' is better for production/containers as it's faster and more reliable
RUN npm install

# Copy the rest of your application code
COPY . .

# Your Express app will likely run on 3000
EXPOSE 5001

# Start the application
CMD ["npm", "start"]