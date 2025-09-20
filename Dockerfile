FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Expose ports for Vite dev server and API server
EXPOSE 5173 3000

# Start the development server
CMD ["npm", "run", "dev"]