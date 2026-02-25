# Utilise une image légère de Node.js
FROM node:18-alpine

# Crée un dossier de travail dans le conteneur
WORKDIR /app

# Copie les fichiers de dépendances et installe-les
COPY package*.json ./
RUN npm install

# Copie tout le reste du code de l'API
COPY . .

# Expose le port sur lequel ton API écoute (généralement 3000 ou 8080, à vérifier dans ton code !)
EXPOSE 3000

# Commande pour démarrer l'API
CMD ["npm", "start"] 
# (ou CMD ["node", "index.js"] selon ton projet)