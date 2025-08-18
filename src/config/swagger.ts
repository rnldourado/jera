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
        Sprint: {
          type: 'object',
          required: ['nome', 'descricao', 'dataInicio', 'dataFim', 'status', 'projetoId'],
          properties: {
            id: {
              type: 'integer',
              description: 'ID único da sprint',
              example: 1,
            },
            nome: {
              type: 'string',
              description: 'Nome da sprint',
              example: 'Sprint 1 - Login',
            },
            descricao: {
              type: 'string',
              description: 'Descrição da sprint',
              example: 'Implementação do sistema de login e autenticação',
            },
            dataInicio: {
              type: 'string',
              format: 'date',
              description: 'Data de início da sprint',
              example: '2025-01-01',
            },
            dataFim: {
              type: 'string',
              format: 'date',
              description: 'Data de fim da sprint',
              example: '2025-01-15',
            },
            status: {
              type: 'string',
              enum: ['planning', 'in_progress', 'ended'],
              description: 'Status da sprint',
              example: 'planning',
            },
            projetoId: {
              type: 'integer',
              description: 'ID do projeto ao qual a sprint pertence',
              example: 1,
            },
          },
        },
        SprintInput: {
          type: 'object',
          required: ['nome', 'descricao', 'dataInicio', 'dataFim', 'status', 'projetoId'],
          properties: {
            nome: {
              type: 'string',
              description: 'Nome da sprint',
              example: 'Sprint 1 - Login',
            },
            descricao: {
              type: 'string',
              description: 'Descrição da sprint',
              example: 'Implementação do sistema de login e autenticação',
            },
            dataInicio: {
              type: 'string',
              format: 'date',
              description: 'Data de início da sprint',
              example: '2025-01-01',
            },
            dataFim: {
              type: 'string',
              format: 'date',
              description: 'Data de fim da sprint',
              example: '2025-01-15',
            },
            status: {
              type: 'string',
              enum: ['planning', 'in_progress', 'ended'],
              description: 'Status da sprint',
              example: 'planning',
            },
            projetoId: {
              type: 'integer',
              description: 'ID do projeto ao qual a sprint pertence',
              example: 1,
            },
          },
        },
        Tarefa: {
          type: 'object',
          required: ['nome', 'descricao', 'status', 'prioridade', 'dataCriacao', 'responsavelId', 'sprintId', 'projetoId'],
          properties: {
            id: {
              type: 'integer',
              description: 'ID único da tarefa',
              example: 1,
            },
            nome: {
              type: 'string',
              description: 'Nome da tarefa',
              example: 'Implementar tela de login',
            },
            descricao: {
              type: 'string',
              description: 'Descrição detalhada da tarefa',
              example: 'Criar formulário de login com validação de email e senha',
            },
            status: {
              type: 'string',
              enum: ['to do', 'in progress', 'done'],
              description: 'Status atual da tarefa',
              example: 'to do',
            },
            prioridade: {
              type: 'string',
              enum: ['low', 'medium', 'high'],
              description: 'Prioridade da tarefa',
              example: 'high',
            },
            dataCriacao: {
              type: 'string',
              format: 'date-time',
              description: 'Data e hora de criação da tarefa',
              example: '2025-01-01T10:00:00Z',
            },
            dataConclusao: {
              type: 'string',
              format: 'date-time',
              description: 'Data e hora de conclusão da tarefa (opcional)',
              example: '2025-01-05T15:30:00Z',
            },
            responsavelId: {
              type: 'integer',
              description: 'ID do usuário responsável pela tarefa',
              example: 1,
            },
            sprintId: {
              type: 'integer',
              description: 'ID da sprint à qual a tarefa pertence',
              example: 1,
            },
            projetoId: {
              type: 'integer',
              description: 'ID do projeto ao qual a tarefa pertence',
              example: 1,
            },
          },
        },
        TarefaInput: {
          type: 'object',
          required: ['nome', 'descricao', 'status', 'prioridade', 'responsavelId', 'sprintId', 'projetoId'],
          properties: {
            nome: {
              type: 'string',
              description: 'Nome da tarefa',
              example: 'Implementar tela de login',
            },
            descricao: {
              type: 'string',
              description: 'Descrição detalhada da tarefa',
              example: 'Criar formulário de login com validação de email e senha',
            },
            status: {
              type: 'string',
              enum: ['to do', 'in progress', 'done'],
              description: 'Status inicial da tarefa',
              example: 'to do',
            },
            prioridade: {
              type: 'string',
              enum: ['low', 'medium', 'high'],
              description: 'Prioridade da tarefa',
              example: 'high',
            },
            responsavelId: {
              type: 'integer',
              description: 'ID do usuário responsável pela tarefa',
              example: 1,
            },
            sprintId: {
              type: 'integer',
              description: 'ID da sprint à qual a tarefa pertence',
              example: 1,
            },
            projetoId: {
              type: 'integer',
              description: 'ID do projeto ao qual a tarefa pertence',
              example: 1,
            },
          },
        },
        TarefaUpdateInput: {
          type: 'object',
          properties: {
            nome: {
              type: 'string',
              description: 'Nome da tarefa',
              example: 'Implementar tela de login atualizada',
            },
            descricao: {
              type: 'string',
              description: 'Descrição detalhada da tarefa',
              example: 'Criar formulário de login com validação aprimorada',
            },
            status: {
              type: 'string',
              enum: ['to do', 'in progress', 'done'],
              description: 'Novo status da tarefa',
              example: 'in progress',
            },
            prioridade: {
              type: 'string',
              enum: ['low', 'medium', 'high'],
              description: 'Nova prioridade da tarefa',
              example: 'medium',
            },
            responsavelId: {
              type: 'integer',
              description: 'Novo ID do usuário responsável',
              example: 2,
            },
            sprintId: {
              type: 'integer',
              description: 'Novo ID da sprint',
              example: 2,
            },
            projetoId: {
              type: 'integer',
              description: 'Novo ID do projeto',
              example: 1,
            },
          },
        },
        Administrador: {
          type: 'object',
          required: ['userId', 'nivel'],
          properties: {
            id: {
              type: 'integer',
              description: 'ID único do administrador',
              example: 1,
            },
            userId: {
              type: 'integer',
              description: 'ID do usuário associado',
              example: 1,
            },
            nivel: {
              type: 'string',
              enum: ['super', 'moderador', 'suporte'],
              description: 'Nível de acesso do administrador',
              example: 'moderador',
            },
            permissoes: {
              type: 'array',
              items: {
                type: 'string',
              },
              description: 'Lista de permissões específicas',
              example: ['gerenciar_usuarios', 'visualizar_relatorios'],
            },
            ativo: {
              type: 'boolean',
              description: 'Se o administrador está ativo',
              example: true,
            },
            dataCriacao: {
              type: 'string',
              format: 'date-time',
              description: 'Data de criação do administrador',
              example: '2025-01-20T10:00:00.000Z',
            },
            dataAtualizacao: {
              type: 'string',
              format: 'date-time',
              description: 'Data da última atualização',
              example: '2025-01-20T15:30:00.000Z',
            },
            user: {
              $ref: '#/components/schemas/User',
              description: 'Dados do usuário associado',
            },
          },
        },
        AdministradorInput: {
          type: 'object',
          required: ['userId', 'nivel'],
          properties: {
            userId: {
              type: 'integer',
              description: 'ID do usuário que será administrador',
              example: 1,
            },
            nivel: {
              type: 'string',
              enum: ['super', 'moderador', 'suporte'],
              description: 'Nível de acesso do administrador',
              example: 'moderador',
            },
            permissoes: {
              type: 'array',
              items: {
                type: 'string',
              },
              description: 'Lista de permissões específicas (opcional)',
              example: ['gerenciar_usuarios', 'visualizar_relatorios'],
            },
          },
        },
        AdministradorUpdateInput: {
          type: 'object',
          properties: {
            nivel: {
              type: 'string',
              enum: ['super', 'moderador', 'suporte'],
              description: 'Nível de acesso do administrador',
              example: 'moderador',
            },
            permissoes: {
              type: 'array',
              items: {
                type: 'string',
              },
              description: 'Lista de permissões específicas',
              example: ['gerenciar_usuarios', 'visualizar_relatorios'],
            },
            ativo: {
              type: 'boolean',
              description: 'Se o administrador está ativo',
              example: true,
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
