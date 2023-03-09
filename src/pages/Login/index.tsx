import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Checkbox, Divider, Form, Input, notification } from "antd";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HTTPError } from "src/api/get-http-error";
import { AuthLoginArg, useAuth } from "src/contexts/Auth";

import { Container, ContainerLogo, Logo, ButtonLink } from "./styles";

const Login: React.FC = () => {
  const [form] = Form.useForm();
  const { login } = useAuth();
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (data: AuthLoginArg) => {
    setLoading(true);
    try {
      await login(data);
      notification.success({
        message: `Bem vindo!`,
      });
      navigate(`/`);
    } catch (err) {
      notification.error(err as HTTPError);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <ContainerLogo>
        <Logo />
      </ContainerLogo>

      <Form form={form} onFinish={onFinish}>
        <Form.Item
          name="email"
          rules={[{ required: true, message: "Por favor insira seu e-mail!" }]}
        >
          <Input
            prefix={<MailOutlined className="form-item-icon" />}
            placeholder="E-Mail"
          />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: "Por favor insira sua senha!" }]}
        >
          <Input
            prefix={<LockOutlined className="form-item-icon" />}
            type="password"
            placeholder="Senha"
          />
        </Form.Item>

        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Lembrar de mim</Checkbox>
          </Form.Item>

          <Link className="login-form-forgot" to="/auth/recover">
            Esqueci a senha
          </Link>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            block
            size="large"
            loading={isLoading}
          >
            Entrar
          </Button>
        </Form.Item>
      </Form>
      <Divider plain>OU</Divider>
      <ButtonLink to="/auth/register">Cadastrar-se</ButtonLink>
    </Container>
  );
};

export default Login;
