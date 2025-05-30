import BaseModel from "./base";
import prisma from '@/app/lib/prisma';

export default class UserModel extends BaseModel {
  constructor() {
    super('user', prisma);
  }
}
