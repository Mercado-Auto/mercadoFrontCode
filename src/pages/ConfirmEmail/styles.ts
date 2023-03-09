import { Card } from 'antd';
import styled from 'styled-components';


export const Container = styled(Card).attrs({
  className: 'confirm-email-form-container'
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
  className: 'confirm-email-form-logo-container'
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
  className: 'confirm-email-lottie-container'
})`
  height: 150px;
  overflow: hidden;
  position: relative;
`;

export const ContainerSendedEmail = styled.div.attrs({
  className: 'confirm-email-sended-email-container'
})`
  text-align: center;
`;

export const Logo = styled.img.attrs({
  className: 'confirm-email-form-fake-logo-container',
  src: '/assets/images/logo.png'
})`
  height: 40px;
`;
