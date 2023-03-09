import styled from "styled-components";

export const Container = styled.div`
  width: 350px;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const PrimarySummaryContent = styled.div`
  background: #091928;
  color: #f2f2f2;
  text-align: center;
  padding: 20px;
  
  h3, span, strong {
    color: inherit;
  }
`;

export const SecondarySummaryContent = styled.div`
  padding: 20px;
  border-left: 1px solid #CCC;
  border-right: 1px solid #CCC;
  border-bottom: 1px solid #CCC;
  overflow: auto;
  flex: 1;
`;
