import { Request, Response } from 'express';
import ProductService from '../services/products.service';

class ProductsController {
    async createProduct(req: Request, res: Response) {
        try {
            const productData = req.body;
            const product = await ProductService.createProduct(productData);
            res.status(201).json({ productId: product.id, message: 'Product created' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getAllProducts(req: Request, res: Response) {
        try {
            const products = await ProductService.getAllProducts();
            res.status(200).json(products);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getProductById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const product = await ProductService.getProductById(id);
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }
            res.status(200).json(product);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async updateProduct(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const productData = req.body;
            const updatedProduct = await ProductService.updateProduct(id, productData);
            if (!updatedProduct) {
                return res.status(404).json({ message: 'Product not found' });
            }
            res.status(200).json({ id: updatedProduct.id, message: 'Product updated' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async deleteProduct(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const deleted = await ProductService.deleteProduct(id);
            if (!deleted) {
                return res.status(404).json({ message: 'Product not found' });
            }
            res.status(200).json({ message: 'Product deleted' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

export default new ProductsController();