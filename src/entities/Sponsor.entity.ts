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

@Entity({
  name: 'sponsors',
})

export default class Sponsor {

  @Column({ unique: true })
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ length: 255 })
  title: string;

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