import { AreaChartOutlined, TagsOutlined } from "@ant-design/icons"
import { sidebarMenus } from "../helpers/interface";

const menus: sidebarMenus[] = [
  {
    to: '/dashboard',
    icon: AreaChartOutlined,
    title: 'Dashboard',
  },
  {
    to: '/category',
    icon: TagsOutlined,
    title: 'Kategori',
  },
];

export default menus;
