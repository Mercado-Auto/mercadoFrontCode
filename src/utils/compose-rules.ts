import { FormRule } from "antd";
import { isObject } from "lodash";
import { AllValidators, ALL_VALIDATORS } from './validators';

type RuleType =
  | string
  | boolean
  | number
  | { message?: string; value?: any; };

type Types = 'string'
  | 'number'
  | 'boolean'
  | 'method'
  | 'regexp'
  | 'integer'
  | 'float'
  | 'array'
  | 'object'
  | 'enum'
  | 'date'
  | 'url'
  | 'hex'
  | 'email'
  | 'any';

export type AcceptableRules = {
  required?: RuleType;
  max?: RuleType;
  min?: RuleType;
  len?: RuleType;
  whitespace?: RuleType;
  pattern?: { regexp: RegExp; message: string; };
  type?: Types | {
    value: Types;
    message?: string;
  };
} & Partial<Record<keyof AllValidators, boolean | string>>;

export type RuleGroup = {
  basic: AcceptableRules;
}

export type ValidatorMessage = string | ((value: any) => string);

export const BUILD_IN_RULES: string[] = [
  `required`,
  `max`,
  `min`,
  `len`,
  `pattern`,
  `type`,
];

export const VALIDATORS_MESSAGES: Partial<Record<keyof AcceptableRules, ValidatorMessage>> = {
  required: 'Campo obrigátorio',
  max: (rule) => {
    return `Tamanho máximo ${rule.max}!`;
  },
  min: (rule) => {
    return `Tamanho mínimo ${rule.min}!`;
  },
  len: 'Tamanho näo compatível!',
  pattern: 'Padräo näo compatível!',
  type: 'Tipo näo compatível!',
};

export const RULE_GROUPS: RuleGroup = {
  basic: {
    required: true,
    min: 2,
    max: 512
  },
}

const getConvertedRules = (_rules: AcceptableRules) => {
  const _keys = Object.keys(_rules);

  const _convertedRules = [];

  for (const _rule of _keys) {
    if (_rules.hasOwnProperty(_rule)) {
      const _ruleItem = (_rules as Record<string, RuleType>)[_rule];
      if (_ruleItem && (isObject(_ruleItem) ? _ruleItem.value : true)) {

        let _value = (isObject(_ruleItem) ? _ruleItem.value : _ruleItem);

        _value = _rule !== 'type' && typeof _ruleItem === 'string' ? true : _ruleItem;

        const _message =
          _rule !== 'type' && typeof _ruleItem === 'string'
            ? _ruleItem
            : isObject(_ruleItem) && _ruleItem?.message
              ? _ruleItem?.message
              : (VALIDATORS_MESSAGES as Record<string, string>)[_rule];

        let _ruleObject: FormRule = {};

        const _messageConverted = (typeof _message === 'function'
          ? (): string => (_message as Function)(_ruleObject)
          : _message) as any;

        _ruleObject = {
          ...(_messageConverted ? { message: _messageConverted, } : {}),
        };

        if (BUILD_IN_RULES.includes(_rule)) {
          _ruleObject = {
            ..._ruleObject,
            [_rule]: _value,
          };
        } else {
          const _validator = (ALL_VALIDATORS as Record<string, ((value: any, field: any) => Promise<void | string>)>)?.[_rule];
          _ruleObject = {
            ..._ruleObject,
            validator: async (rule, value) => {
              return await _validator(value, rule);
            },
          };
        }
        _convertedRules.push(_ruleObject);
      }
    }
  }

  return _convertedRules;
}

export const composeRules = (
  rules: (keyof RuleGroup) | AcceptableRules | ((keyof RuleGroup) | AcceptableRules)[]
): FormRule[] => {
  if (Array.isArray(rules)) {
    const _groups: FormRule[] = [];
    for (const _group of rules) {
      let _rules: AcceptableRules = _group as AcceptableRules;

      if (typeof _group === 'string') {
        _rules = RULE_GROUPS[_group];
      }
      
      const _ruleGroup = getConvertedRules(_rules).reduce((o, r) => ({...o, ...r}), {});
      _groups.push(_ruleGroup);
    }
    return _groups;
  } else {
    let _rules: AcceptableRules = rules as AcceptableRules;

    if (typeof rules === 'string') {
      _rules = RULE_GROUPS[rules];
    }
    return getConvertedRules(_rules);
  }
}
