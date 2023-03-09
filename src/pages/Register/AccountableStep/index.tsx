import { Col, Form, FormInstance, Input, Row, Select } from 'antd';
import React from 'react';
import { composeRules } from 'src/utils/compose-rules';
import { MaskedInput } from 'antd-mask-input';
import { DDD_LIST } from 'src/utils/ddd-list';


export type DataStepProps = {
  form: FormInstance<any>
}

const AccountableStep: React.FC<DataStepProps> = ({
  form,
}) => {

  const phoneDDDSelect = (
    <Select
      options={ DDD_LIST }
      defaultValue={ form.getFieldValue('phone_number_ddd') || '88' }
      className="select-ddd"
      onChange={ (value) => form.setFieldValue('phone_number_ddd', value) }
    />
  );

  return (
    <Row gutter={ 15 }>
      <Col md={ 12 } sm={ 24 }>
        <Form.Item
          name="responsible_name"
          label="Nome"
          required
          rules={ composeRules('basic') }
        >
          <Input placeholder='Pedro Ferreira' />
        </Form.Item>
      </Col>
      <Col md={ 12 } sm={ 24 }>
        <Form.Item
          name="responsible_email"
          label="E-mail"
          required
          rules={ composeRules({
            required: true,
            type: 'email'
          }) }
        >
          <Input type="email" placeholder='pedro.ferreira@gmail.com' />
        </Form.Item>
      </Col>
      <Col md={ 12 } sm={ 24 }>
        <Form.Item
          name="responsible_phone"
          label="Celular"
          required
          rules={ composeRules('basic') }
        >
          <MaskedInput
            addonBefore={ phoneDDDSelect }
            mask="{9} 0000-0000"
          />
        </Form.Item>
      </Col>
      <Col md={ 12 } sm={ 24 }>
        <Form.Item name="phone_number_ddd" hidden>
          <Input />
        </Form.Item>
      </Col>
    </Row>
  );
}

export default AccountableStep;
