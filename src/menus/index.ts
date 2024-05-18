import { AreaChartOutlined, TagsOutlined } from "@ant-design/icons"
import { sidebarMenus } from "../helpers/interface";

const items: sidebarMenus[] = [
  {
    to: '/dashboard',
    icon: AreaChartOutlined,
    title: 'Dashboard',
  },
  {
    to: '/category',
    icon: TagsOutlined,
    title: 'Category',
  },
];

export default items;
