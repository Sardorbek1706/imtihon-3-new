import { Product } from '../models/product.model';
import { ProductRepository } from '../repositories/product.repository';

class ProductService {
    private productRepository: ProductRepository;

    constructor() {
        this.productRepository = new ProductRepository();
    }

    async createProduct(productData: Partial<Product>): Promise<Product> {
        const newProduct = await this.productRepository.create(productData);
        return newProduct;
    }

    async getAllProducts(): Promise<Product[]> {
        const products = await this.productRepository.findAll();
        return products;
    }

    async getProductById(productId: string): Promise<Product | null> {
        const product = await this.productRepository.findById(productId);
        return product;
    }

    async updateProduct(productId: string, productData: Partial<Product>): Promise<Product | null> {
        const updatedProduct = await this.productRepository.update(productId, productData);
        return updatedProduct;
    }

    async deleteProduct(productId: string): Promise<void> {
        await this.productRepository.delete(productId);
    }
}

export default new ProductService();