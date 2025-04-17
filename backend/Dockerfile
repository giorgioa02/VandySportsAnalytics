# AUTHOR: Giorgio Antonacci

# Base image
FROM node:18

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the backend code
COPY . .

# Expose the backend port
EXPOSE 3001

# Start the server
CMD ["npm", "start"]
