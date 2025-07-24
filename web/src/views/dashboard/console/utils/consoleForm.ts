import { NInput, NSelect } from 'naive-ui';

export const consoleFilterFormSchemas = [
  {
    field: 'id',
    component: NInput,
    label: 'ID',
    componentProps: {
      placeholder: '请输入ID',
    },
  },
  {
    field: 'taskName',
    component: NInput,
    label: '任务名',
    componentProps: {
      placeholder: '请输入任务名',
    },
  },
  {
    field: 'taskProgress',
    component: NSelect,
    label: '任务进度',
    componentProps: {
      placeholder: '选择任务进度',
      options: [
        { label: '全部', value: '' },
        { label: '进行中', value: 'progressing' },
        { label: '已完成', value: 'completed' },
        { label: '失败', value: 'failed' },
      ],
    },
  },
  {
    field: 'mergeStatus',
    component: NSelect,
    label: '合并状态',
    componentProps: {
      placeholder: '选择合并状态',
      options: [
        { label: '全部', value: '' },
        { label: '已合并', value: 'merged' },
        { label: '未合并', value: 'unmerged' },
      ],
    },
  },
];
