import React, { useEffect } from 'react';
import { Col, Form, Input, Modal, notification, Row } from 'antd';
import { composeRules } from 'src/utils/compose-rules';
import { SaveOutlined } from '@ant-design/icons';
import { useEditTag } from 'src/queries/admin/tag';
import { UpdateTagRequest } from 'src/interfaces/request/admin/tag';
import { getError } from 'src/utils/get-error';
import Tag from 'src/interfaces/tag';


export type IEditTagProps = {
  onClose?: (reason?: boolean) => void;
  tag: Tag;
};

type FormData = {
} & Omit<UpdateTagRequest, 'id'>;

const EditTag: React.FC<IEditTagProps> = ({
  tag,
  onClose,
}) => {
  const [form] = Form.useForm<FormData>();
  const { mutate: mutateTag, isLoading } = useEditTag({
    onSuccess: () => onClose && onClose(true),
    onError: (error) => notification.error(getError(error))
  });

  const onFinish = (values: FormData) => {
    mutateTag({
      id: tag.id,
      ...values,
    });
  };

  useEffect(() => {
    tag && form.setFieldsValue(tag);
  }, [tag, form]);

  return (
    <Modal
      open={ true }
      title="Editar tag"
      maskClosable={ false }

      closable={ false }

      okText="Salvar"
      okButtonProps={ {
        htmlType: 'submit',
        disabled: isLoading,
        loading: isLoading,
        icon: <SaveOutlined />
      } }
      cancelButtonProps={ {
        disabled: isLoading,
      } }
      onOk={ () => {
        form
          .validateFields()
          .then(() => {
            form.submit();
          })
          .catch(info => {
            console.log('Validate Failed: ', info);
          });
      } }

      onCancel={ () => onClose && onClose(false) }
    >
      <Form layout="vertical" form={ form } name="control-hooks" onFinish={ onFinish }>
        <Row gutter={ 15 }>
          <Col span={ 24 }>
            <Form.Item
              name="name"
              label="Nome"
              required
              rules={ composeRules({
                required: true,
                min: 3,
                max: 128,
              }) }
            >
              <Input
                placeholder="Digite o nome"
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
}

export default EditTag;
