# Ambiente de Desenvolvimento

**1. Instalar as dependencias globais:**

    npm install -g ionic cordova
    
**2. Baixar dependências locais do ambiente:**

    npm install

**3. Restaurar o estado do aplicativo:**

    ionic cordova prepare <plataforma>
    ionic cordova resources <plataforma>
    npm install (é necessario executar o install novamente apos o prepare, pois ele remove as dependencias)
    ionic cordova run <plataforma>

**5. Build**  

Versão de desenvolvimento Android

    ionic cordova run android
    
Versão de desenvolvimento iOS

    ionic cordova run ios

**6. Testar em desenvolvimento**

    npm start