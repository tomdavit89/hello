import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class User {

    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column({type:'text'})
    name: string;

    @Column({type:'text'})
    age: number;

    @Column({type:'text'})
    gender: string;
}