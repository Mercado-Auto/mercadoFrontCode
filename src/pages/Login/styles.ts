import { Card } from 'antd';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Container = styled(Card).attrs({
  className: 'login-form-container'
})`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 10vh;
  width: 400px;
  min-height: 300px;
  border-radius: 4px;
  transition: all 300ms ease-in-out;

  .login-form-forgot {
    float: right;
  }

  .ant-col-rtl .login-form-forgot {
    float: left;
  }

  .form-item-icon {
    margin-right: 5px;
  }
`;

export const ContainerLogo = styled.div.attrs({
  className: 'login-form-logo-container'
})`
  position: relative;
  text-align: center;
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 40px;
  margin-top: 20px;
`;

export const Logo = styled.img.attrs({
  className: 'login-form-fake-logo-container',
  src: '/assets/images/logo.png'
})`
  height: 56px;
`;

export const ButtonLink = styled(Link).attrs({
  className: `ant-btn ant-btn-link ant-btn-block`,
})``;
