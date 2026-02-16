export interface User {
  id: string;
  username: string;
  password?: string;
  email: string;
  fullName?: string;
  role: 'admin' | 'user' | 'manager';
  companyId?: string;
  createdAt?: Date;
}

export interface Product {
  id: string;
  code: string;
  name: string;
  price: number;
  cost: number;
  stock: number;
  category: string;
  description?: string;
  image?: string;
}

export interface Company {
  id: string;
  name: string;
  taxNumber: string;
  address: string;
  phone: string;
  email?: string;
  logo?: string;
  employees: Employee[];
  createdAt?: Date;
}

export interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  nationalId: string;
  salary: number;
  position: string;
  phoneNumber?: string;
  email?: string;
  hireDate?: Date;
  isActive?: boolean;
}

export interface Transaction {
  id: string;
  date: Date;
  type: 'income' | 'expense' | 'salary';
  amount: number;
  description: string;
  category: string;
  reference?: string;
  companyId?: string;
  userId?: string;
}

export interface Invoice {
  id: string;
  number: string;
  date: Date;
  dueDate: Date;
  customerName: string;
  customerTaxId?: string;
  items: InvoiceItem[];
  subtotal: number;
  taxRate: number;
  taxAmount: number;
  discount: number;
  total: number;
  status: 'draft' | 'sent' | 'paid' | 'overdue';
  paidAmount: number;
}

export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  price: number;
  taxRate: number;
  discount: number;
  total: number;
}

export interface Report {
  id: string;
  name: string;
  type: 'profit-loss' | 'balance' | 'sales' | 'tax';
  date: Date;
  data: any;
}