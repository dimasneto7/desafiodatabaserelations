import { query } from "express";
import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export default class AddCustomersIdToOrders1617112985546 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'orders',
            new TableColumn({
                name: 'customer_id',
                type: 'uuid',
                isNullable: true,
            }),
        );

        await queryRunner.createForeignKey(
            'orders',
            new TableForeignKey({
              name: 'OrderCustomers',
              columnNames: ['customer_id'],
              referencedColumnNames: ['id'],
              referencedTableName: 'customers',
              onDelete: 'SET NULL',
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('orders', 'OrderCustomers');

        await queryRunner.dropColumn('orders', 'customer_id');     
    }

}
