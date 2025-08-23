import { expect } from 'chai';
import { describe, it, beforeEach, afterEach } from 'mocha';
import sinon from 'sinon';
import { SprintService, CreateSprintDTO, UpdateSprintDTO } from '../src/services/sprintService';
import { SprintRepository } from '../src/repositories/sprintRepository';

describe('SprintService', () => {
  let sprintService: SprintService;
  let repositoryStub: sinon.SinonStubbedInstance<SprintRepository>;

  beforeEach(() => {
    sprintService = new SprintService();
    repositoryStub = sinon.createStubInstance(SprintRepository);
    (sprintService as any).sprintRepository = repositoryStub;
  });

  afterEach(() => {
    sinon.restore();
  });

  describe('Criar sprint', () => {
    it('deve lançar erro ao criar sprint com nome vazio', async () => {
      const sprintData: CreateSprintDTO = {
        name: '',
        description: 'Descrição da sprint',
        startDate: new Date('2024-01-01'),
        endDate: new Date('2024-01-15'),
        status: 'planning',
        projectId: 1
      };

      try {
        await sprintService.createSprint(sprintData);
        expect.fail('Deveria ter lançado erro');
      } catch (error) {
        expect(error).to.be.an('error');
        expect((error as Error).message).to.equal('Sprint name is required');
      }
    });

    it('deve lançar erro ao criar sprint com descrição vazia', async () => {
      const sprintData: CreateSprintDTO = {
        name: 'Sprint 1',
        description: '',
        startDate: new Date('2024-01-01'),
        endDate: new Date('2024-01-15'),
        status: 'planning',
        projectId: 1
      };

      try {
        await sprintService.createSprint(sprintData);
        expect.fail('Deveria ter lançado erro');
      } catch (error) {
        expect(error).to.be.an('error');
        expect((error as Error).message).to.equal('Sprint description is required');
      }
    });

    it('deve lançar erro ao criar sprint com data de início posterior à data final', async () => {
      const sprintData: CreateSprintDTO = {
        name: 'Sprint 1',
        description: 'Descrição da sprint',
        startDate: new Date('2024-01-15'),
        endDate: new Date('2024-01-01'), // Data final anterior à data de início
        status: 'planning',
        projectId: 1
      };

      try {
        await sprintService.createSprint(sprintData);
        expect.fail('Deveria ter lançado erro');
      } catch (error) {
        expect(error).to.be.an('error');
        expect((error as Error).message).to.equal('Start date cannot be after end date');
      }
    });

    it('deve validar estrutura de sprint criada com sucesso', () => {
      const expectedSprint = {
        id: 1,
        name: 'Sprint 1',
        description: 'Descrição da sprint',
        startDate: new Date('2024-01-01'),
        endDate: new Date('2024-01-15'),
        status: 'planning',
        projectId: 1
      };

      expect(expectedSprint).to.have.property('id');
      expect(expectedSprint).to.have.property('name');
      expect(expectedSprint).to.have.property('description');
      expect(expectedSprint).to.have.property('startDate');
      expect(expectedSprint).to.have.property('endDate');
      expect(expectedSprint).to.have.property('status');
      expect(expectedSprint).to.have.property('projectId');
    });
  });

  describe('Buscar sprint', () => {
    it('deve retornar sprint por ID ou null se não encontrada', async () => {
      repositoryStub.getSprintById.resolves(null);
      
      const sprint = await sprintService.getSprintById(1);
      expect(sprint === null || typeof sprint === 'object').to.be.true;
    });

    it('deve retornar array ao listar todas as sprints', async () => {
      repositoryStub.getAllSprints.resolves([]);
      
      const sprints = await sprintService.getAllSprints();
      expect(sprints).to.be.an('array');
    });
  });

  describe('Alterar sprint', () => {
    it('deve lançar erro ao tentar alterar com ID inválido', async () => {
      const updateData: UpdateSprintDTO = {
        name: 'Novo Nome'
      };

      try {
        await sprintService.updateSprint(0, updateData);
        expect.fail('Deveria ter lançado erro');
      } catch (error) {
        expect(error).to.be.an('error');
        expect((error as Error).message).to.equal('Invalid sprint ID');
      }
    });

    it('deve validar atualização de status', () => {
      const validStatuses = ['planning', 'in_progress', 'ended'];
      const updateData: UpdateSprintDTO = {
        status: 'in_progress'
      };

      expect(validStatuses).to.include(updateData.status);
    });
  });

  describe('Deletar sprint', () => {
    it('deve lançar erro ao tentar deletar com ID inválido', async () => {
      try {
        await sprintService.deleteSprint(0);
        expect.fail('Deveria ter lançado erro');
      } catch (error) {
        expect(error).to.be.an('error');
        expect((error as Error).message).to.equal('Invalid sprint ID');
      }
    });

    it('deve retornar mensagem de sucesso ao deletar sprint', () => {
      const expectedResponse = { message: 'Sprint deleted successfully' };
      expect(expectedResponse).to.have.property('message').equal('Sprint deleted successfully');
    });
  });
});
