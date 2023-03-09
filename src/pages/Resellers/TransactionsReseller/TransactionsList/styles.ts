import styled from "styled-components";
import { Timeline as AntTimeline, Typography } from 'antd';

export const Container = styled.div`
  padding: 30px;
  max-width: 660px;
  width: 100%;
  background: #f9f9f9;
  border-top: 1px solid #CCC;
  border-right: 1px solid #CCC;
  border-bottom: 1px solid #CCC;
  overflow: auto;
  
  /* ===== Scrollbar CSS ===== */
  /* Firefox */
  scrollbar-width: none;
  scrollbar-color: #091928 #ffffff;

  /* Chrome, Edge, and Safari */
  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-track {
    background: #ffffff;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #091928;
    border-radius: 5px;
    border: 4px solid #ffffff;
  }
`;

export const Timeline = styled(AntTimeline)``;

export const TimelineItem = styled(AntTimeline.Item)`
  .ant-timeline-item-content {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    align-content: center;
    width: 100%;
    padding-right: 30px;
  }

  &.ant-timeline-item-last > .ant-timeline-item-content {
    min-height: 0 !important;
  }
`;

export const DateText = styled(Typography.Text).attrs({
  type: 'secondary',
  strong: true,
})`
  margin-right: 15px;
`;

export const MoneyText = styled(Typography.Text).attrs({
  type: 'secondary',
  strong: true,
})`
  margin-left: 15px;
`;
