import { ROLE_LEVEL_ID } from '../helpers/constant.ts';
import administrator from './administrator.ts';

const menus = {
  [ROLE_LEVEL_ID.ADMINISTRATOR]: administrator,
};

export default menus;
