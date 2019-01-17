FROM node:9-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

# Development build
# RUN npm install

# production build
RUN npm install --only=production

# Bundle app source
COPY . .

EXPOSE 3001
CMD [ "npm", "start" ]
