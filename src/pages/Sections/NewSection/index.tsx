import React from 'react';
import { Col, Form, Input, Modal, notification, Row } from 'antd';
import { composeRules } from 'src/utils/compose-rules';
import { SaveOutlined } from '@ant-design/icons';
import { useCreateSection } from 'src/queries/admin/section';
import { CreateSectionRequest } from 'src/interfaces/request/admin/section';
import { getError } from 'src/utils/get-error';


export type INewSectionProps = {
  onClose?: (reason?: boolean) => void;
};

type FormData = {
} & CreateSectionRequest;

const NewSection: React.FC<INewSectionProps> = ({
  onClose,
}) => {
  const [form] = Form.useForm<FormData>();
  const { mutate: mutateSection, isLoading } = useCreateSection({
    onSuccess: () => onClose && onClose(true),
    onError: (error) => notification.error(getError(error))
  });

  const onFinish = (values: FormData) => {
    mutateSection(values);
  };

  return (
    <Modal
      open={ true }
      title="Adicionar secção"
      maskClosable={ false }

      closable={ false }

      okText="Adicionar"
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

export default NewSection;
