import styled from "styled-components";
import { Space as AntSpace } from "antd";

export const Header = styled.div`
  text-align: center;

  h3 {
    margin-top: 0px !important;
  }
`;

export const Space = styled(AntSpace)`
  width: 100%;
  justify-content: center;
`;
