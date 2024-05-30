FROM node:20

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY ../prisma ./prisma
COPY . .
COPY .env .

RUN npx prisma generate

RUN npm run build

CMD ["npm", "start"]