# Nest Task Manager
Este é um projeto de gerenciamento de tarefas construído com NestJS e utilizando o banco de dados MySQL. O ambiente é configurado com Docker e Docker Compose para simplificar o setup.

# Requisitos
Certifique-se de ter os seguintes programas instalados em sua máquina:

- Node.js (versão recomendada: 18.x ou superior)
- Docker
- Docker Compose
- Configuração do Projeto

# 1. Clone o repositório
# Clone o projeto em seu ambiente local:

- git clone https://github.com/antonio-ricardo/nest-task-manager.git

# entre na pasta

- cd nest-task-manager

# 2. Configurar env
Altere o nome do arquivo .env.example para .env

# 3. Rodar o banco com Docker Compose
Para rodar o banco de dados, use o Docker Compose. Isso irá subir o container do MySQL.

# Execute o seguinte comando:

- docker-compose up --build -d

# 4. Acessar a aplicação
# Após o docker-compose up ser executado com sucesso, rode os seguintes comandos:

- yarn

- npx prisma migrate deploy

- yarn build

- yarn ts-node seed.ts

- yarn start:prod

# 5. a aplicação estara no ar na url:

http://localhost:3000

# 6. credenciais do admin

username: admin
password: admin123

# 7. documentação da API na URL:

http://localhost:3000/api