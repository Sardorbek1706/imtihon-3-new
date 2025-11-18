import { v4 as uuidv4 } from 'uuid';

export interface Discount {
  id: string;
  productId: string;
  discountPercent: number;
  startDate: Date;
  endDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

export class DiscountModel implements Discount {
  id: string;
  productId: string;
  discountPercent: number;
  startDate: Date;
  endDate: Date;
  createdAt: Date;
  updatedAt: Date;

  constructor(productId: string, discountPercent: number, startDate: Date, endDate: Date) {
    this.id = uuidv4();
    this.productId = productId;
    this.discountPercent = discountPercent;
    this.startDate = startDate;
    this.endDate = endDate;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  updateDiscount(discountPercent: number, startDate: Date, endDate: Date) {
    this.discountPercent = discountPercent;
    this.startDate = startDate;
    this.endDate = endDate;
    this.updatedAt = new Date();
  }
}