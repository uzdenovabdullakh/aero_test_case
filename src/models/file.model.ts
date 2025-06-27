import { Table, Column, Model, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { User } from './user.model';

@Table
export class File extends Model {
  @Column
  name!: string;

  @Column
  extension!: string;

  @Column
  mimeType!: string;

  @Column
  size!: number;

  @Column
  uploadDate!: Date;

  @Column
  path!: string;

  @ForeignKey(() => User)
  @Column
  userId!: string;

  @BelongsTo(() => User)
  user!: User;
}