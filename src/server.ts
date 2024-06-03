import dotenv from 'dotenv';
import app from './app';
import sequelize from './config/database';

dotenv.config();

const port = process.env.PORT || 3000;

sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});
