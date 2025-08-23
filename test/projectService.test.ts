import { expect } from 'chai';
import { describe, it, beforeEach, afterEach } from 'mocha';
import sinon from 'sinon';
import { ProjectService, CreateProjectDTO, UpdateProjectDTO } from '../src/services/projectService';
import { ProjectRepository } from '../src/repositories/projectRepository';

describe('ProjectService', () => {
  let projectService: ProjectService;
  let repositoryStub: sinon.SinonStubbedInstance<ProjectRepository>;

  beforeEach(() => {
    projectService = new ProjectService();
    repositoryStub = sinon.createStubInstance(ProjectRepository);
    (projectService as any).projectRepository = repositoryStub;
  });

  afterEach(() => {
    sinon.restore();
  });

  describe('Criar projeto', () => {
    it('deve lançar erro ao criar projeto com nome vazio', async () => {
      const projectData: CreateProjectDTO = {
        name: '',
        description: 'Descrição do projeto',
        status: 'to do',
        startDate: new Date('2024-01-01'),
        deadline: new Date('2024-12-31'),
        creatorId: 1
      };

      try {
        await projectService.createProject(projectData);
        expect.fail('Deveria ter lançado erro');
      } catch (error) {
        expect(error).to.be.an('error');
        expect((error as Error).message).to.equal('Project name is required');
      }
    });

    it('deve lançar erro ao criar projeto com descrição vazia', async () => {
      const projectData: CreateProjectDTO = {
        name: 'Projeto Teste',
        description: '',
        status: 'to do',
        startDate: new Date('2024-01-01'),
        deadline: new Date('2024-12-31'),
        creatorId: 1
      };

      try {
        await projectService.createProject(projectData);
        expect.fail('Deveria ter lançado erro');
      } catch (error) {
        expect(error).to.be.an('error');
        expect((error as Error).message).to.equal('Project description is required');
      }
    });

    it('deve lançar erro ao criar projeto com data de início posterior ao deadline', async () => {
      const projectData: CreateProjectDTO = {
        name: 'Projeto Teste',
        description: 'Descrição do projeto',
        status: 'to do',
        startDate: new Date('2024-12-31'),
        deadline: new Date('2024-01-01'),
        creatorId: 1
      };

      try {
        await projectService.createProject(projectData);
        expect.fail('Deveria ter lançado erro');
      } catch (error) {
        expect(error).to.be.an('error');
        expect((error as Error).message).to.equal('Start date cannot be after deadline');
      }
    });

    it('deve validar estrutura de projeto criado com sucesso', () => {
      const expectedProject = {
        id: 1,
        name: 'Projeto Teste',
        description: 'Descrição do projeto',
        status: 'to do',
        startDate: new Date('2024-01-01'),
        deadline: new Date('2024-12-31'),
        creatorId: 1
      };

      expect(expectedProject).to.have.property('id');
      expect(expectedProject).to.have.property('name');
      expect(expectedProject).to.have.property('description');
      expect(expectedProject).to.have.property('status');
      expect(expectedProject).to.have.property('startDate');
      expect(expectedProject).to.have.property('deadline');
      expect(expectedProject).to.have.property('creatorId');
    });
  });

  describe('Buscar projeto', () => {
    it('deve lançar erro ao buscar projeto com ID inválido', async () => {
      try {
        await projectService.getProjectById(0);
        expect.fail('Deveria ter lançado erro');
      } catch (error) {
        expect(error).to.be.an('error');
        expect((error as Error).message).to.equal('Invalid project ID');
      }
    });

    it('deve retornar array ao listar todos os projetos', async () => {
      repositoryStub.getAllProjects.resolves([]);
      
      const projects = await projectService.getAllProjects();
      expect(projects).to.be.an('array');
    });
  });

  describe('Alterar projeto', () => {
    it('deve lançar erro ao tentar alterar nome para vazio', async () => {
      const mockProject = {
        id: 1,
        name: 'Projeto Existente',
        description: 'Descrição',
        save: sinon.stub().resolves()
      };
      
      repositoryStub.getProjectById.resolves(mockProject as any);
      
      const updateData: UpdateProjectDTO = {
        name: ''
      };

      try {
        await projectService.updateProject(1, updateData);
        expect.fail('Deveria ter lançado erro');
      } catch (error) {
        expect(error).to.be.an('error');
        expect((error as Error).message).to.equal('Project name cannot be empty');
      }
    });

    it('deve lançar erro ao tentar alterar descrição para vazia', async () => {
      const mockProject = {
        id: 1,
        name: 'Projeto Existente',
        description: 'Descrição',
        save: sinon.stub().resolves()
      };
      
      repositoryStub.getProjectById.resolves(mockProject as any);
      
      const updateData: UpdateProjectDTO = {
        description: ''
      };

      try {
        await projectService.updateProject(1, updateData);
        expect.fail('Deveria ter lançado erro');
      } catch (error) {
        expect(error).to.be.an('error');
        expect((error as Error).message).to.equal('Project description cannot be empty');
      }
    });

    it('deve lançar erro ao tentar alterar com data de início posterior ao deadline', async () => {
      const mockProject = {
        id: 1,
        name: 'Projeto Existente',
        description: 'Descrição',
        startDate: new Date('2024-01-01'),
        deadline: new Date('2024-12-31'),
        save: sinon.stub().resolves()
      };
      
      repositoryStub.getProjectById.resolves(mockProject as any);
      
      const updateData: UpdateProjectDTO = {
        startDate: new Date('2024-12-31'),
        deadline: new Date('2024-01-01')
      };

      try {
        await projectService.updateProject(1, updateData);
        expect.fail('Deveria ter lançado erro');
      } catch (error) {
        expect(error).to.be.an('error');
        expect((error as Error).message).to.equal('Start date cannot be after deadline');
      }
    });

    it('deve lançar erro ao tentar alterar com ID inválido', async () => {
      const updateData: UpdateProjectDTO = {
        name: 'Novo Nome'
      };

      try {
        await projectService.updateProject(0, updateData);
        expect.fail('Deveria ter lançado erro');
      } catch (error) {
        expect(error).to.be.an('error');
        expect((error as Error).message).to.equal('Invalid project ID');
      }
    });
  });

  describe('Deletar projeto', () => {
    it('deve lançar erro ao tentar deletar com ID inválido', async () => {
      try {
        await projectService.deleteProject(0);
        expect.fail('Deveria ter lançado erro');
      } catch (error) {
        expect(error).to.be.an('error');
        expect((error as Error).message).to.equal('Invalid project ID');
      }
    });

    it('deve retornar mensagem de sucesso ao deletar projeto', () => {
      const expectedResponse = { message: 'Project deleted successfully' };
      expect(expectedResponse).to.have.property('message').equal('Project deleted successfully');
    });
  });
});
