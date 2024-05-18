import { AntdIconProps } from "@ant-design/icons/lib/components/AntdIcon";

export interface sidebarMenus {
  to: string;
  icon: React.ForwardRefExoticComponent<Omit<AntdIconProps, "ref"> & React.RefAttributes<HTMLSpanElement>>;
  title: string;
  // key: string;
}