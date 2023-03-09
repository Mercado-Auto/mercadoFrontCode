import React, { useEffect } from 'react';
import { Col, Form, Input, Modal, notification, Row, Spin } from 'antd';
import { composeRules } from 'src/utils/compose-rules';
import { SaveOutlined } from '@ant-design/icons';
import { useEditUser, useReadUser } from 'src/queries/admin/user';
import { UpdateUserRequest } from 'src/interfaces/request/admin/user';
import { getError } from 'src/utils/get-error';


export type IEditUserProps = {
  onClose?: (reason?: boolean) => void;
  id: string;
};

type FormData = {
} & Omit<UpdateUserRequest, 'id'>;

const EditUser: React.FC<IEditUserProps> = ({
  id,
  onClose,
}) => {
  const { error: errorGet, data, isLoading: isLoadingGet } = useReadUser(id);

  const [form] = Form.useForm<FormData>();
  const { mutate: mutateUser, isLoading } = useEditUser({
    onSuccess: () => onClose && onClose(true),
    onError: (error) => notification.error(getError(error))
  });

  const onFinish = (values: FormData) => {
    mutateUser({
      id,
      ...values,
    });
  };

  useEffect(() => {
    data && form.setFieldsValue(data);
  }, [data, form]);

  if (errorGet) {
    onClose && onClose(false);
    notification.error(getError(errorGet))
  }

  return (
    <Modal
      open={ true }
      title="Editar usuário"
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
      <Spin
        spinning={ isLoadingGet }
        tip="Carregando..."
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
                  min: 8,
                  max: 128,
                }) }
              >
                <Input
                  placeholder="Digite o nome"
                />
              </Form.Item>
            </Col>
            <Col span={ 24 }>
              <Form.Item
                name="email"
                label="E-mail"
                required
                rules={ composeRules({
                  required: true,
                  type: 'email'
                }) }
              >
                <Input
                  type='email'
                  placeholder="Digite o e-mail"
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Spin>
    </Modal>
  );
}

export default EditUser;
