import styled from "styled-components";
import * as ANT from "antd";


export const Container = styled(ANT.PageHeader).attrs({
  subTitle: "Dados do produto",
})`
  background-color: #fff;
`;

export const ContainerSpin = styled.div`
  padding: 100px;
  text-align: center;
`;
