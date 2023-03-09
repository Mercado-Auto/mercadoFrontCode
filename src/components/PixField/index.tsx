import {Col, Form, Input, Row, Select} from 'antd';
import { MaskedInput } from 'antd-mask-input';
import React, { useId } from 'react';
import { composeRules } from 'src/utils/compose-rules';
import { PixTypes } from 'src/utils/enums';
import { LIST_PIX_TYPES } from 'src/utils/lists';
import {DDD_LIST} from "../../utils/ddd-list";

export type IPixFieldProps = {
  pixTypeField?: string;
  pixField?: string;
  pixLabel?: string;
  initialTypePixValue?: string;
  initialPixValue?: string;
  isRequired?: boolean;
}

const PixField: React.FC<IPixFieldProps> = ({
  pixTypeField = 'bank_type_pix',
  pixField = 'bank_pix',
  initialTypePixValue = 'cpf',
  initialPixValue,
  isRequired = false,
}) => {
  const $id = useId();

  const phoneDDDSelect = (
    <Form.Item noStyle shouldUpdate={() => true}>
      {form => (
        <Form.Item noStyle name={'phone_number_ddd_pix'}>
          <Select
            options={ DDD_LIST }
            defaultValue={ form.getFieldValue('phone_number_ddd_pix') || '88' }
            className="select-ddd"
          />
        </Form.Item>
      )}
    </Form.Item>
  );

  return (
    <Row gutter={15}>
      <Col md={24}>
        <Form.Item noStyle shouldUpdate={() => true}>
          {(form) => {
            return (
              <Form.Item initialValue={initialTypePixValue} name={pixTypeField} label="Tipo da chave">
                <Select onChange={() => form.setFieldValue(pixField, null)}>
                  {LIST_PIX_TYPES.map((type, index) => (
                    <Select.Option key={`${$id}-pix-type-${index}`} value={type.value}>{type.label}</Select.Option>)
                  )}
                </Select>
              </Form.Item>
            );
          }}
        </Form.Item>
      </Col>
      <Col md={24}>
        <Form.Item noStyle shouldUpdate={() => true}>
          {(form) => {
            const type = form.getFieldValue(pixTypeField);

            let rules = ({
              [PixTypes.CPF]: composeRules({
                required: isRequired,
                cpf: true,
              }),
              [PixTypes.CNPJ]: composeRules({
                required: isRequired,
                cnpj: true,
              }),
              [PixTypes.EMAIL]: composeRules({
                required: isRequired,
                type: 'email'
              }),
              [PixTypes.PHONE]: composeRules({
                required: isRequired,
              }),
              [PixTypes.RANDON_KEY]: composeRules({
                required: isRequired,
              }),
            } as any)[type] || composeRules({});

            let element: React.ReactNode;

            if ([PixTypes.CPF, PixTypes.CNPJ, PixTypes.PHONE, PixTypes.RANDON_KEY].includes(type)) {
              const masks: Record<any, string> = {
                [PixTypes.CPF]: `000.000.000-00`,
                [PixTypes.CNPJ]: `00.000.000/0000-00`,
                [PixTypes.RANDON_KEY]: `********-****-****-****-************`,
              };

              if (type === PixTypes.PHONE) {
                element = (
                  <MaskedInput
                    addonBefore={ phoneDDDSelect }
                    mask="{9} 0000-0000"
                  />
                );
              } else {
                element = (
                  <MaskedInput
                    mask={masks?.[type] || masks[PixTypes.CPF]}
                  />
                );
              }
            } else {
              element = (
                <Input
                  placeholder="seu@email.com"
                />
              );
            }

            if (element) {
              return (
                <Form.Item
                  name={pixField}
                  label="Chave pix"
                  initialValue={initialPixValue}
                  rules={rules}
                >
                  {element}
                </Form.Item>
              );
            }

            return null;
          }}
        </Form.Item>
      </Col>
    </Row>
  )
}

export default PixField;
