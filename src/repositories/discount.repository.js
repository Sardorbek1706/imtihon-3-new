import { knex } from '../db/knex';
import { Discount } from '../models/discount.model';

export class DiscountRepository {
    async createDiscount(discountData: Discount): Promise<Discount> {
        const [discount] = await knex('discounts').insert(discountData).returning('*');
        return discount;
    }

    async getAllDiscounts(): Promise<Discount[]> {
        return await knex<Discount>('discounts').select('*');
    }

    async getDiscountById(id: string): Promise<Discount | null> {
        const discount = await knex<Discount>('discounts').where({ id }).first();
        return discount || null;
    }

    async updateDiscount(id: string, discountData: Partial<Discount>): Promise<Discount | null> {
        const [discount] = await knex<Discount>('discounts').where({ id }).update(discountData).returning('*');
        return discount || null;
    }

    async deleteDiscount(id: string): Promise<void> {
        await knex('discounts').where({ id }).del();
    }
}