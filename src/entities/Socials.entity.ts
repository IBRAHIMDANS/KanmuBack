import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { TimestampEntities } from '../Generics/timestamp.entities';

@Entity({
  name: 'socials',
})

export default class Socials extends TimestampEntities {

  @Column({ unique: true })
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ length: 255 })
  app: string;

  @Column({ length: 255 })
  link: string;

}
