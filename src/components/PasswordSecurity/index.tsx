import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { Typography } from 'antd';
import React, { useId, useMemo } from 'react';

import { Container, RuleItem, RuleItemIcon } from './styles';

type Props = {
  password?: string;
};

export const PASSWORD_STAGES = [
  {
    name: `Mínimo de 6 caracteres`,
    fn: (value?: string) => !value ? false : value.length >= 6,
  },
  {
    name: `Incluir letras minúsculas`,
    fn: (value?: string) => !value
      ? false
      : /[a-z]/gm.test(value),
  },
  {
    name: `Incluir letras maiúsculas`,
    fn: (value?: string) => !value
      ? false
      : /[A-Z]/gm.test(value),
  },
  {
    name: `Incluir numéricos`,
    fn: (value?: string) => !value
      ? false
      : /\d/gm.test(value),
  },
  {
    name: `Incluir caracteres especiais: .,!,@,#,$,%,^,&,*,?,_,~,-,(,),[,]`,
    fn: (value?: string) => !value
      ? false
      : /[.,!,@,#,$,%,^,&,*,?,_,~,-,(,),[,\],]/gm.test(value),
  },
];

const PasswordSecurity: React.FC<Props> = ({
  password,
}) => {
  const $id = useId();

  const items = useMemo(() => {
    return PASSWORD_STAGES
      .map((stage, index) => {
        const ok = stage.fn(password);

        return (
          <RuleItem key={ `${ $id }-rule-item-${ index }` }>
            <Typography.Text type={ ok ? 'success' : 'secondary' } >
              <RuleItemIcon>
                { ok ? <CheckOutlined /> : <CloseOutlined /> }
              </RuleItemIcon>
              { stage.name }
            </Typography.Text>
          </RuleItem>
        );
      })
  }, [password, $id]);

  return (
    <Container>
      { items }
    </Container>
  );
}

export default PasswordSecurity;
