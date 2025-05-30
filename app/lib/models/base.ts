import { PrismaClient } from '@/app/generated/prisma';

class BaseModel {
  tableName: string;
  client: PrismaClient;

  constructor(tableName: string, client: PrismaClient) {
    this.tableName = tableName;
    this.client = client;
  }

  async findAll() {
    return (this.client as any)[this.tableName].findMany();
  }

  async findById(id: string) {
    return (this.client as any)[this.tableName].findUnique({ where: { id } });
  }

  async create(data: any) {
    return (this.client as any)[this.tableName].create({ data });
  }

  async countAll(): Promise<number> {
    return (this.client as any)[this.tableName].count();
  }
}

export default BaseModel;
