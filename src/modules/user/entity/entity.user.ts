import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Auth } from 'src/modules/auth/entity/auth.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'text' })
  age: number;

  @Column({ type: 'text' })
  gender: string;

  @ManyToOne(() => Auth, (auth) => auth.user)
  auth: Auth;
}
