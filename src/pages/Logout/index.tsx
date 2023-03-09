import React, { useEffect, useState } from 'react';
import { Controls, Player } from '@lottiefiles/react-lottie-player';

import { Typography } from 'antd';

import { Container, LottieWrapper } from './styles';
import { useAuth } from 'src/contexts/Auth';

const Logout: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const { logout } = useAuth();

  useEffect(() => {
    setLoading(true);
    logout(false);

    let pid_loader!: NodeJS.Timeout;
    let pid_redirect!: NodeJS.Timeout;

    pid_loader = setTimeout(() => {
      setLoading(false);

      pid_redirect = setTimeout(() => {
        setTimeout(() => {
          window.location.replace('/auth/login');
        }, 0);
      }, 2_000);
    }, 1_000);

    return () => {
      pid_loader && clearTimeout(pid_loader);
      pid_redirect && clearTimeout(pid_redirect);
    };
  }, [logout]);

  return (
    <Container>
      <LottieWrapper>
        <Player
          autoplay
          loop
          src={ "https://assets3.lottiefiles.com/packages/lf20_adk75zud.json" }
        >
          <Controls visible={ false } />
        </Player>
      </LottieWrapper>
      <div>
        <Typography.Title level={ 4 }>
          { loading && "Saindo da sua conta..." }
          { !loading && "Voltando para a tela de login!" }
        </Typography.Title>
      </div>
    </Container>
  );
}

export default Logout;
