import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../user/entity/entity.user';

@Entity()
export class Auth {
  @PrimaryGeneratedColumn('uuid')
  userId: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ default: true })
  isVerify: boolean;

  @Column({ default: false })
  isBlock: boolean;

  @OneToMany(() => User, (user) => user.auth)
  user: User[];
}
