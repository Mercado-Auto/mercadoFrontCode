import { StrengthTypes } from 'src/utils/check-password-strength';
import styled from 'styled-components';

export const Container = styled.div.attrs({
  className: `password-strength-container`,
})`
  display: block;
  width: 100%;
  padding-top: 5px;
  padding-bottom: 15px;
`;

export const ContainerLevels = styled.div.attrs({
  className: `password-strength-levels-container`,
})`
  display: flex;
  flex-wrap: nowrap;
  margin-bottom: 10px;
  margin-left: -5px;
  margin-right: -5px;
`;

export const ContainerLevelItem = styled.div.attrs({
  className: `password-strength-level-item-container`,
}) <{ level?: StrengthTypes; }>`
  margin: 0px 5px;
  border-radius: 3px;
  height: 5px;
  width: 100%;
  background: ${ ({ level }) => ({
    [StrengthTypes.STRONG]: '#00bcd4',
    [StrengthTypes.GOOD]: '#4caf50',
    [StrengthTypes.WEAK]: '#ff9800',
    [StrengthTypes.VERY_WEAK]: '#f44336',
    [StrengthTypes.NONE]: '#696464',
  })[level ?? StrengthTypes.NONE] };
`;
