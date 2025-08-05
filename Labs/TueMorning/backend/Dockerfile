# FROM Base image
FROM node:20.19.0

# Set the working directory
# This is where the application code will be placed
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
# This allows us to install dependencies before copying the rest of the code
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Port configuration
# This is the port on which the application will run
# It should match the port used in the application code
EXPOSE 3000

# Start the application
# This command will run the application when the container starts
CMD ["node", "server.js"]