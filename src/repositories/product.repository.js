import { Product } from '../models/product.model';
import knex from '../db/knex';

class ProductRepository {
    async create(productData: Partial<Product>): Promise<Product> {
        const [product] = await knex('products').insert(productData).returning('*');
        return product;
    }

    async findAll(): Promise<Product[]> {
        return await knex('products').select('*');
    }

    async findById(id: string): Promise<Product | null> {
        const product = await knex('products').where({ id }).first();
        return product || null;
    }

    async update(id: string, productData: Partial<Product>): Promise<Product | null> {
        const [product] = await knex('products').where({ id }).update(productData).returning('*');
        return product || null;
    }

    async delete(id: string): Promise<void> {
        await knex('products').where({ id }).del();
    }
}

export default new ProductRepository();