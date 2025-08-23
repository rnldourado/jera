import { User } from "../models/User";

export class UserRepository {
  async createUser(name: string, email: string, username: string, password: string) {
    return await User.create({
      name,
      username,
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

  async getUserByUsername(username: string) {
    return await User.findOne({
      where: { username: username }
    });
  }
}

