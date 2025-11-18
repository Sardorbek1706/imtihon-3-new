import { Discount } from '../models/discount.model';
import { DiscountRepository } from '../repositories/discount.repository';

class DiscountService {
    private discountRepository: DiscountRepository;

    constructor() {
        this.discountRepository = new DiscountRepository();
    }

    async createDiscount(discountData: Partial<Discount>): Promise<Discount> {
        const discount = await this.discountRepository.create(discountData);
        return discount;
    }

    async getAllDiscounts(): Promise<Discount[]> {
        const discounts = await this.discountRepository.findAll();
        return discounts;
    }

    async getDiscountById(id: string): Promise<Discount | null> {
        const discount = await this.discountRepository.findById(id);
        return discount;
    }

    async updateDiscount(id: string, discountData: Partial<Discount>): Promise<Discount | null> {
        const updatedDiscount = await this.discountRepository.update(id, discountData);
        return updatedDiscount;
    }

    async deleteDiscount(id: string): Promise<void> {
        await this.discountRepository.delete(id);
    }
}

export default new DiscountService();