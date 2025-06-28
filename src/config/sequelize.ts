import { Sequelize } from 'sequelize-typescript';
import { User } from '../models/user.model';
import { File } from '../models/file.model';
import { Token } from '../models/token.model';
import config from './env'

const sequelize = new Sequelize({
  database: config.DB_NAME,
  username: config.DB_USER,
  password: config.DB_PASS,
  host: config.DB_HOST,
  dialect: 'mysql',
  models: [User, File, Token],
  logging: false,
});

export default sequelize;