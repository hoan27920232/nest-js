/* eslint-disable */

import { BeforeInsert, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { UserRO } from "./user.dto";
@Entity('user')
export class UserEntity {
    @PrimaryGeneratedColumn('uuid') id: string;

    @CreateDateColumn() created: Date;
    @Column({
        type: 'text',
        unique: true
    })
    username: string;
    @Column('text')
    password: string;

    @BeforeInsert()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10);
    }

    toResponseObject(showToken: boolean = true) : UserRO{
        const { id, created, username, token } = this;
        const resToken: any = { id, created, username };
        if(showToken) {
            resToken.token = token;
        }
        return resToken;
    }
    async comparePassword(attempt: string) {
        return await bcrypt.compare(attempt, this.password);
    }
    private get token() {
        const { id, username } = this;
        return jwt.sign({
            id,
            username
        }, 
        process.env.SECRET,
        {
            expiresIn: '7d'
        })
    }
}