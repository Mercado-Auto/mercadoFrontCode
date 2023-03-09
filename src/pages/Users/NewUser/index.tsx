import React from 'react';
import { Col, Form, Input, Modal, notification, Row } from 'antd';
import { composeRules } from 'src/utils/compose-rules';
import { KeyOutlined, SaveOutlined } from '@ant-design/icons';
import PasswordSecurity from 'src/components/PasswordSecurity';
import PasswordStrength from 'src/components/PasswordStrength';
import { useCreateUser } from 'src/queries/admin/user';
import { CreateUserRequest } from 'src/interfaces/request/admin/user';
import { getError } from 'src/utils/get-error';


export type INewUserProps = {
  onClose?: (reason?: boolean) => void;
};

type FormData = {
  password_confirm: string;
} & CreateUserRequest;

const NewUser: React.FC<INewUserProps> = ({
  onClose,
}) => {
  const [form] = Form.useForm<FormData>();
  const { mutate: mutateUser, isLoading } = useCreateUser({
    onSuccess: () => onClose && onClose(true),
    onError: (error) => notification.error(getError(error))
  });

  const onFinish = (values: FormData) => {
    mutateUser(values);
  };

  return (
    <Modal
      open={ true }
      title="Adicionar usuário"
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
          <Col md={ 12 } sm={ 24 }>
            <Form.Item
              name="password"
              label="Senha"
              required
              rules={ composeRules({
                required: true,
                min: 8,
                max: 24,
                requiredLowerCaseLetters: true,
                requiredNumericChars: true,
                requiredSpecialChars: true,
                requiredUpperCaseLetters: true,
              }) }
            >
              <Input.Password
                prefix={ <KeyOutlined className="form-item-icon" /> }
                placeholder="Digite a nova senha"
              />
            </Form.Item>

            <Form.Item
              name="password_confirm"
              label="Confirmar senha"
              rules={ [
                ...composeRules({
                  required: true,
                }),
                ({ getFieldValue }) => ({
                  validator (_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('As senhas não coincidem!'));
                  },
                }),
              ] }
            >
              <Input.Password
                prefix={ <KeyOutlined className="form-item-icon" /> }
                visibilityToggle={ false }
                placeholder="Confirme a senha"
              />
            </Form.Item>
          </Col>

          <Col md={ 12 } sm={ 24 }>
            <Form.Item
              noStyle
              shouldUpdate={ (prev, next) => prev.password !== next.password }
            >
              {
                (form) => <>
                  <PasswordSecurity
                    password={ form.getFieldValue('password') }
                  />
                  <PasswordStrength
                    password={ form.getFieldValue('password') }
                  />
                </>
              }
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
}

export default NewUser;
