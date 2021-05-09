import { IsEmail, Length} from "class-validator";
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    ColumnTypeUndefinedError,
    Index,
    CreateDateColumn,
    UpdateDateColumn,
    BeforeInsert
} from "typeorm";

import bcrypt from "bcrypt";
import { classToPlain, Exclude } from "class-transformer";

@Entity('users')
export class User extends BaseEntity{
    constructor(user: Partial<User>) {
        super()
        Object.assign(this, user);
    }
    @PrimaryGeneratedColumn()
    @Exclude()
    id: number;

    @Index()
    @IsEmail()
    @Column({ unique: true})
    email: string

    @Index()
    @Length(2, 25, {message: 'Username must be between 2 and 25 characters long'})
    @Column({ unique: true})
    username: string

    @Column()
    @Length(6, 64, {message: "The password must be between 6 and 64 characters long"})
    @Exclude()
    password: string

    @CreateDateColumn()
    createAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @BeforeInsert()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 6)
    }
    toJSON() {
        return classToPlain(this)
    }
}
