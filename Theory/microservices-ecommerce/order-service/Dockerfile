FROM node:20.19.4

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on
EXPOSE 1236

# Start the application
CMD ["npm", "run", "dev"]