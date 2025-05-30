import BaseModel from "./base";
import prisma from '@/app/lib/prisma';

export default class  CustomerModel extends BaseModel {
  constructor() {
    super('customer', prisma);
  }
}
