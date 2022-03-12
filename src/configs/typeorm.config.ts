import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import * as config from 'config';

const dbConfig = config.get('db');

export const typeORMConfig : TypeOrmModuleOptions = {
  type: dbConfig.type,
  url: process.env.DATABASE_URL,
  autoLoadEntities: true,
  synchronize: dbConfig.synchronize
}
