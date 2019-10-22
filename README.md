# Ambiente de Desenvolvimento

**1. Instalar as dependencias globais:**

    npm install -g npm --unsafe-perm=true
    npm install -g cordova --unsafe-perm=true
    npm install -g ionic --unsafe-perm=true
    npm install -g @angular/cli --unsafe-perm=true

**2. Baixar dependências locais do ambiente:**

    npm install

**3. Restaurar o estado do aplicativo:**

    ionic cordova prepare <platform>
    ionic cordova resources <platform>
    npm install (é necessario executar o install novamente apos o prepare, pois ele remove as dependencias)

**5. Build**  

Versão de desenvolvimento Android

    ionic cordova run android
    
Versão de desenvolvimento iOS

    ionic cordova run ios

**6. Testar em desenvolvimento**

    npm start