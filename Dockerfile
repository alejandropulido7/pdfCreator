# Usa la imagen oficial de Node.js como base
FROM node:20

# Establece el directorio de trabajo en la aplicación
WORKDIR /home/app

# Copia los archivos package.json y package-lock.json al directorio de trabajo
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto de la aplicación
COPY . .

# Expone el puerto en el que la aplicación va a ejecutarse
EXPOSE 5000

# Comando para ejecutar la aplicación
CMD ["npm", "start"]