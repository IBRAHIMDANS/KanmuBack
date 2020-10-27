import auth from './auth';
import database from './database';

export default () => ({
  database: database,
  auth: auth
});
