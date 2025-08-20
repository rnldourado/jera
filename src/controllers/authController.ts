import { Request, Response } from 'express';
import { comparePassword, generateToken } from '../utils/auth';
import { UserService } from '../services/userService'; // Supondo que você já tem essa função

export class AuthController {
  private userService: UserService;
  constructor() {
    this.userService = new UserService();
  }
  login = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    try {
      const user = await this.userService.getUserByUsername(username);
      if (!user) {
        res.status(400).json({ message: 'Invalid username or password' });
      }

      const isPasswordValid = await comparePassword(password, user.password);
      if (!isPasswordValid) {
        res.status(400).json({ message: 'Invalid username or password' });
      }

      const token = generateToken(user.id, user.username);

      res.status(200).json({ message: 'Login successful', token });
    } catch (err) {
      res.status(500).json({ message: 'Error logging in', error: (err as Error).message });
    }
  };
}