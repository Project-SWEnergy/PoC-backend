# Use an official Node.js runtime as the base image
FROM node:latest

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install Nest.js dependencies
RUN npm install

# Copy all the local files to the container
COPY . .

# Expose the port your app runs on (ensure it matches the port in your Nest.js app)
EXPOSE 3000

# Define the command to start your Nest.js app
CMD ["npm", "run", "start:dev"]
