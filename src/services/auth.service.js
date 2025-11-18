import { User } from '../models/user.model';
import { UserRepository } from '../repositories/user.repository';
import { generateToken } from '../utils/jwt';
import { hashPassword, comparePassword } from '../utils/validators';

class AuthService {
    private userRepository: UserRepository;

    constructor() {
        this.userRepository = new UserRepository();
    }

    async register(userData: Partial<User>): Promise<{ userId: string; message: string }> {
        const hashedPassword = await hashPassword(userData.password);
        const newUser = await this.userRepository.createUser({ ...userData, password: hashedPassword });
        return { userId: newUser.id, message: 'User created' };
    }

    async login(email: string, password: string): Promise<{ accessToken: string; refreshToken: string }> {
        const user = await this.userRepository.findUserByEmail(email);
        if (!user || !(await comparePassword(password, user.password))) {
            throw new Error('Invalid credentials');
        }
        const accessToken = generateToken(user.id, user.role);
        const refreshToken = generateToken(user.id, user.role, '7d'); // Example: refresh token valid for 7 days
        return { accessToken, refreshToken };
    }

    async getCurrentUser(userId: string): Promise<User> {
        return await this.userRepository.findUserById(userId);
    }
}

export default new AuthService();