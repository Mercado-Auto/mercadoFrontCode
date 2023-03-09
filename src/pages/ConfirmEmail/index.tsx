import { Controls, Player } from '@lottiefiles/react-lottie-player';
import { Button, message, notification, Typography } from 'antd';
import React, { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { confirmEmail } from 'src/api/auth';
import { useEffectOnlyOnce } from 'src/hooks/use-effect-only-once';

import emailSendedJSON from 'src/jit-assets/animations/email-sended.json';
import errorJSON from 'src/jit-assets/animations/error.json';
import { getError } from 'src/utils/get-error';

import {
  Container,
  ContainerLogo,
  ContainerLottie,
  ContainerSendedEmail,
  Logo,
} from './styles';

const ConfirmEmail: React.FC = () => {
  const [params] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [isVerified, setIsVerified] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffectOnlyOnce(() => {
    if (params.get('token')) {
      setIsLoading(true);
      confirmEmail({ token: params.get('token') as string })
        .then(() => {
          setIsVerified(false);
          setHasError(false);
        })
        .catch((err) => {
          notification.error(getError(err));
          setIsVerified(false);
          setHasError(true);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, []);

  return (
    <Container>
      <div style={ { margin: -15, marginBottom: 30 } }>
        <div style={ {
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
          flexWrap: 'nowrap'
        } }>
          <div>
            <Typography.Title style={ { marginLeft: 15, marginRight: 15, marginTop: 5 } } level={ 3 }>
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
            src={ hasError ? errorJSON : emailSendedJSON }
            style={ {
              position: 'absolute',
              top: '50%',
              transform: 'translateY(-50%)',
              ...(hasError ? { height: 210, width: '100%' } : {})
            } }

          >
            <Controls visible={ false } />
          </Player>
        </ContainerLottie>
        <div>
          <Typography.Title level={ 3 }>
            {
              hasError
                ? "Error ao confirmar sua conta!"
                : isVerified
                  ? "Conta confirmada com sucesso!"
                  : isLoading ? `Confirmando sua conta...` : `Confirme sua conta!`
            }
          </Typography.Title>
          <Typography.Text>
            {
              hasError
                ? "Você pode tentar novamente recarregando a página!"
                : isVerified
                  ? "Agora você pode fazer login na plataforma"
                  : isLoading ? `Aguarde enquando confirmamos sua conta!` : `Um e-mail com um link de confirmação de conta foi enviado para o seu e-mail!`
            }
          </Typography.Text>

          {
            isVerified && <>
              <br />
              <br />
              <Link replace to="/auth/login">
                <Button>
                  Ir para o login!
                </Button>
              </Link>
            </>
          }

          {
            hasError && <>
              <br />
              <br />
              <Button type="primary" danger onClick={ () => message.info("Em breve!") }>
                Re-enviar link de validação de conta!
              </Button>
            </>
          }
        </div>
      </ContainerSendedEmail>

    </Container>
  );
}

export default ConfirmEmail;
