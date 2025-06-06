# 📢 Resgate Alerta

O **Resgate Alerta** é um aplicativo desenvolvido para facilitar a comunicação e resposta a emergências em tempo real. Ele permite que usuários relatem alertas de eventos críticos como incêndios, deslizamentos e tempestades, além de receberem notificações personalizadas com base em suas áreas de interesse.

## 🎥 Demonstração em Vídeo

https://youtu.be/EHQEc9KqihM?si=T48JHxStLW_QN76u

---

## 🚀 Funcionalidades Principais

- **Cadastro e Login:** Interface intuitiva para criação de conta e autenticação segura.
- **Listagem de Alertas:** Exibição de alertas recentes como incêndios, deslizamentos e tempestades.
- **Detalhes do Alerta:** Informações completas sobre cada alerta: tipo, localização e descrição.
- **Relatório de Alertas:** Envio de novos alertas com localização via mapa.
- **Perfil do Usuário:** Acesso a informações pessoais, alertas enviados e estatísticas.
- **Áreas de Interesse:** Adição de áreas específicas para receber notificações personalizadas.
- **Exclusão de Conta:** Opção de deletar a conta diretamente no app.

---

## 🛠️ Tecnologias Utilizadas

- React Native
- Expo
- JavaScript
- Firebase (provavelmente, para autenticação e backend)
- Mapas (via API de localização)

---

## 📦 Como Rodar o Projeto

### Pré-requisitos

- [Node.js](https://nodejs.org/)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- [Git](https://git-scm.com/)

```bash
git clone <URL-do-repositório>
cd ResgateAlertaGS-1needingtofix
git checkout v1needingtofix
2. Instale as Dependências do App
bash
Copiar
Editar
npm install
3. Rode a API Java (Spring Boot)
A API é necessária para o app funcionar corretamente.

Acesse o diretório do projeto da API:

bash
Copiar
Editar
cd resgate-alerta-api
Compile o projeto:

bash
Copiar
Editar
mvn clean install
Acesse a pasta target:

bash
Copiar
Editar
cd target
Execute o JAR da aplicação:

bash
Copiar
Editar
java -jar resgate-alerta-api-0.0.1-SNAPSHOT.jar
4. Configure o IP da API no Frontend
Abra os seguintes arquivos no app:

src/service/api.js

src/screens/Profile.jsx

E substitua a constante API_BASE_URL com o IP local da sua máquina (onde a API está rodando):

js
Copiar
Editar
const API_BASE_URL = 'http://SEU_IP_LOCAL:8080';
Exemplo:

js
Copiar
Editar
const API_BASE_URL = 'http://192.168.1.10:8080';
5. Inicie o App Mobile
Com a API rodando, volte ao diretório do app React Native:

bash
Copiar
Editar
cd ResgateAlertaGS-1needingtofix
npx expo start
