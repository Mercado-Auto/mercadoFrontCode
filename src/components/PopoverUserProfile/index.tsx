import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  UserOutlined,
  LogoutOutlined,
  NotificationOutlined,
} from "@ant-design/icons";

import { Avatar, Space, Typography, MenuProps } from "antd";

import { Container, Menu } from "./styles";
import { useAuth } from "../../contexts/Auth";

export type PopoverUserProfileProps = {
  openDrawer?: () => void;
};

const PopoverUserProfile: React.FC<PopoverUserProfileProps> = ({
  openDrawer,
}) => {
  const { name } = useAuth();
  const [menuActions] = useState<MenuProps["items"]>([
    {
      label: <Link to="perfil">Perfil</Link>,
      icon: <UserOutlined />,
      key: "perfil",
    },
    // {
    //   label: "Notificações",
    //   icon: <NotificationOutlined />,
    //   key: "notifications",
    // },
    {
      label: <Link to="auth/logout">Sair da conta</Link>,
      danger: true,
      icon: <LogoutOutlined />,
      key: "auth/logout",
    },
  ]);

  const onClickedMenu: MenuProps["onClick"] = ({ key }) => {
    if (key === "notifications") {
      openDrawer && openDrawer();
    }
  };

  return (
    <Container>
      <Space>
        <Avatar size={56} icon={<UserOutlined />} />
        <div>
          <Typography.Title level={5}>{name || "Pedro"}</Typography.Title>
          <Typography.Text type="secondary">
            {name || "Administrador"}
          </Typography.Text>
        </div>
      </Space>
      <Menu
        mode="vertical"
        selectable={false}
        items={menuActions}
        onClick={onClickedMenu}
      />
    </Container>
  );
};

export default PopoverUserProfile;
