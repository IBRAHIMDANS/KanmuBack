import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn
} from "typeorm";
import { TimestampEntities } from "../Generics/timestamp.entities";
import GamesEntity from "./Game.entity";

@Entity({
  name: "structures"
})

export default class Structure extends TimestampEntities {

  @Column({ unique: true })
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ length: 255, name: "name" })
  name?: string;


  @CreateDateColumn({
    name: "created_at_structure",
    type: "timestamp",
    update: false
  })
  createdAtStructure?: Date;

  @Column({ length: 255, name: "number_member" })
  numberMember?: string;


  @Column({ length: 255 })
  description: string;

  @Column({ type: "simple-array", name: "game_list", nullable: true })
  gameList?: string[];


  @Column({ length: 255, name: "logo_url" })
  logoUrl?: string;

  @Column({ length: 255, name: "banner_url" })
  bannerUrl?: string;


  @Column({ length: 255, name: "address" })
  address?: string;

  @Column({ type: "simple-array", name: "social_networks", nullable: true })
  socialNetworks?: string[];

//   @OneToOne(() => User,
//     {
//       onDelete: 'CASCADE',
//       onUpdate: 'CASCADE',
//       cascade: true,
//       eager: true,
//     },
//   )
//   @JoinColumn()
//   user: User;
  // TODO in futur save game on collection games
  @ManyToMany(type => GamesEntity, {
    cascade: true
  })
  @JoinTable()
  games: GamesEntity[];
}
