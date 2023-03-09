import { Controls, Player } from '@lottiefiles/react-lottie-player';
import { Typography } from 'antd';
import React, { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from 'src/contexts/Auth';

import emailSendedJSON from 'src/jit-assets/animations/email-sended.json';

import {
  Container,
  ContainerLogo,
  ContainerLottie,
  ContainerSendedEmail,
  Logo,
} from './styles';

const RequireConfirmEmail: React.FC = () => {
  const { token, verified_email } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (verified_email && token) {
      navigate('/', { replace: true, });
    } else if (!token) {
      navigate('/auth/login', { replace: true, });
    }
  }, [verified_email, token]);

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
            <Typography.Title style={{ marginLeft: 15, marginRight: 15, marginTop: 5 }} level={3}>
              Confirmação de <br /> e-mail
            </Typography.Title>
          </div>

          <ContainerLogo>
            <Logo />
          </ContainerLogo>
        </div>
      </div>

      <ContainerSendedEmail>
        <ContainerLottie>
          <Player
            autoplay
            loop
            src={emailSendedJSON}
            style={{
              position: 'absolute',
              top: '50%',
              transform: 'translateY(-50%)',
            }}

          >
            <Controls visible={false} />
          </Player>
        </ContainerLottie>
        <div>
          <Typography.Title level={3}>
            Confirme sua conta!
          </Typography.Title>
          <Typography.Text>
            Um e-mail com um link de confirmação de conta foi enviado para o seu e-mail!
          </Typography.Text>
        </div>
      </ContainerSendedEmail>

    </Container>
  );
}

export default RequireConfirmEmail;
