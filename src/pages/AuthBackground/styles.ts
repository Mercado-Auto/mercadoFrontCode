import styled from "styled-components";

export const Container = styled.div.attrs({
  className: `auth-background`
})`
  background-image: url('/assets/images/auth-backgroud.jpg');
  height: 100vh;
  width: 100vw;
  background-size: cover;
  object-fit: cover;

  &:before {
    content: ' ';
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, .7);
  }
`;
