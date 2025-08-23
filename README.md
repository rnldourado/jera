# Jera API

API REST para gerenciamento de usuários e projetos desenvolvida com Node.js, Express, TypeScript e PostgreSQL.

## Tecnologias

- **Node.js** - Runtime JavaScript
- **Express** - Framework web
- **TypeScript** - Superset JavaScript com tipagem estática
- **PostgreSQL** - Banco de dados relacional
- **Sequelize** - ORM para Node.js
- **Swagger** - Documentação da API

## Pré-requisitos

- Node.js (versão 16 ou superior)
- PostgreSQL
- npm ou yarn

## Instalação

1. Clone o repositório:
```bash
git clone <url-do-repositorio>
cd jera
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
```bash
cp .env.example .env
```

4. Execute as migrações do banco de dados:
```bash
npm run dev
```

## Como usar

### Executar em modo de desenvolvimento:
```bash
npm run dev
```

### Executar com nodemon:
```bash
npm run dev:nodemon
```

### Executar Testes
```bash
npm test
```

### Build para produção:
```bash
npm run build
npm start
```

## Documentação da API

A documentação completa da API está disponível via Swagger UI após iniciar o servidor:

**URL da documentação:** `http://localhost:3000/api-docs`

## Estrutura do Projeto

```
src/
├── config/          # Configurações (banco, swagger)
├── controllers/     # Controladores da aplicação
├── models/          # Modelos do banco de dados
├── routes/          # Definição das rotas
├── services/        # Lógica de negócio
├── repository/      # Acesso aos dados
└── index.ts         # Arquivo principal
```


## Licença

Este projeto está sob a licença MIT.