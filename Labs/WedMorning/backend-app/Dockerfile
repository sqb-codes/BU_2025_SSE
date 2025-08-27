# Base image for the Dockerfile
FROM node:20.19.4

# Set the working directory in the container
# This is where the application code will be copied
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
# RUN npm install

ARG NODE_ENV
RUN if [ "$NODE_ENV" = "production" ]; \
    then npm install --only=production; \
    else npm install; \
    fi

# Copy the rest of the application code to the working directory
COPY . .

# Expose the port the app runs on
# EXPOSE 3000
ENV PORT=3000
EXPOSE ${PORT}


# Command to run the application
CMD ["npm", "run", "dev"]