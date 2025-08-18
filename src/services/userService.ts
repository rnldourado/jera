import { UserRepository } from "../repositories/userRepository";

export interface CreateUserDTO {
  name: string;
  username: string;
  email: string;
  password: string;
}

export interface UpdateUserDTO {
  name?: string;
  username?: string;
  email?: string;
  password?: string;
}

export class UserService {
  static getUserByUsername(username: any) {
      throw new Error('Method not implemented.');
  }
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async createUser(data: CreateUserDTO) {
    try {
      if (!data.name || data.name.trim().length === 0) {
        throw new Error("Nome do usuário é obrigatório");
      }

      if (!data.username || data.username.trim().length === 0) {
        throw new Error("Nome de usuário é obrigatório");
      }

      if (!data.email || data.email.trim().length === 0) {
        throw new Error("Email do usuário é obrigatório");
      }

      if (!data.password || data.password.length < 6) {
        throw new Error("Senha deve ter pelo menos 6 caracteres");
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(data.email)) {
        throw new Error("Email inválido");
      }

      const user = await this.userRepository.createUser(
        data.name,
        data.username,
        data.email,
        data.password
      );

      return user;
    } catch (error) {
      throw error;
    }
  }

  async getAllUsers() {
    try {
      return await this.userRepository.getAllUsers();
    } catch (error) {
      throw error;
    }
  }

  async getUserById(id: number) {
    try {
      if (!id || id <= 0) {
        throw new Error("ID do usuário inválido");
      }

      const user = await this.userRepository.getUserById(id);

      if (!user) {
        throw new Error("Usuário não encontrado");
      }

      return user;
    } catch (error) {
      throw error;
    }
  }

  async getUserByUsername(username: string) {
    try {
      if (!username || username.trim().length === 0) {
        throw new Error("Nome de usuário é obrigatório");
      }

      const user = await this.userRepository.getUserByUsername(username);

      if (!user) {
        throw new Error("Usuário não encontrado");
      }

      return user;
    } catch (error) {
      throw error;
    }
  }

  async updateUser(id: number, data: UpdateUserDTO) {
    try {
      if (!id || id <= 0) {
        throw new Error("ID do usuário inválido");
      }

      const user = await this.userRepository.getUserById(id);

      if (!user) {
        throw new Error("Usuário não encontrado");
      }

      if (data.name !== undefined && (!data.name || data.name.trim().length === 0)) {
        throw new Error("Nome do usuário não pode estar vazio");
      }

      if (data.username !== undefined && (!data.username || data.username.trim().length === 0)) {
        throw new Error("Nome de usuário não pode estar vazio");
      }

      if (data.email !== undefined) {
        if (!data.email || data.email.trim().length === 0) {
          throw new Error("Email do usuário não pode estar vazio");
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
          throw new Error("Email inválido");
        }
      }

      if (data.password !== undefined && data.password.length < 6) {
        throw new Error("Senha deve ter pelo menos 6 caracteres");
      }

      if (data.name !== undefined) user.name = data.name;
      if (data.username !== undefined) user.username = data.username;
      if (data.email !== undefined) user.email = data.email;
      if (data.password !== undefined) user.password = data.password;

      await user.save();
      return user;
    } catch (error) {
      throw error;
    }
  }

  async deleteUser(id: number) {
    try {
      if (!id || id <= 0) {
        throw new Error("ID do usuário inválido");
      }

      const user = await this.userRepository.getUserById(id);

      if (!user) {
        throw new Error("Usuário não encontrado");
      }

      await user.destroy();
      return { message: "Usuário deletado com sucesso" };
    } catch (error) {
      throw error;
    }
  }
}
