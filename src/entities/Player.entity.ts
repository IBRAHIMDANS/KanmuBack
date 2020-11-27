import { Column, Entity, JoinTable, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TimestampEntities } from '../Generics/timestamp.entities';
import { User } from './index';

@Entity({
  name: 'players',
})

export default class Player extends TimestampEntities {

  @Column({ unique: true })
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ length: 255 })
  title: string;

  @Column({ length: 255, name: 'admin_id' })
  adminId: string;

  @Column({ length: 255 })
  description: string;

  @Column({ length: 255 })
  slug: string;

  @Column({ length: 255, name: 'logo_url' })
  logoUrl: string;

  @Column({ length: 255, name: 'banner_url' })
  bannerUrl: string;

  @Column({ length: 255, name: 'department' })
  department: string;

  @Column({ length: 255, name: 'region' })
  region: string;

  @Column({ length: 255, name: 'state' })
  state: string;

  @Column({ length: 255, name: 'continent' })
  continent: string;

  @OneToOne(() => User,
    // user => user.playerId,
    {
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      cascade: true,
      eager: true,
    },
  )
  @JoinTable()
  user: User;
}
