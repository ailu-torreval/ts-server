import { Merchant } from "src/merchant/entities/merchant.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class MerchantTable {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    capacity: number;

    @Column()
    table_code: string;

    @Column({ default: true })
    is_active: boolean;

    @ManyToOne(() => Merchant, (merchant) => merchant.merchant_tables)
    merchant: Merchant;

    constructor(
        capacity: number,
        table_code: string,
        merchant: Merchant,
        is_active: boolean
    ) {
        this.capacity = capacity;
        this.table_code = table_code;
        this.merchant = merchant;
        this.is_active = is_active;
    }
}
