import styled from "styled-components";
import {List, Typography} from "antd";

export const Container = styled.div``;

export const ListItem = styled(List.Item)`
  border-radius: 3px;
  padding-left: 0px !important;
  padding-top: 4px !important;
  padding-bottom: 4px !important;
`;

export const Title = styled(Typography.Text)`
  margin-bottom: 15px;
  display: inline-block;
`;

export const DateText = styled(Typography.Text)`
  color: #d9363e;
  margin-right: 20px;
`;

export const PaymentsInOrder = styled.div`
  min-height: 60px;
  padding: 20px;
  text-align: center;
`;
