import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  PrimaryGeneratedColumn
} from "typeorm";
import { TimestampEntities } from "../Generics/timestamp.entities";
import Structure from "./Structure.entity";

@Entity({
  name: "games"
})

export default class Game extends TimestampEntities {

  @Column({ unique: true })
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ length: 255, name: "name" })
  name?: string;

  @ManyToMany(type => Structure, {
    cascade: true
  })
  @JoinColumn()
  structure: Structure[];


}
