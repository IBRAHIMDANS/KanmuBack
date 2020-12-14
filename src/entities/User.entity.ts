import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Exclude } from 'class-transformer';
import { PasswordTransformer } from '../lib/password.transformer';
import { Length } from 'class-validator';
import { TimestampEntities } from '../Generics/timestamp.entities';
import Structure from './Structure.entity';
import { UserRoleEnum } from '../enum/UserRoleEnum';

@Entity({
  name: 'users',
})

export default class User extends TimestampEntities {

  @Column({ unique: true })
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ length: 255, name: 'first_name' })
  firstName: string;

  @Column({ length: 255, name: 'last_name' })
  lastName: string;

  @Column({ length: 255 })
  email: string;

  @Column({ length: 255 })
  slug: string;

  @Exclude()
  @Length(4)
  @Column({
    name: 'password',
    length: 255,
    transformer: new PasswordTransformer(),
  })
  password: string;

  @Column({
    type: 'enum',
    enum: UserRoleEnum,
    default: UserRoleEnum.USER,
  })
  role: string;

  @OneToOne(() => Structure,
    {
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      cascade: true,
      eager: true,
    },
  )
  @JoinColumn()
  structure: Structure;
}
