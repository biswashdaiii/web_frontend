FROM node:22-alpine As build
#As alias
WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

 RUN npm run build

 #download nginx

 FROM nginx::stable-alpine

 COPY --from=build /app/dist /usr/share/nginx/html

 COPY nginx.conf /etc/nginx/conf.d/default.conf


 EXPOSE 80

 CMD ["nginx","-g","daemon off"]