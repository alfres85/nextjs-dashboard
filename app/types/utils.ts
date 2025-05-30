export type NonEmptyArray<T> = [T, ...T[]];

export type InvoiceWithCustomer = {
  id: string;
  name: string;
  image_url: string;
  email: string;
  amount: string;
};

export type InvoiceStatus = 'pending' | 'paid';
