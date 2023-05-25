# Use a Node.js base image
FROM node:14-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the project files
COPY .. .

# Build the React app
RUN npm run build

# Expose port 3000
EXPOSE 3000

# Run the React app
CMD ["npm", "start"]