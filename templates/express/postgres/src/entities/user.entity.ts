import * as bcrypt from 'bcrypt';
import * as jwt from "jsonwebtoken";
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn
} from "typeorm";

@Entity()
@Unique(["email"])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: 0 })
  age: number;

  @Column({ type: "bytea", nullable: true })
  avatar: Buffer;

  @CreateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
    onUpdate: "CURRENT_TIMESTAMP(6)",
  })
  updatedAt: Date;

  toJSON() {
    const { password, avatar, ...user } = this;
    return user;
  }

  async generateAuthToken(): Promise<string> {
    const token = jwt.sign({ id: this.id.toString() }, process.env.JWT_SECRET!);
    return token;
  }

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (this.password) {
      this.password = await bcrypt.hash(this.password, 8);
    }
  }
}

export type IUser = {
  [T in keyof User]: User[T];
};