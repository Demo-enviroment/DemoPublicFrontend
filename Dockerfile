# Use the official Node.js image as the base
FROM node:latest

RUN apt-get update


# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app files
COPY . .


# Expose port 80 for Nginx
EXPOSE 80

# Start Nginx in the foreground
CMD ["npm","start"]

