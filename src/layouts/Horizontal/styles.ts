import styled from "styled-components";
import { Layout as AntLayout, Menu as AntMenu } from "antd";

export const Layout = styled(AntLayout).attrs({
  className: `horizontal-layout`,
})`
  .ant-row-rtl .logo {
    float: right;
  }
`;

export const Header = styled(AntLayout.Header).attrs({
  className: `horizontal-layout-header`,
})`
  text-align: center;
  display: flex;
`;

export const Menu = styled(AntMenu).attrs({
  className: `horizontal-layout-menu`,
})`
  flex: 1;
  border-bottom: none;
  overflow-x: clip;
`;

export const Content = styled(AntLayout.Content).attrs({
  className: `horizontal-layout-content`,
})`
  min-height: calc(100vh - 135px);
`;

export const Footer = styled(AntLayout.Footer).attrs({
  className: `horizontal-layout-footer`,
})`
  text-align: center;
`;

export const RightSlotHeader = styled.div.attrs({
  className: `horizontal-layout-header-right-slot`,
})`
  float: right;
`;

export const UserProfile = styled.div.attrs({
  className: `header-user-profile`,
})`
  cursor: pointer;
  color: #fff;
`;

export const Logo = styled.img.attrs({
  className: `logo`,
  src: "/assets/images/logo.png",
})`
  height: 52px;
  margin: 0px 24px 0px 0;
  align-self: center;
`;
