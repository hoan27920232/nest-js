/* eslint-disable */
import { IsString } from 'class-validator';
import { UserRO } from 'src/user/user.dto';
export class IdeaDTO {
    @IsString()
    idea: string;
    @IsString()
    description: string;
}
export class IdeaRO {
    id?: string;
    idea: string;
    description: string;
    updated: Date;
    created: Date;
    author: UserRO; 
}