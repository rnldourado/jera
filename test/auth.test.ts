import { expect } from 'chai';
import { describe, it } from 'mocha';
import { hashPassword, comparePassword, generateToken, verifyToken } from '../src/utils/auth';

describe('Auth Utils', () => {
  describe('hashPassword', () => {
    it('deve gerar um hash da senha', async () => {
      const password = 'minhasenha123';
      const hash = await hashPassword(password);
      
      expect(hash).to.be.a('string');
      expect(hash).to.not.equal(password);
      expect(hash.length).to.be.greaterThan(0);
    });

    it('deve gerar hashes diferentes para a mesma senha', async () => {
      const password = 'minhasenha123';
      const hash1 = await hashPassword(password);
      const hash2 = await hashPassword(password);
      
      expect(hash1).to.not.equal(hash2);
    });
  });

  describe('comparePassword', () => {
    it('deve retornar true para senha correta', async () => {
      const password = 'minhasenha123';
      const hash = await hashPassword(password);
      const isValid = await comparePassword(password, hash);
      
      expect(isValid).to.be.true;
    });

    it('deve retornar false para senha incorreta', async () => {
      const password = 'minhasenha123';
      const wrongPassword = 'senhaerrada';
      const hash = await hashPassword(password);
      const isValid = await comparePassword(wrongPassword, hash);
      
      expect(isValid).to.be.false;
    });
  });

  describe('generateToken', () => {
    it('deve gerar um token JWT válido', () => {
      const userId = 1;
      const username = 'testuser';
      const token = generateToken(userId, username);
      
      expect(token).to.be.a('string');
      expect(token.split('.')).to.have.lengthOf(3); // JWT tem 3 partes
    });
  });

  describe('verifyToken', () => {
    it('deve verificar e decodificar um token válido', () => {
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
