import styled from 'styled-components';
import { Menu as AntMenu } from 'antd';


export const Container = styled.div.attrs({
  className: `popover-user-profile-wrapper`
})`
  width: 250px;
  line-height: 1;
`;

export const Menu = styled(AntMenu).attrs({
  className: `user-profile-menu`,
})`
  margin: 10px -15px -10px -15px;
`;
