import React from 'react';
import { Col, Form, Input, Modal, notification, Row } from 'antd';
import { composeRules } from 'src/utils/compose-rules';
import { SaveOutlined } from '@ant-design/icons';
import { useCreateCity } from 'src/queries/admin/city';
import { CreateCityRequest } from 'src/interfaces/request/admin/city';
import { getError } from 'src/utils/get-error';


export type INewCityProps = {
  onClose?: (reason?: boolean) => void;
};

type FormData = {
} & CreateCityRequest;

const NewCity: React.FC<INewCityProps> = ({
  onClose,
}) => {
  const [form] = Form.useForm<FormData>();
  const { mutate: mutateCity, isLoading } = useCreateCity({
    onSuccess: () => onClose && onClose(true),
    onError: (error) => notification.error(getError(error))
  });

  const onFinish = (values: FormData) => {
    values.uf = `${ values.uf }`.toUpperCase();
    mutateCity(values);
  };

  return (
    <Modal
      open={ true }
      title="Adicionar cidade"
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
            <Form.Item
              name="uf"
              label="UF"
              required
              rules={ composeRules({
                required: true,
                min: 2,
                max: 2,
              }) }
            >
              <Input
                placeholder="Digite o UF"
                maxLength={ 2 }
                minLength={ 2 }
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
}

export default NewCity;
