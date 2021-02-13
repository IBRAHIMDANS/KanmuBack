import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'admin',
})

export default class AdminUser extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255, name: 'first_name' })
  firstName: string;

  @Column({ length: 255, name: 'last_name' })
  lastName: string;

  @Column({ length: 255 })
  email: string;

  @Column({ name: 'password' })
  password?: string;

}
