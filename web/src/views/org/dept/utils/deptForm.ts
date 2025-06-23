import {
  riskStatusOptions,
  accountStatusOptions,
  ipGroupOptions,
  accountVersionOptions,
  tagOptions,
  yesNoOptions,
} from '@/utils/selectOptions';

export const deptFilterFormSchemas = [
  {
    field: 'account',
    component: 'NInput',
    label: '账号',
    componentProps: {
      placeholder: '请输入账号',
      clearable: true,
    },
  },
  {
    field: 'riskStatus',
    component: 'NSelect',
    label: '风控状态',
    componentProps: {
      placeholder: '请选择风控状态',
      options: riskStatusOptions,
      clearable: true,
    },
  },
  {
    field: 'accountStatus',
    component: 'NSelect',
    label: '账号状态',
    componentProps: {
      placeholder: '请选择账号状态',
      options: accountStatusOptions,
      clearable: true,
    },
  },
  {
    field: 'ipGroup',
    component: 'NSelect',
    label: 'IP分组',
    componentProps: {
      placeholder: '请选择IP分组',
      options: ipGroupOptions,
      clearable: true,
    },
  },
  {
    field: 'accountVersion',
    component: 'NSelect',
    label: '账号版本',
    componentProps: {
      placeholder: '请选择账号版本',
      options: accountVersionOptions,
      clearable: true,
    },
  },
  {
    field: 'tag',
    component: 'NSelect',
    label: '标签',
    componentProps: {
      placeholder: '请选择标签',
      options: tagOptions,
      clearable: true,
    },
  },
  {
    field: 'hasAvatar',
    component: 'NSelect',
    label: '是否设置头像',
    componentProps: {
      placeholder: '请选择',
      options: yesNoOptions,
      clearable: true,
    },
  },
  {
    field: 'isReRegister',
    component: 'NSelect',
    label: '是否重新注册',
    componentProps: {
      placeholder: '请选择',
      options: yesNoOptions,
      clearable: true,
    },
  },
];
