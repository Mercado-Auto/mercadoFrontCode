import { Card } from 'antd';
import styled from 'styled-components';


export const Container = styled(Card).attrs({
  className: 'recover-form-container'
})`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 10vh;
  width: 400px;
  min-height: 300px;
  border-radius: 4px;
  transition: all 300ms ease-in-out;

  .form-item-icon {
    margin-right: 5px;
  }
`;

export const ContainerLogo = styled.div.attrs({
  className: 'recover-form-logo-container'
})`
  position: relative;
  text-align: center;
  display: flex;
  justify-content: center;
  margin-bottom: 0px;
  margin-top: 15px;
  padding-right: 15px;
`;

export const ContainerLottie = styled.div.attrs({
  className: 'recover-lottie-container'
})`
  overflow: hidden;
  position: relative;
`;

export const ContainerResetedPassword = styled.div.attrs({
  className: 'recover-sended-email-container'
})`
  margin-top: -25px;
  text-align: center;
`;

export const Logo = styled.img.attrs({
  className: 'recover-form-fake-logo-container',
  src: '/assets/images/logo.png'
})`
  height: 40px;
`;
