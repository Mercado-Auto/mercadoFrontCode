import React from 'react';
import { Col, Form, FormInstance, Input, InputNumber, Row } from 'antd';
import { useMutation } from 'react-query';
import { viaCep as viaCepHandler } from 'src/api/viacep';
import { composeRules } from 'src/utils/compose-rules';
import { MaskedInput } from 'antd-mask-input';
import { removeMasksChars } from 'src/utils/remove-masks-chars';
import { useReadCitiesCombobox } from 'src/queries/public/city';
import DebounceSelect from 'src/components/DebounceSelect';


export type DataStepProps = {
  form: FormInstance<any>
}

const AddressStep: React.FC<DataStepProps> = ({
  form,
}) => {
  const {
    mutateAsync: loadCitiesOptions
  } = useReadCitiesCombobox();

  const viaCep = useMutation(viaCepHandler, {
    onSuccess: (response) => {
      form.setFieldsValue({
        address_street: response.data.logradouro || '',
        address_district: response.data.bairro || '',
        address_complement: response.data.complemento || '',
        phone_number_ddd: response.data.ddd || '88',
      });
    },
  });

  const onSearchCEP = () => {
    let cep: string = removeMasksChars(form.getFieldValue(`address_cep`));

    if (cep.length === 8) {
      viaCep.mutate(cep);
    }
  };

  return (
    <Row gutter={ 15 }>
      <Col md={ 12 } sm={ 24 }>
        <Form.Item
          name="address_cep"
          label="CEP"
          required
          rules={ composeRules({
            required: true,
            cep: true,
          }) }
        >
          <MaskedInput
            mask="00000-000"
            disabled={ viaCep.isLoading }
            onChange={ onSearchCEP }
          />
        </Form.Item>
      </Col>
      <Col md={ 12 } sm={ 24 }>
        <Form.Item
          name="address_street"
          label="Rua"
          required
          rules={ composeRules('basic') }
        >
          <Input placeholder='Ex.: Rua dos sonhos' />
        </Form.Item>
      </Col>
      <Col md={ 12 } sm={ 24 }>
        <Form.Item
          name="address_number"
          label="Número"
          required
          rules={ composeRules({
            required: true,
            min: 0
          }) }
        >
          <InputNumber className='i-num-block' min={ 0 } placeholder='Ex.: 130' />
        </Form.Item>
      </Col>
      <Col md={ 12 } sm={ 24 }>
        <Form.Item
          name="address_district"
          label="Bairro"
          required
          rules={ composeRules('basic') }
        >
          <Input placeholder='Ex.: Bairro alegre' />
        </Form.Item>
      </Col>
      <Col md={ 12 } sm={ 24 }>
        <Form.Item
          name="address_city"
          label="Cidade/UF"
          required
          rules={ composeRules('basic') }
        >
          <DebounceSelect
            placeholder="Selecione uma cidade"
            showSearch
            fetchOptions={ (term) => loadCitiesOptions({ name: term }) }
            labelProp="name"
            valueProp="id"
            shouldLoadOnInit
            renderLabel={ (item) => `${ item.name }/${ item.uf }` }
          />
        </Form.Item>
      </Col>
      <Col md={ 12 } sm={ 24 }>
        <Form.Item
          name="address_complement"
          label="Complemento"
          rules={ composeRules({ min: 3 }) }
        >
          <Input placeholder='Ex.: Casa portäo branco' />
        </Form.Item>
      </Col>
    </Row>
  );
}

export default AddressStep;
