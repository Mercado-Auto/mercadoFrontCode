import styled from "styled-components";

export const Item = styled.div`
  display: flex;
  margin-bottom: 20px;
  flex-direction: column;

  p {
    color: #676767;
    font-size: 12px;
    text-align: left;
    font-weight: 400;
    line-height: 13px;
    margin: 0 0 5px 0;
    font-style: normal;
    font-family: "DM Sans";
  }
`;

export const GraphicBar = styled.div<{ valueBase: number; valueItem: number }>`
  position: relative;

  & > div {
    z-index: 2;
    height: 6px;
    position: relative;
    background-color: #001529;
    width: ${(props) => `${(props.valueItem * 100) / props.valueBase}%`};
  }

  &::before {
    left: 0;
    top: 50%;
    content: "";
    width: 100%;
    z-index: 1;
    height: 0.1px;
    position: absolute;
    background-color: #efefef;
    transform: translate(0, -50%);
  }
`;
