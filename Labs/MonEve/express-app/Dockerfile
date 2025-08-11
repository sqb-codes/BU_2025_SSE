FROM node:20.0.0

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Expose the port the app runs on
ENV PORT=3000
EXPOSE ${PORT}

# Command to run the application
# CMD ["node", "server.js"]
CMD ["npm", "run", "dev"]

