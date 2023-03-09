import React from 'react';
import debounce from 'lodash/debounce';
import { Select, Spin } from 'antd';
import { SelectProps } from 'antd/es/select';
import { useEffectOnlyOnce } from 'src/hooks/use-effect-only-once';



export interface DebounceSelectProps<ValueType = any>
  extends Omit<SelectProps<ValueType>, 'options' | 'children'> {
  fetchOptions?: (search: string) => Promise<ValueType[]>;
  afterFetchOptions?: (options?: any[]) => void;
  debounceTimeout?: number;
  labelProp?: string;
  valueProp?: string | false;
  startsWithSearch?: boolean;
  initialOptions?: ValueType[];
  filterOptions?: (options?: any[]) => any[];
  shouldLoadOnInit?: string | boolean;
  block?: boolean;
  renderLabel?: (item: ValueType) => string | null | React.ReactNode;
}

function DebounceSelect<
  ValueType extends { key?: string; label: React.ReactNode; value: string | number } = any,
> ({
  fetchOptions,
  afterFetchOptions,
  debounceTimeout = 800,
  valueProp = 'value',
  labelProp = 'label',
  startsWithSearch,
  initialOptions = [],
  filterOptions,
  block = true,
  shouldLoadOnInit = false,
  renderLabel,
  ...props
}: DebounceSelectProps) {

  const [fetching, setFetching] = React.useState(false);
  const [options, setOptions] = React.useState<ValueType[]>(initialOptions);
  const fetchRef = React.useRef(0);

  const debounceFetcher = React.useMemo(() => {
    if (fetchOptions) {
      const loadOptions = (value: string) => {
        fetchRef.current += 1;
        const fetchId = fetchRef.current;
        setOptions([]);
        setFetching(true);

        fetchOptions(value).then(newOptions => {
          if (fetchId !== fetchRef.current) {
            // for fetch callback order
            return;
          }

          setOptions(newOptions);
          afterFetchOptions && afterFetchOptions(newOptions);
          setFetching(false);
        });
      };

      return debounce(loadOptions, debounceTimeout);
    }
  }, [fetchOptions, debounceTimeout, afterFetchOptions]);

  useEffectOnlyOnce(() => {
    if (shouldLoadOnInit) {
      debounceFetcher?.(typeof shouldLoadOnInit === 'string' ? shouldLoadOnInit : '');
    }
  }, []);

  return (
    <Select<ValueType>
      filterOption={ false }
      onSearch={ debounceFetcher }
      notFoundContent={ fetching ? <Spin size="small" /> : null }
      { ...(block ? { style: { width: `100%` } } : {}) }
      { ...props }
      { ...props.labelInValue ? {
        options: (filterOptions ? filterOptions(options) : options).map((item: any) => ({
          value: valueProp ? item[valueProp || 'value'] : JSON.stringify(item),
          label: renderLabel ? renderLabel(item) : item[labelProp || 'label'],
        }))
      } : {} }
    >
      { !props.labelInValue ? (filterOptions ? filterOptions(options) : options).map((option: any) => {
        const value = valueProp ? option[valueProp || 'value'] : JSON.stringify(option);

        return (
          <Select.Option
            key={ value }
            value={ value }
          >
            { renderLabel ? renderLabel(option) : option[labelProp || 'label'] }
          </Select.Option>
        );
      }) : null }
    </Select>
  );
}


export default DebounceSelect;
