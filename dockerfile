# Use the official Node.js image as the base
FROM node:latest

RUN apt-get update
RUN apt-get install nginx -y

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app files
COPY . .

RUN rm /etc/nginx/nginx.conf

# Copy the Nginx configuration file
COPY nginx.conf /etc/nginx/nginx.conf

RUN ls /app/build

WORKDIR /app/build
# Copy the app build files to the Nginx HTML directory
COPY .  /usr/share/nginx/html/

# Expose port 80 for Nginx
EXPOSE 80

# Start Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]

