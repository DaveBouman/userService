import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { BaseEntity } from './baseEntity';

enum UserRole {
    ADMIN = "admin",
    USER = "user"
}

@Entity()
export default class User {

    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column({ nullable: true })
    providerKey!: string;

    @Column({ nullable: true })
    name!: string;

    @Column({ nullable: true })
    password!: string;

    @Column({ nullable: true })
    familyName!: string;

    @Column({ nullable: true })
    email!: string;

    @Column({ nullable: true })
    imageUrl!: string;

    @Column({ nullable: true })
    social!: string;

    @Column({
        type: "enum",
        enum: UserRole,
        default: UserRole.USER
    })
    role!: UserRole;
}