import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { DataSource, DataSourceOptions } from "typeorm";
import * as dotenv from 'dotenv';
dotenv.config();
  
export const dbConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    // FOR PRODUCTION
    // url: process.env.DATABASE_URL,
    // FOR DEVELOPMENT
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    // END DEVELOPMENT
    synchronize: true,
    entities: [__dirname + '/../dist/**/*.entity{.ts,.js}'], // Adjusted path
    migrations: [__dirname + '/../dist/src/migrations/*{.ts,.js}'], // Adjusted path
    // FOR PRODUCTION
    // ssl: {
    //     rejectUnauthorized: false,
    //   },
}

const dataSource = new DataSource(dbConfig as DataSourceOptions);
export default dataSource;