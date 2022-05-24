import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert, BeforeUpdate, ManyToOne, Generated } from 'typeorm';
import User from './user';
import { BaseEntity as Base } from 'typeorm';

export interface BaseEntity {
    id: number;
    uuid: string;
    createdBy: User;
    updatedBy: User;
    createdOn: Date;
    updatedOn: Date;
    version: number;
}

@Entity()
export abstract class BaseEntity extends Base {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    @Generated("uuid")
    uuid!: string;

    @Column({ nullable: true })
    createdOn!: Date;

    @Column({ nullable: true })
    updatedOn!: Date;

    @Column({ default: 1 })
    version!: number;

    @BeforeInsert()
    insertDate() {
        this.updatedOn = new Date();
        this.createdOn = new Date();
    }

    @BeforeUpdate()
    updateDate() {
        this.updatedOn = new Date();
        this.version++;
    }
}