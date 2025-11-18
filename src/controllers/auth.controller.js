import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';

const authService = new AuthService();

export const signup = async (req: Request, res: Response) => {
    try {
        const user = await authService.register(req.body);
        res.status(201).json({
            message: 'User created',
            userId: user.id,
            otpSent: true
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const signin = async (req: Request, res: Response) => {
    try {
        const { accessToken, refreshToken } = await authService.login(req.body);
        res.json({ accessToken, refreshToken });
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};

export const getCurrentUser = async (req: Request, res: Response) => {
    try {
        const user = await authService.getCurrentUser(req.user.id);
        res.json(user);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const logout = async (req: Request, res: Response) => {
    try {
        await authService.logout(req.user.id);
        res.json({ message: 'Logout successful' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const refreshToken = async (req: Request, res: Response) => {
    try {
        const { accessToken, refreshToken } = await authService.refresh(req.body.refreshToken);
        res.json({ accessToken, refreshToken });
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};