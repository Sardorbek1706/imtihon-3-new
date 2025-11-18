import { v4 as uuidv4 } from 'uuid';

export interface Category {
  id: string;
  name: string;
  parentId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export class CategoryModel implements Category {
  id: string;
  name: string;
  parentId?: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(name: string, parentId?: string) {
    this.id = uuidv4();
    this.name = name;
    this.parentId = parentId;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  update(name: string, parentId?: string) {
    this.name = name;
    this.parentId = parentId;
    this.updatedAt = new Date();
  }
}