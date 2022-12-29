FROM node:14

COPY package.json .
COPY package-lock.json .
RUN npm ci

COPY . .

EXPOSE 3001
CMD ["npm", "run", "start"]