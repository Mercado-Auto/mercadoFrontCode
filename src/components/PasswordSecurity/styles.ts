import styled from 'styled-components';

export const Container = styled.div.attrs({
  className: `password-security-container`,
})`
  display: block;
  width: 100%;
  margin: 15px 0px 15px 0px;
  padding-top: 10px;
`;

export const RuleItem = styled.div.attrs({
  className: `password-security-rule-item-container`,
})`
`;

export const RuleItemIcon = styled.span.attrs({
  className: `password-security-rule-item-icon-container`,
})`
  margin-right: 5px;
`;
