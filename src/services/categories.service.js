import { Category } from '../models/category.model';
import { CategoryRepository } from '../repositories/category.repository';

class CategoryService {
    private categoryRepository: CategoryRepository;

    constructor() {
        this.categoryRepository = new CategoryRepository();
    }

    async createCategory(name: string, parentId?: string): Promise<Category> {
        const newCategory = new Category();
        newCategory.name = name;
        newCategory.parentId = parentId;
        return await this.categoryRepository.create(newCategory);
    }

    async getAllCategories(): Promise<Category[]> {
        return await this.categoryRepository.findAll();
    }

    async getCategoryById(id: string): Promise<Category | null> {
        return await this.categoryRepository.findById(id);
    }

    async updateCategory(id: string, name: string, parentId?: string): Promise<Category | null> {
        const categoryToUpdate = await this.categoryRepository.findById(id);
        if (!categoryToUpdate) {
            return null;
        }
        categoryToUpdate.name = name;
        categoryToUpdate.parentId = parentId;
        return await this.categoryRepository.update(categoryToUpdate);
    }

    async deleteCategory(id: string): Promise<boolean> {
        return await this.categoryRepository.delete(id);
    }
}

export default new CategoryService();