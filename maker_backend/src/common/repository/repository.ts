// Prisma
import { PrismaClient } from '@prisma/client';
import { QueryDto } from 'src/common/dtos/query.dto';

const prisma = new PrismaClient();

export class Repository<T, U> {
  constructor(private readonly entity: string) {}

  /**
   * @description 找到所有實體
   * @param conditions?
   * @returns T[]
   */
  async findAll(conditions: {} = {}): Promise<T[]> {
    return await prisma[this.entity].findMany(conditions);
  }

  /**
   * @description 依條件找到實體並分頁
   * @param condition
   * @param where
   * @param include?
   * @returns { items: T[], data_count: number }
   */
  async findByCondition(
    condition: QueryDto,
    where: {},
    include: {} = {},
  ): Promise<{ items: T[]; data_count: number }> {
    const { page, limit, orderBy, sortOrder, menu_type_id, level } = condition;

    let items = await prisma[this.entity].findMany({
      where,
      take: limit,
      skip: (page - 1) * limit,
      orderBy: {
        [orderBy]: sortOrder,
      },
      include,
    });

    const data_count = await prisma[this.entity].count({ where });

    return { items, data_count };
  }

  /**
   * @description 依 id 找到實體
   * @param id
   * @param include?
   * @returns T
   */
  async findById(id: number, include: {} = {}): Promise<T> {
    return await prisma[this.entity].findUnique({
      where: { id },
      include,
    });
  }

  /**
   * @description 依條件找到實體
   * @param where
   * @param include?
   * @returns T
   */
  async findOne(where: {}, include: {} = {}): Promise<T> {
    return await prisma[this.entity].findUnique({ where, include });
  }

  /**
   * @description 取得所有選項
   * @returns any
   */
  async getOptions(): Promise<any> {
    return 'getOptions';
  }

  /**
   * @description 建立或更新實體
   * @param data
   * @param id?
   * @returns T
   */
  async createOrUpdate(data: U): Promise<T>;
  async createOrUpdate(data: Partial<U>, id: number): Promise<T>;
  async createOrUpdate(
    data: U,
    id: any,
    has_id: boolean,
    column?: string,
  ): Promise<T>;

  async createOrUpdate(
    data: U,
    id = 0,
    has_id = true,
    column?: string,
  ): Promise<T> {
    let result: T;

    if (has_id) {
      result = await prisma[this.entity].upsert({
        where: { id },
        update: data,
        create: data,
      });
    } else {
      result = await prisma[this.entity].upsert({
        where: { [column]: id },
        update: data,
        create: data,
      });
    }

    return result;
  }

  /**
   * @description 刪除多個實體
   * @param ids[]
   * @returns void
   */
  async deleteMany(ids: number[]): Promise<void> {
    await prisma[this.entity].deleteMany({
      where: { id: { in: ids } },
    });
  }

  /**
   * @description 刪除實體
   * @param id
   * @returns void
   */
  async delete(id: number): Promise<void> {
    id = Number(id);
    const entity = await this.findById(id);

    if (!entity) return;

    await prisma[this.entity].delete({
      where: { id },
    });
  }

  /**
   * @description 斷開所有關聯
   * @param id
   * @param relation
   * @returns void
   */
  async disconnectAllRelations(id: number, relation: string): Promise<void> {
    await prisma[this.entity].update({
      where: { id },
      data: { [relation]: { set: [] } },
    });
  }

  /**
   * @description 字串取代所有資料欄位
   * @param string1
   * @param string2
   * @returns void
   */
  async replaceAll(string1: string, string2: string): Promise<void> {
    const tables = await prisma.$queryRaw<Array<{ table_name: string }>>`
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public'
    `;

    for (const { table_name } of tables) {
      const columns = await prisma.$queryRaw<Array<{ column_name: string }>>`
        SELECT column_name
        FROM information_schema.columns
        WHERE table_name = ${table_name}
      `;

      for (const { column_name } of columns) {
        await prisma.$executeRaw`
          UPDATE ${table_name}
          SET ${column_name} = REPLACE(${column_name}, ${string1}, ${string2})
          WHERE ${column_name} LIKE ${`%${string1}%`}
        `;
      }
    }
  }

  /**
   * @description 新增多個實體
   * @param data
   * @returns void
   */
  async createMany(data: U[]): Promise<void> {
    await prisma[this.entity].createMany({ data });
  }

  /**
   * @description SQL 查詢 (標籤函數)
   * @param query
   * @returns any
   * @example const result = super.queryRaw`SELECT * FROM users WHERE id = $1`
   */
  async queryRaw(query: TemplateStringsArray, ...values: any[]): Promise<any> {
    return await prisma.$queryRaw(query, ...values);
  }

  /**
   * @description 依條件取得實體數量
   * @param where
   * @returns number
   */
  async count(where: {}): Promise<number> {
    return await prisma[this.entity].count({ where });
  }

  /**
   * @description 找出第一個實體
   * @param where
   * @returns T
   */
  async findFirst(where: {} = {}, include: {} = {}): Promise<T> {
    return await prisma[this.entity].findFirst({ where, include });
  }

  /**
   * @description 新增實體
   * @param data
   * @returns T
   */
  async create(data: U): Promise<T> {
    return await prisma[this.entity].create({ data });
  }

  /**
   * @description 更新實體
   * @param id
   * @param data
   * @returns T
   */
  async update(id: number, data: Partial<U>): Promise<T> {
    return await prisma[this.entity].update({
      where: { id },
      data,
    });
  }

  /**
   * @description 依欄位找到實體
   * @returns T
   */
  async findByColumn(
    column: string,
    value: any,
    include: Object = {},
  ): Promise<T> {
    return await prisma[this.entity].findUnique({
      where: { [column]: value },
      include,
    });
  }

  /**
   * @description 刪掉所有實體
   * @returns void
   */
  async deleteAll(): Promise<void> {
    await prisma[this.entity].deleteMany({});
  }

  /**
   * @description 取得欄位最大值
   * @param column
   * @returns number
   */
  async getMax(column: string): Promise<number> {
    return (await prisma[this.entity].aggregate({ _max: { [column]: true } }))
      ._max[column];
  }
}
