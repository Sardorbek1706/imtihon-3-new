import { Request, Response } from 'express';
import { CategoryService } from '../services/categories.service';

const categoryService = new CategoryService();

export const createCategory = async (req: Request, res: Response) => {
    try {
        const categoryData = req.body;
        const category = await categoryService.createCategory(categoryData);
        res.status(201).json({
            categoryId: category.id,
            message: 'Category created'
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getAllCategories = async (req: Request, res: Response) => {
    try {
        const categories = await categoryService.getAllCategories();
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getCategoryById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const category = await categoryService.getCategoryById(id);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateCategory = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const categoryData = req.body;
        const updatedCategory = await categoryService.updateCategory(id, categoryData);
        res.status(200).json({
            categoryId: updatedCategory.id,
            message: 'Category updated'
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteCategory = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await categoryService.deleteCategory(id);
        res.status(200).json({ message: 'Category deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};