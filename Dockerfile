# Use an official Node.js image for building the app
FROM node:18 AS build

# Set working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json first to install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the entire project into the container
COPY . .

# Build the React app for production
RUN npm run build

# Use Nginx to serve the built files
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80 to make the container accessible
EXPOSE 80

# Start the Nginx server
CMD ["nginx", "-g", "daemon off;"]
