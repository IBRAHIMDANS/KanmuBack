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
  name: 'players',
})

export default class Players {

  @Column({ unique: true })
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ length: 255})
  title: string;

  @Column({ length: 255, name: 'admin_id' })
  adminId: string;

  @Column({ length: 255 })
  description: string;

  @Column({ length: 255 })
  slug: string;

  @Column({ length: 255, name: 'logo_url'  })
  logoUrl: string;

  @Column({ length: 255, name: 'banner_url'  })
  bannerUrl: string;

  @Column({ length: 255, name: 'department'  })
  department: string;

  @Column({ length: 255, name: 'region'  })
  region: string;

  @Column({ length: 255, name: 'state'  })
  state: string;

  @Column({ length: 255, name: 'continent'  })
  continent: string;

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
