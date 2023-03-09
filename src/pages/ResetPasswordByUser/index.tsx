import React, { useState } from "react";
import { ResetPasswordRequest } from "src/api/auth";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { ArrowLeftOutlined, KeyOutlined } from "@ant-design/icons";
import { Controls, Player } from "@lottiefiles/react-lottie-player";
import { Button, Form, Input, notification, Typography } from "antd";

import { useAuth } from "src/contexts/Auth";
import { HTTPError } from "src/api/get-http-error";
import { composeRules } from "src/utils/compose-rules";
import PasswordStrength from "src/components/PasswordStrength";
import PasswordSecurity from "src/components/PasswordSecurity";
import resetPasswordJSON from "src/jit-assets/animations/reset-password.json";

import {
  Logo,
  Container,
  ContainerLogo,
  ContainerLottie,
  ContainerResetedPassword,
} from "./styles";

type FormData = Omit<ResetPasswordRequest, "token"> & {
  password_confirm: string;
};

const ResetPasswordByUser: React.FC = () => {
  const [queryParams] = useSearchParams();
  const [form] = Form.useForm<FormData>();
  const { resetPasswordByUser } = useAuth();
  const [reseted, setReseted] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const onFinish = async (data: FormData) => {
    setLoading(true);
    try {
      await resetPasswordByUser({
        password: data.password,
        token: `${queryParams.get("token") || ""}`,
      });
      setReseted(true);
    } catch (err) {
      notification.error(err as HTTPError);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <div style={{ margin: -15, marginBottom: 30 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            flexWrap: "nowrap",
          }}
        >
          <div>
            <Link to="/auth/login">
              <Button
                type="link"
                size="small"
                style={{
                  marginLeft: 5,
                  marginTop: 10,
                  marginBottom: 2,
                }}
                disabled={isLoading}
              >
                <ArrowLeftOutlined />
                Voltar para o login
              </Button>
            </Link>
            <Typography.Title
              style={{ marginLeft: 15, marginRight: 15 }}
              level={3}
            >
              Redefinir senha
            </Typography.Title>
          </div>

          <ContainerLogo>
            <Logo />
          </ContainerLogo>
        </div>
      </div>

      {!reseted && (
        <Form form={form} onFinish={onFinish} layout="vertical">
          <Form.Item
            name="password"
            label="Senha"
            rules={composeRules({
              required: true,
              requiredUpperCaseLetters: true,
              requiredLowerCaseLetters: true,
              requiredNumericChars: true,
              requiredSpecialChars: true,
            })}
          >
            <Input.Password
              prefix={<KeyOutlined className="form-item-icon" />}
              placeholder="Digite a nova senha"
            />
          </Form.Item>

          <Form.Item
            noStyle
            shouldUpdate={(prev, next) => prev.password !== next.password}
          >
            {(form) => (
              <>
                <PasswordSecurity password={form.getFieldValue("password")} />
                <PasswordStrength password={form.getFieldValue("password")} />
              </>
            )}
          </Form.Item>
          <Form.Item
            name="password_confirm"
            label="Confirmar senha"
            rules={[
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("As senhas não coincidem!"));
                },
              }),
            ]}
          >
            <Input.Password
              prefix={<KeyOutlined className="form-item-icon" />}
              visibilityToggle={false}
              placeholder="Confirme a senha"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="recover-form-button"
              block
              size="large"
              loading={isLoading}
            >
              Resetar senha
            </Button>
          </Form.Item>
        </Form>
      )}

      {reseted && (
        <ContainerResetedPassword>
          <ContainerLottie>
            <Player autoplay loop src={resetPasswordJSON}>
              <Controls visible={false} />
            </Player>
          </ContainerLottie>
          <div>
            <Typography.Title level={3}>
              Senha redefinida com sucesso!
            </Typography.Title>
            <Typography.Text>
              Agora você pode voltar para a tela de login, e entrar com sua nova
              senha!
            </Typography.Text>
          </div>
        </ContainerResetedPassword>
      )}
    </Container>
  );
};

export default ResetPasswordByUser;
