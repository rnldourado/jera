import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Jera API',
      version: '1.0.0',
      description: 'API for user and project management',
    },
    servers: [
      {
        url: 'http://localhost:3000/api',
        description: 'Development server',
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
              description: 'Unique user ID',
              example: 1,
            },
            name: {
              type: 'string',
              description: 'User name',
              example: 'John Silva',
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'User email',
              example: 'john@example.com',
            },
            password: {
              type: 'string',
              description: 'User password',
              example: 'password123',
            },
          },
        },
        UserInput: {
          type: 'object',
          required: ['name', 'email', 'password'],
          properties: {
            name: {
              type: 'string',
              description: 'User name',
              example: 'John Silva',
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'User email',
              example: 'john@example.com',
            },
            password: {
              type: 'string',
              description: 'User password',
              example: 'password123',
            },
          },
        },
        Project: {
          type: 'object',
          required: ['name', 'status', 'startDate', 'deadline', 'creatorId'],
          properties: {
            id: {
              type: 'integer',
              description: 'Unique project ID',
              example: 1,
            },
            name: {
              type: 'string',
              description: 'Project name',
              example: 'Sales System',
            },
            description: {
              type: 'string',
              description: 'Project description',
              example: 'System for managing online sales',
            },
            status: {
              type: 'string',
              enum: ['to do', 'in progress', 'done'],
              description: 'Project status',
              example: 'in progress',
            },
            startDate: {
              type: 'string',
              format: 'date',
              description: 'Project start date',
              example: '2025-01-01',
            },
            deadline: {
              type: 'string',
              format: 'date',
              description: 'Project deadline',
              example: '2025-12-31',
            },
            creatorId: {
              type: 'integer',
              description: 'ID of the project creator user',
              example: 1,
            },
          },
        },
        ProjectInput: {
          type: 'object',
          required: ['name', 'status', 'startDate', 'deadline', 'creatorId'],
          properties: {
            name: {
              type: 'string',
              description: 'Project name',
              example: 'Sales System',
            },
            description: {
              type: 'string',
              description: 'Project description',
              example: 'System for managing online sales',
            },
            status: {
              type: 'string',
              enum: ['to do', 'in progress', 'done'],
              description: 'Project status',
              example: 'to do',
            },
            startDate: {
              type: 'string',
              format: 'date',
              description: 'Project start date',
              example: '2025-01-01',
            },
            deadline: {
              type: 'string',
              format: 'date',
              description: 'Project deadline',
              example: '2025-12-31',
            },
            creatorId: {
              type: 'integer',
              description: 'ID of the project creator user',
              example: 1,
            },
          },
        },
        Sprint: {
          type: 'object',
          required: ['name', 'description', 'startDate', 'endDate', 'status', 'projectId'],
          properties: {
            id: {
              type: 'integer',
              description: 'Unique sprint ID',
              example: 1,
            },
            name: {
              type: 'string',
              description: 'Sprint name',
              example: 'Sprint 1 - Login',
            },
            description: {
              type: 'string',
              description: 'Sprint description',
              example: 'Implementation of login and authentication system',
            },
            startDate: {
              type: 'string',
              format: 'date',
              description: 'Sprint start date',
              example: '2025-01-01',
            },
            endDate: {
              type: 'string',
              format: 'date',
              description: 'Sprint end date',
              example: '2025-01-15',
            },
            status: {
              type: 'string',
              enum: ['planning', 'in_progress', 'ended'],
              description: 'Sprint status',
              example: 'planning',
            },
            projectId: {
              type: 'integer',
              description: 'ID of the project this sprint belongs to',
              example: 1,
            },
          },
        },
        SprintInput: {
          type: 'object',
          required: ['name', 'description', 'startDate', 'endDate', 'status', 'projectId'],
          properties: {
            name: {
              type: 'string',
              description: 'Sprint name',
              example: 'Sprint 1 - Login',
            },
            description: {
              type: 'string',
              description: 'Sprint description',
              example: 'Implementation of login and authentication system',
            },
            startDate: {
              type: 'string',
              format: 'date',
              description: 'Sprint start date',
              example: '2025-01-01',
            },
            endDate: {
              type: 'string',
              format: 'date',
              description: 'Sprint end date',
              example: '2025-01-15',
            },
            status: {
              type: 'string',
              enum: ['planning', 'in_progress', 'ended'],
              description: 'Sprint status',
              example: 'planning',
            },
            projectId: {
              type: 'integer',
              description: 'ID of the project this sprint belongs to',
              example: 1,
            },
          },
        },
        Task: {
          type: 'object',
          required: ['name', 'description', 'status', 'priority', 'createdAt', 'assigneeId', 'sprintId', 'projectId'],
          properties: {
            id: {
              type: 'integer',
              description: 'Unique task ID',
              example: 1,
            },
            name: {
              type: 'string',
              description: 'Task name',
              example: 'Implement login screen',
            },
            description: {
              type: 'string',
              description: 'Detailed task description',
              example: 'Create login form with email and password validation',
            },
            status: {
              type: 'string',
              enum: ['to do', 'in progress', 'done'],
              description: 'Current task status',
              example: 'to do',
            },
            priority: {
              type: 'string',
              enum: ['low', 'medium', 'high'],
              description: 'Task priority',
              example: 'high',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Task creation date and time',
              example: '2025-01-01T10:00:00Z',
            },
            completedAt: {
              type: 'string',
              format: 'date-time',
              description: 'Task completion date and time (optional)',
              example: '2025-01-05T15:30:00Z',
            },
            assigneeId: {
              type: 'integer',
              description: 'ID of the user responsible for the task',
              example: 1,
            },
            sprintId: {
              type: 'integer',
              description: 'ID of the sprint this task belongs to',
              example: 1,
            },
            projectId: {
              type: 'integer',
              description: 'ID of the project this task belongs to',
              example: 1,
            },
          },
        },
        TaskInput: {
          type: 'object',
          required: ['name', 'description', 'status', 'priority', 'assigneeId', 'sprintId', 'projectId'],
          properties: {
            name: {
              type: 'string',
              description: 'Task name',
              example: 'Implement login screen',
            },
            description: {
              type: 'string',
              description: 'Detailed task description',
              example: 'Create login form with email and password validation',
            },
            status: {
              type: 'string',
              enum: ['to do', 'in progress', 'done'],
              description: 'Initial task status',
              example: 'to do',
            },
            priority: {
              type: 'string',
              enum: ['low', 'medium', 'high'],
              description: 'Task priority',
              example: 'high',
            },
            assigneeId: {
              type: 'integer',
              description: 'ID of the user responsible for the task',
              example: 1,
            },
            sprintId: {
              type: 'integer',
              description: 'ID of the sprint this task belongs to',
              example: 1,
            },
            projectId: {
              type: 'integer',
              description: 'ID of the project this task belongs to',
              example: 1,
            },
          },
        },
        TaskUpdateInput: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              description: 'Task name',
              example: 'Updated login screen implementation',
            },
            description: {
              type: 'string',
              description: 'Detailed task description',
              example: 'Create login form with enhanced validation',
            },
            status: {
              type: 'string',
              enum: ['to do', 'in progress', 'done'],
              description: 'New task status',
              example: 'in progress',
            },
            priority: {
              type: 'string',
              enum: ['low', 'medium', 'high'],
              description: 'New task priority',
              example: 'medium',
            },
            assigneeId: {
              type: 'integer',
              description: 'New ID of the responsible user',
              example: 2,
            },
            sprintId: {
              type: 'integer',
              description: 'New sprint ID',
              example: 2,
            },
            projectId: {
              type: 'integer',
              description: 'New project ID',
              example: 1,
            },
          },
        },
        Administrator: {
          type: 'object',
          required: ['userId', 'level'],
          properties: {
            id: {
              type: 'integer',
              description: 'Unique administrator ID',
              example: 1,
            },
            userId: {
              type: 'integer',
              description: 'Associated user ID',
              example: 1,
            },
            level: {
              type: 'string',
              enum: ['super', 'moderator', 'support'],
              description: 'Administrator access level',
              example: 'moderator',
            },
            permissions: {
              type: 'array',
              items: {
                type: 'string',
              },
              description: 'List of specific permissions',
              example: ['manage_users', 'view_reports'],
            },
            active: {
              type: 'boolean',
              description: 'Whether the administrator is active',
              example: true,
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Administrator creation date',
              example: '2025-01-20T10:00:00.000Z',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: 'Last update date',
              example: '2025-01-20T15:30:00.000Z',
            },
            user: {
              $ref: '#/components/schemas/User',
              description: 'Associated user data',
            },
          },
        },
        AdministratorInput: {
          type: 'object',
          required: ['userId', 'level'],
          properties: {
            userId: {
              type: 'integer',
              description: 'ID of the user who will be administrator',
              example: 1,
            },
            level: {
              type: 'string',
              enum: ['super', 'moderator', 'support'],
              description: 'Administrator access level',
              example: 'moderator',
            },
            permissions: {
              type: 'array',
              items: {
                type: 'string',
              },
              description: 'List of specific permissions (optional)',
              example: ['manage_users', 'view_reports'],
            },
          },
        },
        AdministratorUpdateInput: {
          type: 'object',
          properties: {
            level: {
              type: 'string',
              enum: ['super', 'moderator', 'support'],
              description: 'Administrator access level',
              example: 'moderator',
            },
            permissions: {
              type: 'array',
              items: {
                type: 'string',
              },
              description: 'List of specific permissions',
              example: ['manage_users', 'view_reports'],
            },
            active: {
              type: 'boolean',
              description: 'Whether the administrator is active',
              example: true,
            },
          },
        },
        Error: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              description: 'Error message',
              example: 'Resource not found',
            },
            error: {
              type: 'string',
              description: 'Error details',
              example: 'User with ID 999 does not exist',
            },
          },
        },
      },
    },
  },
  apis: ['./src/routes/*.ts'], // Path to route files
};

const specs = swaggerJsdoc(options);

export { swaggerUi, specs };
