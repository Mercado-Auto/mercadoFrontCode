import styled from 'styled-components';
import { Space as AntSpace } from 'antd';

export const Container = styled.div.attrs({
  className: `perfil-wrapper`
})`
  max-width: 500px;
  margin: 56px auto 0px auto;
`;

export const Header = styled.div.attrs({
  className: `perfil-header`
})`
  margin-bottom: 30px;
`;

export const ContainerAvatar = styled.div.attrs({
  className: `perfil-wrapper-avatar`
})`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 20px auto;
`;

export const ContainerForms = styled.div.attrs({
  className: `perfil-wrapper-forms`
})`
`;

export const Space = styled(AntSpace)`
  width: 100%;
  flex-direction: row;
  justify-content: flex-end;
`;
