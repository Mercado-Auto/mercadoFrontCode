import React from 'react';
import { KeyOutlined } from '@ant-design/icons';
import { Col, Form, FormInstance, Input, Row } from 'antd';
import { composeRules } from 'src/utils/compose-rules';
import PasswordSecurity from 'src/components/PasswordSecurity';
import PasswordStrength from 'src/components/PasswordStrength';

export type PasswordStepProps = {
  form: FormInstance<any>;
}

const PasswordStep: React.FC<PasswordStepProps> = ({
  form,
}) => {
  return (
    <Row gutter={ 15 }>
      <Col md={ 12 } sm={ 24 }>
        <Form.Item
          name="responsible_password"
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
          name="responsible_password_confirm"
          label="Confirmar senha"
          rules={ [
            ...composeRules({
              required: true,
            }),
            ({ getFieldValue }) => ({
              validator (_, value) {
                if (!value || getFieldValue('responsible_password') === value) {
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
          shouldUpdate={ (prev, next) => prev.responsible_password !== next.responsible_password }
        >
          {
            (form) => <>
              <PasswordSecurity
                password={ form.getFieldValue('responsible_password') }
              />
              <PasswordStrength
                password={ form.getFieldValue('responsible_password') }
              />
            </>
          }
        </Form.Item>
      </Col>
    </Row>
  );
}

export default PasswordStep;
