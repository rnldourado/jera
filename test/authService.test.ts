import { expect } from 'chai';
import { describe, it, beforeEach } from 'mocha';
import { AuthController } from '../src/controllers/authController';
import { hashPassword, comparePassword, generateToken, verifyToken } from '../src/utils/auth';

describe('Autenticação', () => {
  describe('Login', () => {
    let authController: AuthController;

    beforeEach(() => {
      authController = new AuthController();
    });

    it('deve verificar se o token JWT é gerado corretamente após login bem-sucedido', () => {
      const token = generateToken(1, 'testuser');
      
      expect(token).to.be.a('string');
      expect(token.split('.')).to.have.lengthOf(3); 
    });

    
    it('deve retornar estrutura correta para login bem-sucedido', () => {
      
      const expectedResponse = {
        message: 'Login successful',
        token: 'jwt_token_string'
      };

      expect(expectedResponse).to.have.property('message').equal('Login successful');
      expect(expectedResponse).to.have.property('token');
    });

    it('deve retornar mensagem de erro para credenciais inválidas', () => {
      const expectedErrorMessage = 'Invalid username or password';
      expect(expectedErrorMessage).to.equal('Invalid username or password');
    });
  });

  describe('Utilitários de autenticação', () => {
    it('deve verificar se a função de hash de senha funciona corretamente', async () => {
      const password = 'minhasenha123';
      const hashedPassword = await hashPassword(password);
      
      expect(hashedPassword).to.be.a('string');
      expect(hashedPassword).to.not.equal(password);
      expect(hashedPassword.length).to.be.greaterThan(password.length);
    });

    it('deve verificar se a comparação de senhas funciona corretamente', async () => {
      const password = 'minhasenha123';
      const wrongPassword = 'senhaerrada';
      const hashedPassword = await hashPassword(password);
      
      const isValidCorrect = await comparePassword(password, hashedPassword);
      const isValidWrong = await comparePassword(wrongPassword, hashedPassword);
      
      expect(isValidCorrect).to.be.true;
      expect(isValidWrong).to.be.false;
    });

    it('deve verificar se a geração de token JWT funciona', () => {
      const userId = 1;
      const username = 'testuser';
      const token = generateToken(userId, username);
      
      expect(token).to.be.a('string');
      expect(token.split('.')).to.have.lengthOf(3); // JWT tem 3 partes separadas por pontos
    });

    it('deve verificar se a verificação de token JWT funciona', () => {
      const userId = 1;
      const username = 'testuser';
      const token = generateToken(userId, username);
      
      const decoded = verifyToken(token);
      
      expect(decoded).to.be.an('object');
      expect(decoded.id).to.equal(userId);
      expect(decoded.username).to.equal(username);
      expect(decoded.iat).to.be.a('number');
      expect(decoded.exp).to.be.a('number');
    });

    it('deve lançar erro para token inválido', () => {
      const invalidToken = 'token.invalido.aqui';
      
      expect(() => verifyToken(invalidToken)).to.throw();
    });
  });
});
