import React, { useEffect } from 'react';
import { Col, Form, Input, Modal, notification, Row } from 'antd';
import { composeRules } from 'src/utils/compose-rules';
import { SaveOutlined } from '@ant-design/icons';
import { useEditSection } from 'src/queries/admin/section';
import { UpdateSectionRequest } from 'src/interfaces/request/admin/section';
import { getError } from 'src/utils/get-error';
import Section from 'src/interfaces/section';


export type IEditSectionProps = {
  onClose?: (reason?: boolean) => void;
  section: Section;
};

type FormData = {
} & Omit<UpdateSectionRequest, 'id'>;

const EditSection: React.FC<IEditSectionProps> = ({
  section,
  onClose,
}) => {
  const [form] = Form.useForm<FormData>();
  const { mutate: mutateSection, isLoading } = useEditSection({
    onSuccess: () => onClose && onClose(true),
    onError: (error) => notification.error(getError(error))
  });

  const onFinish = (values: FormData) => {
    mutateSection({
      id: section.id,
      ...values,
    });
  };

  useEffect(() => {
    section && form.setFieldsValue(section);
  }, [section, form]);

  return (
    <Modal
      open={ true }
      title="Editar secção"
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

export default EditSection;
