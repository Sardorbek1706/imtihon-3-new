import { User } from '../models/user.model';
import knex from '../db/knex';

class UserRepository {
    async createUser(userData: Partial<User>): Promise<User> {
        const [user] = await knex('users').insert(userData).returning('*');
        return user;
    }

    async getUserById(userId: string): Promise<User | null> {
        const user = await knex('users').where({ id: userId }).first();
        return user || null;
    }

    async getUserByEmail(email: string): Promise<User | null> {
        const user = await knex('users').where({ email }).first();
        return user || null;
    }

    async updateUser(userId: string, userData: Partial<User>): Promise<User> {
        const [user] = await knex('users').where({ id: userId }).update(userData).returning('*');
        return user;
    }

    async deleteUser(userId: string): Promise<void> {
        await knex('users').where({ id: userId }).del();
    }

    async getAllUsers(): Promise<User[]> {
        return await knex('users').select('*');
    }
}

export default new UserRepository();