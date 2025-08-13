import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Jera API',
      version: '1.0.0',
      description: 'API para gerenciamento de usuários e projetos',
    },
    servers: [
      {
        url: 'http://localhost:3000/api',
        description: 'Servidor de desenvolvimento',
      },
    ],
    components: {
      schemas: {
        User: {
          type: 'object',
          required: ['name', 'email', 'password'],
          properties: {
            id: {
              type: 'integer',
              description: 'ID único do usuário',
              example: 1,
            },
            name: {
              type: 'string',
              description: 'Nome do usuário',
              example: 'João Silva',
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'Email do usuário',
              example: 'joao@example.com',
            },
            password: {
              type: 'string',
              description: 'Senha do usuário',
              example: 'senha123',
            },
          },
        },
        UserInput: {
          type: 'object',
          required: ['name', 'email', 'password'],
          properties: {
            name: {
              type: 'string',
              description: 'Nome do usuário',
              example: 'João Silva',
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'Email do usuário',
              example: 'joao@example.com',
            },
            password: {
              type: 'string',
              description: 'Senha do usuário',
              example: 'senha123',
            },
          },
        },
        Projeto: {
          type: 'object',
          required: ['nome', 'status', 'dataInicio', 'prazo', 'criadorId'],
          properties: {
            id: {
              type: 'integer',
              description: 'ID único do projeto',
              example: 1,
            },
            nome: {
              type: 'string',
              description: 'Nome do projeto',
              example: 'Sistema de vendas',
            },
            descricao: {
              type: 'string',
              description: 'Descrição do projeto',
              example: 'Sistema para gerenciar vendas online',
            },
            status: {
              type: 'string',
              enum: ['to do', 'in progress', 'done'],
              description: 'Status do projeto',
              example: 'in progress',
            },
            dataInicio: {
              type: 'string',
              format: 'date',
              description: 'Data de início do projeto',
              example: '2025-01-01',
            },
            prazo: {
              type: 'string',
              format: 'date',
              description: 'Prazo final do projeto',
              example: '2025-12-31',
            },
            criadorId: {
              type: 'integer',
              description: 'ID do usuário criador do projeto',
              example: 1,
            },
          },
        },
        ProjetoInput: {
          type: 'object',
          required: ['nome', 'status', 'dataInicio', 'prazo', 'criadorId'],
          properties: {
            nome: {
              type: 'string',
              description: 'Nome do projeto',
              example: 'Sistema de vendas',
            },
            descricao: {
              type: 'string',
              description: 'Descrição do projeto',
              example: 'Sistema para gerenciar vendas online',
            },
            status: {
              type: 'string',
              enum: ['to do', 'in progress', 'done'],
              description: 'Status do projeto',
              example: 'to do',
            },
            dataInicio: {
              type: 'string',
              format: 'date',
              description: 'Data de início do projeto',
              example: '2025-01-01',
            },
            prazo: {
              type: 'string',
              format: 'date',
              description: 'Prazo final do projeto',
              example: '2025-12-31',
            },
            criadorId: {
              type: 'integer',
              description: 'ID do usuário criador do projeto',
              example: 1,
            },
          },
        },
        Error: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              description: 'Mensagem de erro',
              example: 'Recurso não encontrado',
            },
            error: {
              type: 'string',
              description: 'Detalhes do erro',
              example: 'Usuário com ID 999 não existe',
            },
          },
        },
      },
    },
  },
  apis: ['./src/routes/*.ts'], // Caminho para os arquivos de rotas
};

const specs = swaggerJsdoc(options);

export { swaggerUi, specs };
