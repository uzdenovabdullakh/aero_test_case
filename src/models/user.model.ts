import { Table, Column, Model, HasMany } from 'sequelize-typescript';
import { File } from './file.model';
import { Token } from './token.model';

@Table
export class User extends Model {
  @Column({ primaryKey: true })
  id!: string;

  @Column
  password!: string;

  @HasMany(() => File)
  files!: File[];

  @HasMany(() => Token)
  tokens!: Token[];
}