import { LoadingOutlined, UploadOutlined } from "@ant-design/icons";
import {message, notification, Spin} from "antd";
import React, { useEffect, useMemo, useState } from "react";

import type { UploadChangeParam } from "antd/es/upload";
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface";
import { useAuth } from "src/contexts/Auth";
import Sale from "src/interfaces/sale";
import { queryClient } from "src/queries";
import { getError } from "src/utils/get-error";
import { parseUrl } from "src/utils/parse-url";

import { useDeleteSaleNF } from "src/queries/reseller/sale";
import { Upload } from "./styles";

export type INFProps = {
  data: Sale;
};

const beforeUpload = (file: RcFile) => {
  const isPDF = file.type === "application/pdf";
  if (!isPDF) {
    message.error("Apenas documentos do tipo PDF podem ser carregados!");
  }
  const maxSize = 4;
  const isLtMax = file.size / 1024 / 1024 < maxSize;
  if (!isLtMax) {
    message.error(`Documento tem que ser menor que ${maxSize}MB!`);
  }
  return isPDF && isLtMax;
};

const NF: React.FC<INFProps> = ({ data }) => {
  const { token } = useAuth();
  const [uploading, setUploading] = useState(false);
  const { isLoading: delettingNF, mutateAsync: deleteNF } = useDeleteSaleNF();

  const [fileList, setFileList] = useState<UploadFile[]>(
    data.nf_link
      ? [
          {
            uid: `-${0}`,
            name:
              (data.nf_link.split("/").pop() || data.nf_link).split("\\").pop() ||
              data.nf_link,
            status: "done",
            url: parseUrl(`${data.nf_link}`),
          },
        ]
      : []
  );

  const handleDownload = async () => {
    const a = document.createElement("a");
    a.setAttribute("href", data.nf_link);
    a.setAttribute("download", "NF");

    document?.body?.appendChild(a);
    a.click();

    Promise.resolve().then(() => a.remove());
  };

  const handleChange: UploadProps["onChange"] = (
    info: UploadChangeParam<UploadFile>
  ) => {
    if (info.file.status === "uploading") {
      setUploading(true);
      return;
    }
    setUploading(false);
    if (info.file.status === "error") {
      message.error(`${info.file.name} error ao tentar fazer o upload!`);
    }
  };

  const handleSuccess = (): void => {
    queryClient.invalidateQueries();
    setUploading(false);
  };

  const handleError = (err: any): void => {
    setUploading(false);
    message.error(`Error ao tentar fazer o upload!`);
    notification.error(getError(err));
  };

  const onHandleRemove: UploadProps["onRemove"] = async () => {
    try {
      await deleteNF({ sale_id: data.id });
      setFileList([]);
      queryClient.invalidateQueries();
      return true;
    } catch (error) {
      notification.error(getError(error));
    }
  };

  useEffect(() => {
    setFileList(
      data.nf_link
        ? [
            {
              uid: `-${0}`,
              name:
                (data.nf_link.split("/").pop() || data.nf_link).split("\\").pop() ||
                data.nf_link,
              status: "done",
              url: parseUrl(`${data.nf_link}`),
            },
          ]
        : []
    );
  }, [data, setFileList]);

  const uploadButton = useMemo(() => {
    return (
      <div>
        {uploading || delettingNF ? <LoadingOutlined /> : <UploadOutlined />}
        <div style={{ lineHeight: 1, marginTop: 5 }}>Selecionar PDF</div>
      </div>
    );
  }, [uploading, delettingNF]);

  return (
    <>
      <br />
      <Spin spinning={delettingNF || uploading}>
        <Upload
          action={`/api/sales/${data.id}/attach-nf`}
          listType="picture-card"
          fileList={fileList}
          onChange={handleChange}
          onDownload={handleDownload}
          name="file"
          headers={{
            Authorization: `Bearer ${token}`,
          }}
          maxCount={1}
          beforeUpload={beforeUpload}
          withCredentials={true}
          onRemove={onHandleRemove}
          disabled={delettingNF}
          {...({ onSuccess: handleSuccess } as any)}
          {...({ onError: handleError } as any)}
        >
          {!data.nf_link ? uploadButton : null}
        </Upload>
      </Spin>
    </>
  );
};

export default NF;
