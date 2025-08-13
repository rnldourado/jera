import { User } from "../models/User";

export class UserRepository {
  async createUser(name: string, email: string, password: string) {
    return await User.create({
      name,
      email,
      password
    });
  }

  async getAllUsers() {
    return await User.findAll();
  }

  async getUserById(id: number) {
    return await User.findByPk(id);
  }
}

