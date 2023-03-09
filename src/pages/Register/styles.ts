import { Card } from 'antd';
import { Link, LinkProps } from 'react-router-dom';
import styled from 'styled-components';


export const Container = styled(Card).attrs({
  className: 'register-form-container'
})`
  left: 50%;
  transform: translateX(-50%);
  top: 10vh;
  max-width: 800px;
  min-height: 300px;
  border-radius: 4px;
  transition: all 300ms ease-in-out;

  .form-item-icon {
    margin-right: 5px;
  }
`;

export const HeaderContainer = styled.div`
  margin: -15px -15px 30px;
`;

export const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  flex-wrap: nowrap;
`;

export const GoBackLink = styled(Link).attrs({
  className: `ant-btn ant-btn-link ant-btn-sm`
}) <LinkProps & {
  disabled?: boolean;
}>`
  margin-left: 5px;
  margin-top: 10px;
  margin-bottom: 2px;

  .anticon {
    margin-right: 5px;
  }
`;

export const ContainerLogo = styled.div.attrs({
  className: 'register-form-logo-container'
})`
  position: relative;
  text-align: center;
  display: flex;
  justify-content: center;
  margin-bottom: 0px;
  margin-top: 15px;
  padding-right: 15px;
`;

export const ContainerButtons = styled.div.attrs({
  className: 'register-form-buttons-container'
})`
  display: flex;
  justify-content: flex-end;
  margin-top: 0px;
`;

export const Logo = styled.img.attrs({
  className: 'register-form-fake-logo-container',
  src: '/assets/images/logo.png'
})`
  height: 40px;
`;


export const ContainerLottie = styled.div.attrs({
  className: 'register-lottie-container'
})`
  overflow: hidden;
  position: relative;
  width: 550px;
  margin: auto;
`;

export const ContainerCreated = styled.div.attrs({
  className: 'register-created-container'
})`
  margin-top: -25px;
  text-align: center;
`;
