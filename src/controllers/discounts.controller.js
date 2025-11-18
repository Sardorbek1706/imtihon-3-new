import { Request, Response } from 'express';
import { DiscountService } from '../services/discounts.service';

const discountService = new DiscountService();

export const createDiscount = async (req: Request, res: Response) => {
    try {
        const discount = await discountService.createDiscount(req.body);
        res.status(201).json({ discountId: discount.id, message: 'Discount created' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getAllDiscounts = async (req: Request, res: Response) => {
    try {
        const discounts = await discountService.getAllDiscounts();
        res.status(200).json(discounts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getDiscountById = async (req: Request, res: Response) => {
    try {
        const discount = await discountService.getDiscountById(req.params.id);
        if (!discount) {
            return res.status(404).json({ message: 'Discount not found' });
        }
        res.status(200).json(discount);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateDiscount = async (req: Request, res: Response) => {
    try {
        const updatedDiscount = await discountService.updateDiscount(req.params.id, req.body);
        res.status(200).json({ discountId: updatedDiscount.id, message: 'Discount updated' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteDiscount = async (req: Request, res: Response) => {
    try {
        await discountService.deleteDiscount(req.params.id);
        res.status(200).json({ message: 'Discount deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};