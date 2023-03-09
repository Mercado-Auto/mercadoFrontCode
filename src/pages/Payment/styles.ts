import styled from "styled-components";
import * as ANT from "antd";

export const Container = styled(ANT.PageHeader).attrs({
  title: 'Pagamentos',
  subTitle: 'Lista de pagamentos pendentes e/ou processados',
})`
  background-color: #fff;
`;
