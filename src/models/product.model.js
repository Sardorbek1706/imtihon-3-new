import { v4 as uuidv4 } from 'uuid';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  quantity: number;
  status: 'available' | 'out of stock' | 'discontinued';
  createdAt: Date;
  updatedAt: Date;
  imageUrls: string[];
  tags: string[];
}

export class ProductModel implements Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  quantity: number;
  status: 'available' | 'out of stock' | 'discontinued';
  createdAt: Date;
  updatedAt: Date;
  imageUrls: string[];
  tags: string[];

  constructor(
    name: string,
    description: string,
    price: number,
    category: string,
    quantity: number,
    status: 'available' | 'out of stock' | 'discontinued',
    imageUrls: string[],
    tags: string[]
  ) {
    this.id = uuidv4();
    this.name = name;
    this.description = description;
    this.price = price;
    this.category = category;
    this.quantity = quantity;
    this.status = status;
    this.createdAt = new Date();
    this.updatedAt = new Date();
    this.imageUrls = imageUrls;
    this.tags = tags;
  }

  updateProduct(
    name?: string,
    description?: string,
    price?: number,
    category?: string,
    quantity?: number,
    status?: 'available' | 'out of stock' | 'discontinued',
    imageUrls?: string[],
    tags?: string[]
  ) {
    if (name) this.name = name;
    if (description) this.description = description;
    if (price) this.price = price;
    if (category) this.category = category;
    if (quantity) this.quantity = quantity;
    if (status) this.status = status;
    if (imageUrls) this.imageUrls = imageUrls;
    if (tags) this.tags = tags;
    this.updatedAt = new Date();
  }
}