import { expect } from 'chai';
import { describe, it, beforeEach, afterEach } from 'mocha';
import sinon from 'sinon';
import { UserService, CreateUserDTO, UpdateUserDTO } from '../src/services/userService';
import { UserRepository } from '../src/repositories/userRepository';

describe('UserService', () => {
  let userService: UserService;
  let repositoryStub: sinon.SinonStubbedInstance<UserRepository>;

  beforeEach(() => {
    userService = new UserService();
    repositoryStub = sinon.createStubInstance(UserRepository);
    (userService as any).userRepository = repositoryStub;
  });

  afterEach(() => {
    sinon.restore();
  });

  describe('Criar usuário', () => {
    it('deve criar um usuário com sucesso', async () => {
      const userData: CreateUserDTO = {
        name: 'João Silva',
        email: 'joao@example.com',
        username: 'joaosilva',
        password: '123456'
      };

      const mockCreatedUser = {
        id: 1,
        name: 'João Silva',
        email: 'joao@example.com',
        username: 'joaosilva'
      };

      repositoryStub.createUser.resolves(mockCreatedUser as any);

      const user = await userService.createUser(userData);
      
      expect(user).to.be.an('object');
      expect(user).to.have.property('id');
      expect(user).to.have.property('name').equal('João Silva');
      expect(user).to.have.property('email').equal('joao@example.com');
      expect(user).to.have.property('username').equal('joaosilva');
      expect(user).to.not.have.property('password'); // Senha não deve estar no retorno
    });

    it('deve lançar erro ao cadastrar usuário com email já cadastrado', async () => {
      const userData: CreateUserDTO = {
        name: 'João Silva',
        email: 'joao@example.com',
        username: 'joaosilva',
        password: '123456'
      };

      repositoryStub.createUser.rejects(new Error('Email already exists'));

      try {
        await userService.createUser(userData);
        expect.fail('Deveria ter lançado erro');
      } catch (error) {
        expect(error).to.be.an('error');
        expect(error).to.exist;
      }
    });

    it('deve lançar erro ao cadastrar usuário com email inválido', async () => {
      const userData: CreateUserDTO = {
        name: 'João Silva',
        email: 'email-invalido',
        username: 'joaosilva',
        password: '123456'
      };

      try {
        await userService.createUser(userData);
        expect.fail('Deveria ter lançado erro');
      } catch (error) {
        expect(error).to.be.an('error');
        expect((error as Error).message).to.equal('Email inválido');
      }
    });

    it('deve lançar erro ao cadastrar senha que não atende aos requisitos de segurança (6 dígitos)', async () => {
      const userData: CreateUserDTO = {
        name: 'João Silva',
        email: 'joao@example.com',
        username: 'joaosilva',
        password: '12345'
      };

      try {
        await userService.createUser(userData);
        expect.fail('Deveria ter lançado erro');
      } catch (error) {
        expect(error).to.be.an('error');
        expect((error as Error).message).to.equal('Senha deve ter pelo menos 6 caracteres');
      }
    });

    it('deve lançar erro ao criar usuário com nome vazio', async () => {
      const userData: CreateUserDTO = {
        name: '',
        email: 'joao@example.com',
        username: 'joaosilva',
        password: '123456'
      };

      try {
        await userService.createUser(userData);
        expect.fail('Deveria ter lançado erro');
      } catch (error) {
        expect(error).to.be.an('error');
        expect((error as Error).message).to.equal('Nome do usuário é obrigatório');
      }
    });

    it('deve lançar erro ao criar usuário com username vazio', async () => {
      const userData: CreateUserDTO = {
        name: 'João Silva',
        email: 'joao@example.com',
        username: '',
        password: '123456'
      };

      try {
        await userService.createUser(userData);
        expect.fail('Deveria ter lançado erro');
      } catch (error) {
        expect(error).to.be.an('error');
        expect((error as Error).message).to.equal('Nome de usuário é obrigatório');
      }
    });
  });

  describe('Buscar usuário', () => {
    it('deve lançar erro ao buscar usuário com ID inválido', async () => {
      try {
        await userService.getUserById(0);
        expect.fail('Deveria ter lançado erro');
      } catch (error) {
        expect(error).to.be.an('error');
        expect((error as Error).message).to.equal('ID do usuário inválido');
      }
    });

    it('deve lançar erro ao buscar usuário com username vazio', async () => {
      try {
        await userService.getUserByUsername('');
        expect.fail('Deveria ter lançado erro');
      } catch (error) {
        expect(error).to.be.an('error');
        expect((error as Error).message).to.equal('Nome de usuário é obrigatório');
      }
    });

    it('deve retornar array ao buscar todos os usuários', async () => {
      repositoryStub.getAllUsers.resolves([]);
      
      const users = await userService.getAllUsers();
      expect(users).to.be.an('array');
    });
  });

  describe('Alterar usuário', () => {
    it('deve lançar erro ao tentar alterar usuário para senha inválida (menos que 6 dígitos)', async () => {
      const mockUser = {
        id: 1,
        name: 'João Silva',
        save: sinon.stub().resolves()
      };
      
      repositoryStub.getUserById.resolves(mockUser as any);
      
      const updateData: UpdateUserDTO = {
        password: '12345'
      };

      try {
        await userService.updateUser(1, updateData);
        expect.fail('Deveria ter lançado erro');
      } catch (error) {
        expect(error).to.be.an('error');
        expect((error as Error).message).to.equal('Senha deve ter pelo menos 6 caracteres');
      }
    });

    it('deve lançar erro ao tentar alterar email para email inválido', async () => {
      const mockUser = {
        id: 1,
        name: 'João Silva',
        save: sinon.stub().resolves()
      };
      
      repositoryStub.getUserById.resolves(mockUser as any);
      
      const updateData: UpdateUserDTO = {
        email: 'email-invalido'
      };

      try {
        await userService.updateUser(1, updateData);
        expect.fail('Deveria ter lançado erro');
      } catch (error) {
        expect(error).to.be.an('error');
        expect((error as Error).message).to.equal('Email inválido');
      }
    });

    it('deve lançar erro ao tentar alterar com ID inválido', async () => {
      const updateData: UpdateUserDTO = {
        name: 'Novo Nome'
      };

      try {
        await userService.updateUser(0, updateData);
        expect.fail('Deveria ter lançado erro');
      } catch (error) {
        expect(error).to.be.an('error');
        expect((error as Error).message).to.equal('ID do usuário inválido');
      }
    });
  });

  describe('Deletar usuário', () => {
    it('deve lançar erro ao tentar deletar com ID inválido', async () => {
      try {
        await userService.deleteUser(0);
        expect.fail('Deveria ter lançado erro');
      } catch (error) {
        expect(error).to.be.an('error');
        expect((error as Error).message).to.equal('ID do usuário inválido');
      }
    });
  });
});
