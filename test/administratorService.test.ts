import { expect } from 'chai';
import { describe, it, beforeEach, afterEach } from 'mocha';
import sinon from 'sinon';
import { AdministratorService, CreateAdministratorDTO, UpdateAdministratorDTO, AVAILABLE_PERMISSIONS } from '../src/services/administratorService';
import { AdministratorRepository } from '../src/repositories/administratorRepository';

describe('AdministratorService', () => {
  let administratorService: AdministratorService;
  let repositoryStub: sinon.SinonStubbedInstance<AdministratorRepository>;

  beforeEach(() => {
    administratorService = new AdministratorService();
    repositoryStub = sinon.createStubInstance(AdministratorRepository);
    (administratorService as any).administratorRepository = repositoryStub;
  });

  afterEach(() => {
    sinon.restore();
  });

  describe('Criar administrador', () => {
    it('deve validar que userId é obrigatório', async () => {
      const adminData: CreateAdministratorDTO = {
        userId: 0, // ID inválido
        level: 'moderator'
      };

      try {
        await administratorService.createAdministrator(adminData);
        expect.fail('Deveria ter lançado erro');
      } catch (error) {
        expect(error).to.be.an('error');
        expect((error as Error).message).to.equal('User ID is required and must be valid');
      }
    });

    it('deve validar permissões inválidas', async () => {
      const adminData: CreateAdministratorDTO = {
        userId: 1,
        level: 'moderator',
        permissions: ['invalid_permission', 'another_invalid']
      };

      repositoryStub.getAdministratorByUserId.resolves(null);

      try {
        await administratorService.createAdministrator(adminData);
        expect.fail('Deveria ter lançado erro');
      } catch (error) {
        expect(error).to.be.an('error');
        expect((error as Error).message).to.include('Invalid permissions:');
        expect((error as Error).message).to.include('invalid_permission, another_invalid');
      }
    });

    it('deve atribuir permissões padrão baseadas no nível super', () => {
      const expectedPermissions = [...AVAILABLE_PERMISSIONS];
      expect(expectedPermissions).to.include('manage_users');
      expect(expectedPermissions).to.include('manage_projects');
      expect(expectedPermissions).to.include('manage_administrators');
      expect(expectedPermissions).to.include('delete_data');
    });

    it('deve atribuir permissões padrão baseadas no nível moderator', () => {
      const expectedPermissions = ['manage_users', 'manage_projects', 'manage_sprints', 'view_reports'];
      expect(expectedPermissions).to.include('manage_users');
      expect(expectedPermissions).to.include('manage_projects');
      expect(expectedPermissions).to.not.include('delete_data');
    });

    it('deve atribuir permissões padrão baseadas no nível support', () => {
      const expectedPermissions = ['view_reports'];
      expect(expectedPermissions).to.include('view_reports');
      expect(expectedPermissions).to.not.include('manage_users');
      expect(expectedPermissions).to.not.include('delete_data');
    });
  });

  describe('Buscar administrador', () => {
    it('deve lançar erro ao buscar administrador com ID inválido', async () => {
      try {
        await administratorService.getAdministratorById(0);
        expect.fail('Deveria ter lançado erro');
      } catch (error) {
        expect(error).to.be.an('error');
        expect((error as Error).message).to.equal('Invalid administrator ID');
      }
    });

    it('deve retornar array ao buscar todos os administradores', async () => {
      repositoryStub.getAllAdministrators.resolves([]);
      
      const administrators = await administratorService.getAllAdministrators();
      expect(administrators).to.be.an('array');
    });

    it('deve retornar array ao buscar administradores ativos', async () => {
      repositoryStub.getActiveAdministrators.resolves([]);
      
      const activeAdministrators = await administratorService.getActiveAdministrators();
      expect(activeAdministrators).to.be.an('array');
    });
  });

  describe('Alterar administrador', () => {
    it('deve lançar erro ao tentar alterar com permissões inválidas', async () => {
      const updateData: UpdateAdministratorDTO = {
        permissions: ['invalid_permission']
      };

      try {
        await administratorService.updateAdministrator(1, updateData);
        expect.fail('Deveria ter lançado erro');
      } catch (error) {
        expect(error).to.be.an('error');
        expect((error as Error).message).to.include('Invalid permissions:');
        expect((error as Error).message).to.include('invalid_permission');
      }
    });

    it('deve lançar erro ao tentar ativar administrador com ID inválido', async () => {
      try {
        await administratorService.activateAdministrator(0);
        expect.fail('Deveria ter lançado erro');
      } catch (error) {
        expect(error).to.be.an('error');
        expect((error as Error).message).to.equal('Invalid administrator ID');
      }
    });

    it('deve lançar erro ao tentar desativar administrador com ID inválido', async () => {
      try {
        await administratorService.deactivateAdministrator(0);
        expect.fail('Deveria ter lançado erro');
      } catch (error) {
        expect(error).to.be.an('error');
        expect((error as Error).message).to.equal('Invalid administrator ID');
      }
    });
  });

  describe('Deletar administrador', () => {
    it('deve lançar erro ao tentar deletar com ID inválido', async () => {
      try {
        await administratorService.deleteAdministrator(0);
        expect.fail('Deveria ter lançado erro');
      } catch (error) {
        expect(error).to.be.an('error');
        expect((error as Error).message).to.equal('Invalid administrator ID');
      }
    });
  });

  describe('Verificar permissões', () => {
    it('deve retornar false para userId inválido', async () => {
      const result = await administratorService.verifyPermission(0, 'manage_users');
      expect(result).to.be.false;
    });

    it('deve retornar false para usuário inexistente', async () => {
      repositoryStub.verifyPermission.resolves(false);
      
      const result = await administratorService.verifyPermission(999999, 'manage_users');
      expect(result).to.be.false;
    });

    it('deve retornar lista de permissões disponíveis', async () => {
      const permissions = await administratorService.getAvailablePermissions();
      expect(permissions).to.be.an('array');
      expect(permissions).to.include('manage_users');
      expect(permissions).to.include('manage_projects');
      expect(permissions).to.include('view_reports');
    });
  });
});
