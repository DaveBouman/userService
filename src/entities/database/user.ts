import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany, JoinTable } from "typeorm";
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
    username!: string;

    @Column({ nullable: true })
    password!: string;

    @Column({ nullable: true })
    imageUrl!: string;

    @Column({ nullable: true })
    bio!: string;

    @Column({ nullable: true, default: "user" })
    role!: string;

    @ManyToMany(() => User, following => following.follows, {
    })
    @JoinTable()
    following!: string[]

    @ManyToMany(() => User, follows => follows.following)
    @JoinTable()
    follows!: string[]
}

