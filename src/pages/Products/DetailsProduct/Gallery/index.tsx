import { message, Modal, notification } from 'antd';
import React, { useMemo, useState, useEffect } from 'react';
import { UploadOutlined, LoadingOutlined } from '@ant-design/icons';

import Product from 'src/interfaces/product';
import { getBase64 } from 'src/utils/get-base64';
import { useAuth } from 'src/contexts/Auth';
import { parseUrl } from 'src/utils/parse-url';
import { useDeleteProductPhoto } from 'src/queries/reseller/product';
import { getError } from 'src/utils/get-error';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import type { UploadChangeParam } from 'antd/es/upload';

import { Upload } from './styles';
import { queryClient } from 'src/queries';

export type IGalleryProps = {
  data: Product;
}

const beforeUpload = (file: RcFile) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('Apenas imagens JPG/PNG podem ser carregadas!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Imagem tem que ser menor que 2MB!');
  }
  return isJpgOrPng && isLt2M;
};

const Gallery: React.FC<IGalleryProps> = ({
  data,
}) => {
  const { token } = useAuth();
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [uploading, setUploading] = useState(false);
  const { isLoading: delettingPhoto, mutateAsync: deletePhoto } = useDeleteProductPhoto();

  const [fileList, setFileList] = useState<UploadFile[]>(
    data.photos
      .map((photo: string, index: number) => {

        return {
          uid: `-${index}`,
          name: (photo.split('/').pop() || photo).split('\\').pop() || photo,
          status: 'done',
          url: parseUrl(`${process.env.REACT_APP_STORAGE}${photo}`),
        };
      }),
  );

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
  };

  const handleChange: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
    if (info.file.status === 'uploading') {
      setUploading(true);
      return;
    }
    setUploading(false);
    if (info.file.status === 'error') {
      message.error(`${info.file.name} error ao tentar fazer o upload!`);
    }
  };

  const handleSuccess = (): void => {
    queryClient.invalidateQueries();
    setUploading(false);
  }

  const onHandleRemove: UploadProps['onRemove'] = async (file) => {
    if (file) {
      const index = fileList.findIndex((_file) => (_file.url || '').includes(file?.url || ''))

      try {
        await deletePhoto({ id: data.id, index });
        const newFileList = [...fileList];
        newFileList.splice(index, 1);
        setFileList(newFileList);
        return true;
      } catch (error) {
        notification.error(getError(error));
      }
    }
  };

  useEffect(() => {
    setFileList(data.photos
      .map((photo: string, index: number) => {

        return {
          uid: `-${index}`,
          name: (photo.split('/').pop() || photo).split('\\').pop() || photo,
          status: 'done',
          url: parseUrl(photo),
        };
      }),)
  }, [data, setFileList])

  const uploadButton = useMemo(() => {
    return (
      <div>
        {uploading || delettingPhoto ? <LoadingOutlined /> : <UploadOutlined />}
        <div style={{ lineHeight: 1, marginTop: 5 }}>
          Selecionar imagem
        </div>
      </div>
    );
  }, [uploading, delettingPhoto]);

  return (
    <>
      <br />
      <Upload
        action={`/api/products/${data.id}/photo`}
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
        name="file"
        headers={{
          Authorization: `Bearer ${token}`
        }}
        beforeUpload={beforeUpload}
        withCredentials={true}
        onRemove={onHandleRemove}
        disabled={delettingPhoto}
        {...{ onSuccess: handleSuccess } as any}
      >
        {uploadButton}
      </Upload>

      <Modal
        open={previewOpen}
        title={previewTitle}
        footer={null}
        onCancel={() => setPreviewOpen(false)}
      >
        <img alt={previewTitle} style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </>
  );
}

export default Gallery;
