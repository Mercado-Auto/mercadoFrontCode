import styled from "styled-components";
import * as ANT from "antd";

export const Container = styled(ANT.PageHeader).attrs({
  title: "Usuários",
  subTitle: "Lista de usuários da plataforma",
})`
  background-color: #fff;
`;

export const UserType = styled.p`
  margin: 0;
  font-size: 14px;
  list-style: none;
  line-height: 1.5715;
  color: rgba(0, 0, 0, 0.85);
  font-variant: tabular-nums;
  font-feature-settings: "tnum", "tnum";
`;
