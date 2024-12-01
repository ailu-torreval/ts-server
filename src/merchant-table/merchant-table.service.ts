import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { MerchantTableDto } from './dto/merchant-table.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Merchant } from 'src/merchant/entities/merchant.entity';
import { Repository } from 'typeorm';
import { MerchantTable } from './entities/merchant-table.entity';

@Injectable()
export class MerchantTableService {

  constructor(
    @InjectRepository(Merchant)
    private merchantRepository: Repository<Merchant>,
    @InjectRepository(MerchantTable)
    private tableRepository: Repository<MerchantTable>,
  ) {}

  async create(createMerchantTableDto: MerchantTableDto): Promise<MerchantTable> {
    try {
      const { merchant_id, ...rest } = createMerchantTableDto;
      let table: Partial<MerchantTable> = rest;
      table.merchant = await this.merchantRepository.findOne({where: {id: merchant_id}});
      const createdTable = await this.tableRepository.create(table);
      return await this.tableRepository.save(createdTable);
    } catch (error) {
      throw new InternalServerErrorException(
        `Error creating table, ${error}`,
      );
    }
  }

  async findAll(): Promise<MerchantTable[]> {
    try {
      const tables = await this.tableRepository.find();
      return tables;
    } catch (error) {
      throw new InternalServerErrorException(
        `Error fetching tables, ${error}`,
      );  
    }
  }

  async findOne(id: number): Promise<MerchantTable> {
    try {
      const table = await this.tableRepository.findOne({where: {id}});
      return table;
    } catch (error) {
      throw new InternalServerErrorException(
        `Error fetching table, ${error}`,
      );
    }
  }

  async update(id: number, updateMerchantTableDto: MerchantTableDto): Promise<MerchantTable> { 
    try {
      const updatedTable = await this.tableRepository.update(id, updateMerchantTableDto);
      if (updatedTable.affected === 1) {
        return this.tableRepository.findOne({where: {id}});
      }
    } catch (error) {
      throw new NotFoundException(`Merchant with id ${id} not found`);
    }
  }

  async remove(id: number): Promise<any> {
    try {
      const deletedTable = await this.tableRepository.delete(id);
      if (deletedTable.affected === 1) {
        return {message: 'Table deleted'};
      } else {
        throw new NotFoundException(`table with id ${id} not found`);
      }
    } catch(error) {
      throw new InternalServerErrorException(error);
    }
  }
}
