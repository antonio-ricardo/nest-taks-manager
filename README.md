Nest Task Manager
Este é um projeto de gerenciamento de tarefas construído com NestJS e utilizando o banco de dados MySQL. O ambiente é configurado com Docker e Docker Compose para simplificar o setup.

Requisitos
Certifique-se de ter os seguintes programas instalados em sua máquina:

- Node.js (versão recomendada: 18.x ou superior)
- Docker
- Docker Compose
- Configuração do Projeto

1. Clone o repositório
Clone o projeto em seu ambiente local:

- git clone https://github.com/seu-usuario/nest-task-manager.git

entre na pasta

- cd nest-task-manager

2. Configurar env
O projeto possui algumas variáveis de ambiente, mas se não quiser definir utilize a do env.example (obs: utilize a database_url do env.example)

3. Rodar o projeto com Docker Compose
Para rodar a aplicação e o banco de dados, use o Docker Compose. Isso irá construir a imagem do Node.js e subir os containers do MySQL e da aplicação NestJS.

Execute o seguinte comando:

docker-compose up --build

Isso vai:

Baixar a imagem do MySQL.
Instalar todas as dependências do projeto.
Subir a aplicação e o banco de dados.
Executar o comando node seed.js para criar um usuário administrador no banco de dados local.
A aplicação será exposta na porta 3000, e o banco de dados MySQL na porta 3306.

4. Acessar a aplicação
Após o docker-compose up ser executado com sucesso, a aplicação estará disponível em:

http://localhost:3000

Se, por algum motivo, o script de seed (que popula o banco de dados com o usuário admin) não rodar automaticamente, você pode rodá-lo manualmente. Certifique-se de que os containers estejam rodando, e execute o seguinte comando:

docker exec -it myapp node seed.js

Isso criará o usuário admin no banco de dados.

5. credenciais do admin

username: admin
password: admin123