import express from 'express';
import cors from 'cors';
import sequelize from './config/sequelize';
import config from './config/env'
import routes from './routes';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', routes);

const PORT = config.APP_PORT;

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});