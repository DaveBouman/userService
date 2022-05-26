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

    @Column({ nullable: true, default: "Je hebt nog geen bio gemaakt" })
    bio!: string;

    @Column({ nullable: true, default: "user" })
    role!: string;

    @ManyToMany(() => User, following => following.follows, {
        orphanedRowAction: 'delete'
    })
    @JoinTable()
    following!: User[];

    @ManyToMany(() => User, follows => follows.following, {
        orphanedRowAction: 'delete'
    })
    @JoinTable()
    follows!: User[];
}

