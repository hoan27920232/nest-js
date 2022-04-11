/* eslint-disable */

import { BeforeInsert, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { UserRO } from "./user.dto";
import { IdeaEntity } from "src/idea/idea.entity";
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
    @OneToMany(type => IdeaEntity, idea => idea.author)
    ideas: IdeaEntity[];
    toResponseObject(showToken: boolean = true) : UserRO{
        const { id, created, username, token } = this;
        const resToken: any = { id, created, username };
        if(showToken) {
            resToken.token = token;
        }
        if(this.ideas) {
            resToken.ideas = this.ideas
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