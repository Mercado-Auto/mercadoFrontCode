import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";

import { Avatar, Space, Popover, Drawer } from "antd";

import {
  Layout,
  Header,
  Menu,
  Content,
  Footer,
  Logo,
  RightSlotHeader,
  UserProfile,
} from "./styles";
import { useAuth } from "../../contexts/Auth";
import PopoverUserProfile from "../../components/PopoverUserProfile";
import Notifications from "src/components/Notifications";

const Horizontal: React.FC = () => {
  const { menu, name } = useAuth();
  const [showProfPop, setShowProfPop] = useState(false);
  const [showNoti, setShowNoti] = useState(false);

  const onOpenNoti = () => {
    setShowProfPop(false);
    setShowNoti(true);
  };

  const onCloseNoti = () => setShowNoti(false);
  return (
    <Layout style={ { background: '#fff' } }>
      <Header>
        <Logo />
        <Menu theme="dark" mode="horizontal" items={ menu } />
        <RightSlotHeader>
          <Popover
            trigger="click"
            open={ showProfPop }
            onOpenChange={ setShowProfPop }
            content={ <PopoverUserProfile openDrawer={ onOpenNoti } /> }
            placement="bottomLeft"
          >
            <UserProfile>
              <Space>
                <span>{ name || "Olá Pedro" }</span>
                <Avatar icon={ <UserOutlined /> } />
              </Space>
            </UserProfile>
          </Popover>
        </RightSlotHeader>
      </Header>
      <Content>
        <div>
          <Outlet />
        </div>

        <Drawer
          title="Notificações"
          placement="right"
          onClose={ onCloseNoti }
          open={ showNoti }
          destroyOnClose={ true }
          closable={ false }
        >
          <Notifications />
        </Drawer>
      </Content>
      <Footer style={ { background: '#fff' } }>
        Mercado Auto © 2022 - Versão { process.env.REACT_APP_VERSION }
      </Footer>
    </Layout>
  );
};

export default Horizontal;
