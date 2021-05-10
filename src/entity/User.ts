import { IsEmail, Length} from "class-validator";
import {
    Entity as TOEntity,
    Column,
    Index,
    BeforeInsert,
    OneToMany
} from "typeorm";

import bcrypt from "bcrypt";
import { Exclude } from "class-transformer";

import Entity from './Entity'
import Post from './Post'

@TOEntity('users')
export default class User extends Entity {
    constructor(user: Partial<User>) {
        super()
        Object.assign(this, user);
    }

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

    @OneToMany(() => Post, (post) => post.user)
    posts: Post[]

    @BeforeInsert()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 6)
    }
}
