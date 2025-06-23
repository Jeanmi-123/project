<template>
  <div class="min-h-screen bg-gray-50 flex flex-col items-center py-5 px-2">
    <n-card :bordered="false" class="rounded-xl shadow" title="任务管理">
      <!-- 搜索表单 -->
      <div class="mb-6">
        <BasicForm
          @register="register"
          @submit="reloadTable"
          @reset="reloadTable"
          @keyup.enter="reloadTable"
          :showAdvancedButton="false"
        >
          <template #statusSlot="{ model, field }">
            <n-select
              v-model:value="model[field]"
              :options="statusOptions"
              placeholder="请选择状态"
              style="width: 100%"
            />
          </template>
        </BasicForm>
      </div>

      <!-- 批量操作区 -->
      <div class="flex flex-wrap gap-2 justify-end mb-4 border-b pb-4">
        <n-space>
          <n-button type="primary" @click="onCreateTask">新建任务</n-button>
          <n-button type="error" @click="onBatchDelete">批量删除</n-button>
        </n-space>
      </div>

      <!-- 数据表格 -->
      <div class="mt-6">
        <BasicTable
          :openChecked="true"
          :columns="columns"
          :request="loadDataTable"
          :pagination="pagination"
          ref="actionRef"
          :row-key="(row) => row.id"
          :checked-row-keys="checkedIds"
          @update:checked-row-keys="onCheckedRow"
          :scroll-x="scrollX"
          :resizeHeightOffset="-10000"
          size="small"
          :actionColumn="actionColumn"
        >
          <template #tableTitle>
            <n-space>
              <span>已选择 {{ checkedIds.length }} 项</span>
              <n-button text type="primary" @click="clearChecked" class="ml-2">清空</n-button>
            </n-space>
          </template>
        </BasicTable>
      </div>
    </n-card>
  </div>
</template>

<script lang="ts" setup>
  import { ref, h, computed } from 'vue';
  import { NButton, NSpace, NCard } from 'naive-ui';
  import { BasicTable, TableAction } from '@/components/Table';
  import { BasicForm, useForm } from '@/components/Form/index';

  const checkedIds = ref<number[]>([]);
  const actionRef = ref();
  const scrollX = ref(1500);

  const statusOptions = [
    { label: '全部', value: '' },
    { label: '待办', value: 'todo' },
    { label: '进行中', value: 'doing' },
    { label: '已完成', value: 'done' },
  ];

  const actionColumn = {
    width: 140,
    title: '操作',
    key: 'action',
    fixed: 'right',
    render(record: any) {
      return h(TableAction as any, {
        style: 'button',
        actions: [
          { label: '编辑', onClick: () => onEdit(record), type: 'primary' },
          { label: '删除', onClick: () => onDelete(record), type: 'error' },
          { label: '详情', onClick: () => onDetail(record) },
        ],
      });
    },
  };

  const columns = [
    { type: 'selection', width: 30 },
    { title: 'ID', key: 'id', width: 30, fixed: 'left' },
    { title: '任务名', key: 'taskName', width: 100, fixed: 'left' },
    { title: '状态', key: 'status', width: 80 },
    {
      title: '管理员',
      key: 'manager',
      width: 120,
      render(row) {
        return h(
          'a',
          { href: 'javascript:;', style: 'color: #1890ff; textDecoration: none;' },
          row.manager
        );
      },
    },
    { title: '创建时间', key: 'createTime', width: 160 },
    { title: '最后修改时间', key: 'lastUpdateTime', width: 160 },
  ];

  const allData = [
    {
      id: 1,
      taskName: '104 (7)_071',
      status: 'todo',
      manager: '201211995847',
      createTime: '2024-07-26 10:00:00',
      lastUpdateTime: '2024-07-26 11:00:00',
    },
    {
      id: 2,
      taskName: '104 (7)_071',
      status: 'doing',
      manager: '201220952303',
      createTime: '2024-07-25 15:30:00',
      lastUpdateTime: '2024-07-25 16:00:00',
    },
    {
      id: 3,
      taskName: '106 (6)_100',
      status: 'done',
      manager: '201211749703',
      createTime: '2024-07-24 11:00:00',
      lastUpdateTime: '2024-07-24 12:00:00',
    },
    {
      id: 4,
      taskName: '106 (6)_095',
      status: 'todo',
      manager: '201220031350',
      createTime: '2024-07-23 09:15:00',
      lastUpdateTime: '2024-07-23 10:00:00',
    },
    {
      id: 5,
      taskName: '106 (6)_084',
      status: 'doing',
      manager: '201220031350',
      createTime: '2024-07-22 14:00:00',
      lastUpdateTime: '2024-07-22 15:00:00',
    },
    {
      id: 6,
      taskName: '106 (6)_100',
      status: 'done',
      manager: '201220064729',
      createTime: '2024-07-21 16:45:00',
      lastUpdateTime: '2024-07-21 17:00:00',
    },
  ];

  const loadDataTable = async (params) => {
    // params 里有 taskName/status，可用来做筛选
    const filtered = allData.filter((item) => {
      const matchName = !params.taskName || item.taskName.includes(params.taskName);
      const matchStatus = !params.status || item.status === params.status;
      return matchName && matchStatus;
    });
    return {
      list: filtered,
      pageNum: 1,
      pageSize: 10,
      total: filtered.length,
    };
  };

  const pagination = { pageSize: 10 };

  const [register, { resetFields }] = useForm({
    gridProps: { cols: '1 s:1 m:2 l:3 xl:4 2xl:4' },
    labelWidth: 80,
    schemas: [
      {
        field: 'taskName',
        component: 'NInput',
        label: '任务名',
        componentProps: {
          placeholder: '请输入任务名',
        },
      },
      {
        field: 'status',
        component: 'NSelect',
        label: '状态',
        slot: 'statusSlot',
      },
    ],
  });

  function reloadTable() {
    actionRef.value.reload();
  }

  function onCreateTask() {
    // 新建任务逻辑
  }
  function onBatchDelete() {
    // 批量删除逻辑
  }
  function onCheckedRow(rowKeys: number[]) {
    checkedIds.value = rowKeys;
  }
  function clearChecked() {
    checkedIds.value = [];
  }
  function onEdit(record) {
    // 编辑逻辑
  }
  function onDelete(record) {
    // 删除逻辑
  }
  function onDetail(record) {
    // 详情逻辑
  }
  // 计算scrollX，根据实际列数和actionColumn的宽度来动态调整
  scrollX.value = computed(() => {
    const totalColumnsWidth = columns.reduce((sum, col) => sum + (col.width || 0), 0);
    return totalColumnsWidth + actionColumn.width;
  }).value;
</script>
