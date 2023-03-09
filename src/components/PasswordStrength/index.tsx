import { Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { checkPasswordStrength, StrengthTypes } from 'src/utils/check-password-strength';

import { Container, ContainerLevelItem, ContainerLevels } from './styles';

type Props = {
  password?: string;
};

const PasswordStrength: React.FC<Props> = ({
  password,
}) => {
  const [level, setLevel] = useState(StrengthTypes.NONE);
  const [levelsNames] = useState({
    [StrengthTypes.STRONG]: 'Muito forte',
    [StrengthTypes.GOOD]: 'Forte',
    [StrengthTypes.WEAK]: 'Fraca',
    [StrengthTypes.VERY_WEAK]: 'Muito fraca',
    [StrengthTypes.NONE]: '',
  });

  useEffect(() => {
    setLevel(checkPasswordStrength(`${ password || '' }`));
  }, [password]);

  return (
    <Container>
      <ContainerLevels>
        <ContainerLevelItem
          level={
            level > StrengthTypes.NONE ? StrengthTypes.VERY_WEAK : undefined
          }
        />
        <ContainerLevelItem
          level={
            level > StrengthTypes.VERY_WEAK ? StrengthTypes.WEAK : undefined
          }
        />
        <ContainerLevelItem
          level={
            level > StrengthTypes.WEAK ? StrengthTypes.GOOD : undefined
          }
        />
        <ContainerLevelItem
          level={
            level > StrengthTypes.GOOD ? StrengthTypes.STRONG : undefined
          }
        />
      </ContainerLevels>

      <Typography.Text type="secondary">
        { levelsNames[level] }
      </Typography.Text>

    </Container>
  );
}

export default PasswordStrength;
