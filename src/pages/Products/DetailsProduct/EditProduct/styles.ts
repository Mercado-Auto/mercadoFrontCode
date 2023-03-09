import styled from "styled-components";
import { Space as AntSpace } from 'antd';


export const Container = styled.div.attrs({
  className: 'edit-form-container'
})`
  max-width: 700px;
  margin: 0px auto;
`;

export const Space = styled(AntSpace).attrs({
})`
  width: 100%;
  justify-content: flex-end;
`;
