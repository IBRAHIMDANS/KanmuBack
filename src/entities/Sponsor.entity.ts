import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { TimestampEntities } from '../Generics/timestamp.entities';

@Entity({
  name: 'sponsors',
})

export default class Sponsor extends TimestampEntities {

  @Column({ unique: true })
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ length: 255 })
  title: string;

  @Column({ length: 255 })
  slug: string;

  @Column({ length: 255, name: 'logo_url' })
  logoUrl: string;

  @Column({ length: 255, name: 'banner_url' })
  bannerUrl: string;

}
