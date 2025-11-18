import { v4 as uuidv4 } from 'uuid';

export interface User {
  id: string;
  email: string;
  username: string;
  password: string;
  role: 'user' | 'admin' | 'superadmin';
  status: 'active' | 'inactive';
  createdAt: Date;
  updatedAt: Date;
}

export class UserModel implements User {
  id: string;
  email: string;
  username: string;
  password: string;
  role: 'user' | 'admin' | 'superadmin';
  status: 'active' | 'inactive';
  createdAt: Date;
  updatedAt: Date;

  constructor(email: string, username: string, password: string, role: 'user' | 'admin' | 'superadmin') {
    this.id = uuidv4();
    this.email = email;
    this.username = username;
    this.password = password; // Note: Password should be hashed before storing
    this.role = role;
    this.status = 'active';
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  update(updatedData: Partial<Omit<User, 'id' | 'createdAt' | 'updatedAt'>>) {
    Object.assign(this, updatedData);
    this.updatedAt = new Date();
  }
}