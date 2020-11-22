import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Exclude } from 'class-transformer';
import { PasswordTransformer } from '../lib/password.transformer';
import { Length, Min, MinLength } from 'class-validator';
import { TimestampEntities } from '../Generics/timestamp.entities';

@Entity({
  name: 'userAdmin',
})

export default class UserAdmin extends TimestampEntities {

  @Column({ unique: true })
  @PrimaryGeneratedColumn()
  id: string;


  @Column({ length: 255, unique: true, nullable: false })
  email: string;

  @Exclude()
  @Length(4)
  @Column({
    name: 'password',
    length: 255,
    nullable: false,
  })
  password: string;

  @Column('boolean', { nullable: true })
  isAdmin: boolean;

  @Exclude()
  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @Exclude()
  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;

  @BeforeInsert()
  createDates() {
    this.createdAt = new Date();
  }

  @BeforeUpdate()
  updateDates() {
    this.updatedAt = new Date();
  }

}
