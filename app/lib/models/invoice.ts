import BaseModel from './base';
import prisma from '@/app/lib/prisma';
import { formatCurrency } from '../utils';
import { InvoiceStatus, InvoiceWithCustomer } from '@/app/types/utils';

export default class InvoiceModel extends BaseModel {
  constructor() {
    super('invoice', prisma);
  }

  async getInvoicesWithCustomer(
    skip: number = 0,
    take: number = 10
  ): Promise<InvoiceWithCustomer[]> {
    const invoicesRaw = await this.client.invoice.findMany({
      include: {
        customer: true,
      },
      skip,
      take,
    });

    return invoicesRaw.map(({ id, amount, customer: { name, email, image_url } }) => ({
      id,
      name,
      image_url,
      email,
      amount: formatCurrency(amount),
    }));
  }
  async getInvoiceSum(status: InvoiceStatus): Promise<number> {
    const result = await this.client.invoice.aggregate({
      _sum: {
        amount: true,
      },
      where: {
        status,
      },
    });
    return result._sum?.amount || 0;
  }
}
