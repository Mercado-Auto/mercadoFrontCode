import styled from "styled-components";
import { Upload as AntUpload } from 'antd';


export const Upload = styled(AntUpload).attrs({})`

  .ant-upload-list-picture-card-container,
  .ant-upload-select-picture-card {
    width: 200px;
    height: 200px;
  }
`;

