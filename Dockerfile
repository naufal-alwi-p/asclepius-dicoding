FROM node:22.11

WORKDIR /code

COPY . .

RUN apt-get update && apt-get install build-essential -y

RUN npm install

RUN npm rebuild @tensorflow/tfjs-node --build-from-source

CMD ["npm", "run", "start"]
