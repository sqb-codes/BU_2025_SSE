# Base image
FROM node:20.19.4

# Set the working directory
# This is where the application code will be copied to and run from
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the application
# EXPOSE 3000
ENV PORT=3000
EXPOSE ${PORT}

CMD ["npm", "run", "dev"]