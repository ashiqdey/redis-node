import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Profile } from './Profile';

// marks the class as an Entity that corresponds to a database table.
@Entity()
export class User {
  // Indicates an auto-incremented primary key column.
  @PrimaryGeneratedColumn()
  id: number;

  // Specifies a regular column.
  @Column({ name: 'first_name' }) // Specify column name with underscore
  firstName: string;

  @Column({ name: 'last_name' })
  lastName: string;

  @Column()
  age: number;

  @Column({ name: 'is_active' })
  isActive: boolean;

  @OneToOne(() => Profile, {
    cascade: true, // return profile relation with user by default
    onDelete: 'CASCADE', // delete user if profile is deleted
  })
  @JoinColumn()
  profile: Profile;
}
