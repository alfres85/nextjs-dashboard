import BaseModel from './base';
import prisma from '@/app/lib/prisma';

export default class RevenueModel extends BaseModel {
  constructor() {
    super('revenue', prisma);
  }
}
