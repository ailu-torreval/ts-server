import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { TableDto } from './dto/table.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Table } from './entities/table.entity';
import { Merchant } from 'src/merchant/entities/merchant.entity';

@Injectable()
export class TableService {

  constructor(
    @InjectRepository(Table)
    private tableRepository: Repository<Table>,
    private merchantRepository: Repository<Merchant>,
  ) {}

  async create(createTableDto: TableDto): Promise<Table> {
    try {
      const {merchant_id, ...rest} = createTableDto;
      const merchant = await this.merchantRepository.findOne( { where: {id: merchant_id}});
      const table = this.tableRepository.create({
        merchant,
        ...rest});
      return await this.tableRepository.save(table);
    } catch(error) {
      throw new InternalServerErrorException('Error creating Table' + error);
    }
  }

  async findAll(): Promise<Table[]> {
    try {
      const tables = await this.tableRepository.find();
      return tables;
    } catch(error) {
      throw new InternalServerErrorException('Error fetching tables' + error );
    }
    }

  async findOne(id: number): Promise<Table> {
    try {
      const table = await this.tableRepository.findOne({where: {id}});
      if(table) {
        return table;
      } else {
        throw new InternalServerErrorException(`table with id ${id} not found`);
      }
    } catch(error) {
      throw new InternalServerErrorException('Error fetching table id' + id + error );
    }
  }

  async update(id: number, updateTableDto: TableDto): Promise<Table> {
    try {
      const table = await this.tableRepository.update(id, updateTableDto);
      if (table.affected === 1) {
        return this.tableRepository.findOne({where: { id }});
      }
    } catch(error) {
      throw new InternalServerErrorException('Error updating table' + error);
    }
  }

  async remove(id: number): Promise<any> {
    try {
      const deletedTable = await this.tableRepository.delete(id);
      if (deletedTable.affected === 1) {
        return { id: id, status: 'deleted' };
      } else {
        throw new NotFoundException(`Table with id ${id} not found`);
      }
    } catch(error) {
      throw new InternalServerErrorException(error);
    }  
  }
}
