import { NInput, NSelect } from 'naive-ui';

export const workplaceFilterFormSchemas = [
  {
    field: 'taskName',
    component: NInput,
    label: '任务名',
    componentProps: {
      placeholder: '请输入任务名',
    },
  },
  {
    field: 'status',
    component: NSelect,
    label: '状态',
    slot: 'statusSlot',
  },
];
