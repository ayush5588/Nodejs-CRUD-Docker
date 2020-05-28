# pull the node:10.20.1 image from the docker hub to be used as base image
FROM node:10.20.1

# create the working directory
WORKDIR /usr/src/app

# copy package.json and package-lock.json in the current working directory
COPY package*.json ./

# install the dependencies defined in package.json
RUN npm install

# copy our entire source code in the current working directory
COPY . .

# expose the port for the container
EXPOSE 3000

# give the command for starting the application
CMD ["npm","start"]

