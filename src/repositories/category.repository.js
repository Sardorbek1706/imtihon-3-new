import { knex } from '../db/knex';
import { Category } from '../models/category.model';

export class CategoryRepository {
    async create(category: Category): Promise<Category> {
        const [newCategory] = await knex('categories').insert(category).returning('*');
        return newCategory;
    }

    async findAll(): Promise<Category[]> {
        return await knex('categories').select('*');
    }

    async findById(id: string): Promise<Category | null> {
        const category = await knex('categories').where({ id }).first();
        return category || null;
    }

    async update(id: string, category: Partial<Category>): Promise<Category | null> {
        const [updatedCategory] = await knex('categories').where({ id }).update(category).returning('*');
        return updatedCategory || null;
    }

    async delete(id: string): Promise<void> {
        await knex('categories').where({ id }).del();
    }
}