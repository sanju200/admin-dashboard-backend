FROM node:14-alphine

WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package.json
COPY .husky .husky

COPY . .

RUN npm install

EXPOSE 8080

# Start the application
CMD [ "node", "main" ]