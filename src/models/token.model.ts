import { Table, Column, Model, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { User } from './user.model';

@Table
export class Token extends Model {
  @Column
  token!: string;

  @Column
  expires!: Date;

  @Column
  isActive!: boolean;

  @ForeignKey(() => User)
  @Column
  userId!: string;

  @BelongsTo(() => User)
  user!: User;
}