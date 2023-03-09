import styled from "styled-components";

export const Container = styled.div.attrs({
  className: `logout-container`,
})`
  max-width: 500px;
  margin: 0 auto;
  padding-top: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const LottieWrapper = styled.div.attrs({
  className: `logout-container-lottie-wrapper`,
})`
  margin-bottom: 30px;
`;
