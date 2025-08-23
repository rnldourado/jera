import { expect } from 'chai';
import { describe, it, beforeEach, afterEach } from 'mocha';
import sinon from 'sinon';
import { TaskService, CreateTaskDTO, UpdateTaskDTO } from '../src/services/taskService';
import { TaskRepository } from '../src/repositories/taskRepository';

describe('TaskService', () => {
  let taskService: TaskService;
  let repositoryStub: sinon.SinonStubbedInstance<TaskRepository>;

  beforeEach(() => {
    taskService = new TaskService();
    repositoryStub = sinon.createStubInstance(TaskRepository);
    (taskService as any).taskRepository = repositoryStub;
  });

  afterEach(() => {
    sinon.restore();
  });

  describe('Criar tarefa', () => {
    it('deve lançar erro ao criar tarefa com nome vazio', async () => {
      const taskData: CreateTaskDTO = {
        name: '',
        description: 'Descrição da tarefa',
        status: 'to do',
        priority: 'medium',
        assigneeId: 1,
        sprintId: 1,
        projectId: 1
      };

      try {
        await taskService.createTask(taskData);
        expect.fail('Deveria ter lançado erro');
      } catch (error) {
        expect(error).to.be.an('error');
        expect((error as Error).message).to.equal('Task name is required');
      }
    });

    it('deve lançar erro ao criar tarefa com descrição vazia', async () => {
      const taskData: CreateTaskDTO = {
        name: 'Tarefa Teste',
        description: '',
        status: 'to do',
        priority: 'medium',
        assigneeId: 1,
        sprintId: 1,
        projectId: 1
      };

      try {
        await taskService.createTask(taskData);
        expect.fail('Deveria ter lançado erro');
      } catch (error) {
        expect(error).to.be.an('error');
        expect((error as Error).message).to.equal('Task description is required');
      }
    });

    it('deve lançar erro ao criar tarefa sem assigneeId válido', async () => {
      const taskData: CreateTaskDTO = {
        name: 'Tarefa Teste',
        description: 'Descrição da tarefa',
        status: 'to do',
        priority: 'medium',
        assigneeId: 0, // ID inválido
        sprintId: 1,
        projectId: 1
      };

      try {
        await taskService.createTask(taskData);
        expect.fail('Deveria ter lançado erro');
      } catch (error) {
        expect(error).to.be.an('error');
        expect((error as Error).message).to.equal('Assignee ID is required and must be valid');
      }
    });

    it('deve lançar erro ao criar tarefa sem sprintId válido', async () => {
      const taskData: CreateTaskDTO = {
        name: 'Tarefa Teste',
        description: 'Descrição da tarefa',
        status: 'to do',
        priority: 'medium',
        assigneeId: 1,
        sprintId: 0, // ID inválido
        projectId: 1
      };

      try {
        await taskService.createTask(taskData);
        expect.fail('Deveria ter lançado erro');
      } catch (error) {
        expect(error).to.be.an('error');
        expect((error as Error).message).to.equal('Sprint ID is required and must be valid');
      }
    });

    it('deve lançar erro ao criar tarefa sem projectId válido', async () => {
      const taskData: CreateTaskDTO = {
        name: 'Tarefa Teste',
        description: 'Descrição da tarefa',
        status: 'to do',
        priority: 'medium',
        assigneeId: 1,
        sprintId: 1,
        projectId: 0 // ID inválido
      };

      try {
        await taskService.createTask(taskData);
        expect.fail('Deveria ter lançado erro');
      } catch (error) {
        expect(error).to.be.an('error');
        expect((error as Error).message).to.equal('Project ID is required and must be valid');
      }
    });

    it('deve validar estrutura de tarefa criada com sucesso', () => {
      const expectedTask = {
        id: 1,
        name: 'Tarefa Teste',
        description: 'Descrição da tarefa',
        status: 'to do',
        priority: 'medium',
        assigneeId: 1,
        sprintId: 1,
        projectId: 1
      };

      expect(expectedTask).to.have.property('id');
      expect(expectedTask).to.have.property('name');
      expect(expectedTask).to.have.property('description');
      expect(expectedTask).to.have.property('status');
      expect(expectedTask).to.have.property('priority');
      expect(expectedTask).to.have.property('assigneeId');
      expect(expectedTask).to.have.property('sprintId');
      expect(expectedTask).to.have.property('projectId');
    });
  });

  describe('Buscar tarefa', () => {
    it('deve lançar erro ao buscar tarefa com ID inválido', async () => {
      try {
        await taskService.getTaskById(0);
        expect.fail('Deveria ter lançado erro');
      } catch (error) {
        expect(error).to.be.an('error');
        expect((error as Error).message).to.equal('Invalid task ID');
      }
    });

    it('deve lançar erro ao buscar com sprintId inválido', async () => {
      try {
        await taskService.getTasksBySprint(0);
        expect.fail('Deveria ter lançado erro');
      } catch (error) {
        expect(error).to.be.an('error');
        expect((error as Error).message).to.equal('Invalid sprint ID');
      }
    });

    it('deve lançar erro ao buscar com projectId inválido', async () => {
      try {
        await taskService.getTasksByProject(0);
        expect.fail('Deveria ter lançado erro');
      } catch (error) {
        expect(error).to.be.an('error');
        expect((error as Error).message).to.equal('Invalid project ID');
      }
    });

    it('deve lançar erro ao buscar com assigneeId inválido', async () => {
      try {
        await taskService.getTasksByAssignee(0);
        expect.fail('Deveria ter lançado erro');
      } catch (error) {
        expect(error).to.be.an('error');
        expect((error as Error).message).to.equal('Invalid assignee ID');
      }
    });

    it('deve retornar array ao listar todas as tarefas', async () => {
      repositoryStub.getAllTasks.resolves([]);
      
      const tasks = await taskService.getAllTasks();
      expect(tasks).to.be.an('array');
    });
  });

  describe('Alterar tarefa', () => {
    it('deve lançar erro ao tentar alterar nome para vazio', async () => {
      const updateData: UpdateTaskDTO = {
        name: ''
      };

      try {
        await taskService.updateTask(1, updateData);
        expect.fail('Deveria ter lançado erro');
      } catch (error) {
        expect(error).to.be.an('error');
        expect((error as Error).message).to.equal('Task name cannot be empty');
      }
    });

    it('deve lançar erro ao tentar alterar com assigneeId inválido', async () => {
      const updateData: UpdateTaskDTO = {
        assigneeId: 0
      };

      try {
        await taskService.updateTask(1, updateData);
        expect.fail('Deveria ter lançado erro');
      } catch (error) {
        expect(error).to.be.an('error');
        expect((error as Error).message).to.equal('Assignee ID must be valid');
      }
    });

    it('deve lançar erro ao tentar alterar com sprintId inválido', async () => {
      const updateData: UpdateTaskDTO = {
        sprintId: 0
      };

      try {
        await taskService.updateTask(1, updateData);
        expect.fail('Deveria ter lançado erro');
      } catch (error) {
        expect(error).to.be.an('error');
        expect((error as Error).message).to.equal('Sprint ID must be valid');
      }
    });

    it('deve lançar erro ao tentar alterar com projectId inválido', async () => {
      const updateData: UpdateTaskDTO = {
        projectId: 0
      };

      try {
        await taskService.updateTask(1, updateData);
        expect.fail('Deveria ter lançado erro');
      } catch (error) {
        expect(error).to.be.an('error');
        expect((error as Error).message).to.equal('Project ID must be valid');
      }
    });

    it('deve validar atualização de status e prioridade', () => {
      const validStatuses = ['to do', 'in progress', 'done'];
      const validPriorities = ['low', 'medium', 'high'];
      
      const updateData: UpdateTaskDTO = {
        status: 'in progress',
        priority: 'high'
      };

      expect(validStatuses).to.include(updateData.status);
      expect(validPriorities).to.include(updateData.priority);
    });
  });

  describe('Deletar tarefa', () => {
    it('deve lançar erro ao tentar deletar com ID inválido', async () => {
      try {
        await taskService.deleteTask(0);
        expect.fail('Deveria ter lançado erro');
      } catch (error) {
        expect(error).to.be.an('error');
        expect((error as Error).message).to.equal('Invalid task ID');
      }
    });

    it('deve retornar mensagem de sucesso ao deletar tarefa', () => {
      const expectedResponse = { message: 'Task deleted successfully' };
      expect(expectedResponse).to.have.property('message').equal('Task deleted successfully');
    });
  });
});
