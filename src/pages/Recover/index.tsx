import { ArrowLeftOutlined, MailOutlined } from '@ant-design/icons';
import { Controls, Player } from '@lottiefiles/react-lottie-player';
import { Button, Form, Input, notification, Typography } from 'antd';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { HTTPError } from 'src/api/get-http-error';
import { useAuth } from 'src/contexts/Auth';

import emailSendedJSON from 'src/jit-assets/animations/email-sended.json';

import {
  Container,
  ContainerLogo,
  ContainerLottie,
  ContainerSendedEmail,
  Logo
} from './styles';

const Recover: React.FC = () => {
  const [form] = Form.useForm();
  const { sendRecoverEmail } = useAuth();
  const [isLoading, setLoading] = useState(false);
  const [emailSended, setEmailSended] = useState(false);

  const onFinish = async (data: { email: string }) => {
    setLoading(true);
    try {
      await sendRecoverEmail(data.email);
      setEmailSended(true);
    } catch (err) {
      notification.error(err as HTTPError);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <div style={{ margin: -15, marginBottom: 30 }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
          flexWrap: 'nowrap'
        }}>
          <div>
            <Link to="/auth/login">
              <Button
                type="link"
                size="small"
                style={{
                  marginLeft: 5,
                  marginTop: 10,
                  marginBottom: 2
                }}
                disabled={isLoading}
              >
                <ArrowLeftOutlined />

                Voltar para o login
              </Button>
            </Link>
            <Typography.Title style={{ marginLeft: 15, marginRight: 15 }} level={3}>
              Recuperar senha
            </Typography.Title>
          </div>

          <ContainerLogo>
            <Logo />
          </ContainerLogo>
        </div>

      </div>

      {
        !emailSended && (
          <Form form={form} onFinish={onFinish} layout='vertical'>

            <Form.Item
              name="email"
              label="E-mail"
              rules={[
                { required: true, message: 'Please input your E-mail!' },
                { type: 'email' }
              ]}
            >
              <Input
                type="email"
                prefix={<MailOutlined className="form-item-icon" />} placeholder="Digite seu e-mail"
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="recover-form-button"
                block
                size='large'
                loading={isLoading}
              >
                Enviar e-mail
              </Button>
            </Form.Item>
          </Form>
        )
      }

      {
        emailSended && (
          <ContainerSendedEmail>
            <ContainerLottie>
              <Player
                autoplay
                loop
                src={emailSendedJSON}
                style={{
                  position: 'absolute',
                  top: '50%',
                  transform: 'translateY(-50%)'
                }}
              >
                <Controls visible={false} />
              </Player>
            </ContainerLottie>
            <div>
              <Typography.Title level={3}>
                E-mail enviado com sucesso!
              </Typography.Title>
              <Typography.Text>
                Um e-mail com um link de recuperação de senha foi enviado para o seu e-mail!
              </Typography.Text>
            </div>
          </ContainerSendedEmail>
        )
      }

    </Container>
  );
}

export default Recover;
