import { ROLE_LEVEL_ID } from '../helpers/constant.ts';
import administrator from './administrator.ts';

const routes = {
  [ROLE_LEVEL_ID.ADMINISTRATOR]: administrator,
};

export default routes;
