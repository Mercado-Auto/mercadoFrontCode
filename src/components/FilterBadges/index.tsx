import React, { useId } from 'react';
import { Tag } from 'antd';
import { KEYS_MAPS } from './keys-map';

import { Container } from './styles';

export type IFilterBadgesProps = {
  value?: Record<string, any>;
  reMapsKeys?: Record<string, string>;
  onRemove?: (key: string) => void;
};

const FilterBadges: React.FC<IFilterBadgesProps> = ({
  value,
  reMapsKeys,
  onRemove,
}) => {
  const $id = useId();
  const reMaps = reMapsKeys ? { ...KEYS_MAPS, ...reMapsKeys } : KEYS_MAPS;

  const _value = Object
    .keys(value || {})
    .filter((key) => (value || {})[key])
    .reduce((o, k) => {
      o[k] = (value || {})[k];
      return o;
    }, {} as Record<string, any>)

  if (!Object.keys(_value).length) {
    return null;
  }

  return (
    <Container>
      <p>Filtrando por:</p>
      { Object.keys(_value)
        .map((key, index) => {

          return (
            <Tag key={ `${ $id }-${ index }-tag-filter` } closable onClose={ () => onRemove && onRemove(key) }>
              { reMaps[key] || key }
            </Tag>
          )
        }) }
    </Container>
  );
}

export default FilterBadges;
