import { v4 as uuidv4 } from 'uuid';

export interface Tag {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export class TagModel implements Tag {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(name: string) {
    this.id = uuidv4();
    this.name = name;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  update(name: string) {
    this.name = name;
    this.updatedAt = new Date();
  }
}