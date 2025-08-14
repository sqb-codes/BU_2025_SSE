FROM node:20.19.4

# Working directory
# This is where the application code will be copied and run
WORKDIR /app

# Copy package.json and package-lock.json
# These files are used to install the application dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the application port
# This is the port on which the application will run
# EXPOSE 3000
ENV PORT=3000
EXPOSE ${PORT}


# Start the application
# CMD ["node", "server.js"]
CMD ["npm", "run", "dev"]