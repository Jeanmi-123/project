<template>
  <div class="min-h-screen flex flex-col items-center py-5 px-2">
    <n-card :bordered="false" class="rounded-xl shadow" title="拉群任务">
      <!-- 搜索表单 -->
      <div class="mb-6">
        <BasicForm
          @register="register"
          @submit="reloadTable"
          @reset="reloadTable"
          @keyup.enter="reloadTable"
        >
          <template #statusSlot="{ model, field }">
            <n-input v-model:value="model[field]" />
          </template>
        </BasicForm>
      </div>

      <!-- 批量操作区 -->
      <div class="flex flex-wrap gap-2 justify-end">
        <n-space>
          <n-button type="warning" @click="handleBatchDeleteFailed">
            <template #icon>
              <n-icon>
                <DeleteOutlined />
              </n-icon>
            </template>
            一键删除失败任务
          </n-button>
          <n-button type="info" @click="handlePullTask">
            <template #icon>
              <n-icon>
                <UsergroupAddOutlined />
              </n-icon>
            </template>
            拉群任务
          </n-button>
          <n-button type="info" @click="handleRefreshTag">
            <template #icon>
              <n-icon>
                <RedoOutlined />
              </n-icon>
            </template>
            刷新拉手标签
          </n-button>
          <n-button type="default" @click="handleAutoPackage">
            <template #icon>
              <n-icon>
                <FolderOutlined />
              </n-icon>
            </template>
            自动分包
          </n-button>
        </n-space>
        <n-space>
          <n-button type="primary">
            <template #icon>
              <n-icon>
                <ExportOutlined />
              </n-icon>
            </template>
            导出报告
          </n-button>
          <n-button type="primary">
            <template #icon>
              <n-icon>
                <ExportOutlined />
              </n-icon>
            </template>
            导出群链接
          </n-button>
          <n-button type="primary" @click="handleBatchLogDetail">
            <template #icon>
              <n-icon>
                <ExportOutlined />
              </n-icon>
            </template>
            日志详情
          </n-button>
          <n-button type="default">
            <template #icon>
              <n-icon>
                <UsergroupAddOutlined />
              </n-icon>
            </template>
            批量发起合群申请
          </n-button>

          <n-button type="error" @click="handleDeleteSelected">
            <template #icon>
              <n-icon>
                <DeleteOutlined />
              </n-icon>
            </template>
            删除任务
          </n-button>
        </n-space>
      </div>

      <!-- 数据表格 -->

      <BasicTable
        :openChecked="true"
        :columns="columns"
        :request="loadDataTable"
        :row-key="(row) => row.id"
        ref="actionRef"
        :actionColumn="actionColumn"
        :scroll-x="scrollX"
        :resizeHeightOffset="-10000"
        size="small"
      />
    </n-card>
  </div>
</template>

<script lang="ts" setup>
  import { computed, h, reactive, ref } from 'vue';
  import { NTag, NButton, NSpace, NTooltip, NIcon } from 'naive-ui';
  import { BasicTable, TableAction } from '@/components/Table';
  import { BasicForm, useForm } from '@/components/Form/index';
  import {
    DeleteOutlined,
    UsergroupAddOutlined,
    RedoOutlined,
    ExportOutlined,
    FolderOutlined,
  } from '@vicons/antd';
  import { useConsoleActions } from './utils/consoleConFun';
  import { consoleFilterFormSchemas } from './utils/consoleForm';

  const actionRef = ref();
  const scrollX = ref(1500); // Placeholder for scrollX
  const {
    reloadTable,

    handleBatchDeleteFailed,
    handlePullTask,
    handleRefreshTag,
    handleAutoPackage,
    handleDeleteSelected,
    handleAction,
    handleBatchLogDetail,
  } = useConsoleActions(actionRef);

  const actionColumn = reactive({
    width: 200,
    title: '操作',
    key: 'action',
    fixed: 'right',
    render(record: any) {
      return h(TableAction as any, {
        style: 'button',
        actions: [
          {
            label: '继续执行',
            onClick: () => handleAction('continue', record),
            type: 'info',
            size: 'small',
          },
          {
            label: '结束任务',
            onClick: () => handleAction('end', record),
            type: 'error',
            size: 'small',
          },
        ],
      });
    },
  });

  function handleViewGroup(link: string) {
    window.open(link, '_blank');
  }

  const columns = reactive([
    { type: 'selection' },
    { title: 'ID', key: 'id', width: 100, fixed: 'left' },
    { title: '任务名', key: 'taskName', width: 150, fixed: 'left' },
    {
      title: '任务备注',
      key: 'taskRemarks',
      width: 300,
      render(row: any) {
        return h(
          NSpace,
          { size: 'small', wrap: false, style: { width: '100%', flexWrap: 'nowrap' } },
          {
            default: () => [
              h(
                NTag,
                {
                  type: row.status === '完成' ? 'success' : 'error',
                  size: 'small',
                  style: { flexShrink: 0 },
                },
                { default: () => row.status }
              ),
              h(NTooltip, null, {
                trigger: () =>
                  h(
                    'span',
                    {
                      style: {
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        flexGrow: 1,
                        minWidth: 0,
                      },
                    },
                    row.taskRemarks
                  ),
                default: () => row.taskRemarks,
              }),
            ],
          }
        );
      },
    },

    {
      title: '异常/进入',
      key: 'exceptionEntry',
      width: 120,
    },
    {
      title: '群人数',
      key: 'groupCount',
      width: 100,
    },
    {
      title: '管理员',
      key: 'manager',
      width: 120,
      render(row: any) {
        return h(
          'a',
          { href: 'javascript:;', style: 'color: #1890ff; text-decoration: none;' },
          row.manager
        );
      },
    },
    {
      title: '任务模式',
      key: 'taskMode',
      width: 120,
      render(row: any) {
        return h(NTag, { type: 'default', size: 'small' }, { default: () => row.taskMode });
      },
    },
    {
      title: '创建时间',
      key: 'createTime',
      width: 160,
    },
    {
      title: '群链接',
      key: 'groupLink',
      width: 250,
      render(row: any) {
        return h(
          NSpace,
          { size: 'small' },
          {
            default: () => [
              h(
                NButton,
                {
                  type: 'info',
                  text: true,
                  size: 'small',
                  onClick: () => handleViewGroup(row.groupLink),
                },
                { default: () => '群聊' }
              ),
              h(
                'a',
                {
                  href: row.groupLink,
                  target: '_blank',
                  style: 'color: #1890ff; text-decoration: none;',
                },
                row.groupLink
              ),
            ],
          }
        );
      },
    },
    {
      title: '进群/封禁/抢登/风控',
      key: 'riskInfo',
      width: 200,
      render: () => '--/--/--/--',
    },
  ]);

  // 模拟数据加载
  const loadDataTable = async (res: any) => {
    console.log('Loading data with params:', res);
    // Replace with actual API call
    const mockData = [
      {
        id: 64454607,
        taskName: '104 (7)_071',
        taskRemarks: '完成',
        status: '完成',
        groupLink: 'https://example.com/152059YXNGvaiOe',
        exceptionEntry: '正常/进入',
        groupCount: 50,
        manager: '201211995847',
        taskMode: '多拉模式',
        createTime: '2024-07-26 10:00:00',
      },
      {
        id: 64454129,
        taskName: '104 (7)_071',
        taskRemarks:
          '拉手号添加联系人，错误failed to...拉手号添加联系人，错误failed to拉手号添加联系人，错误failed to拉手号添加联系人，错误failed to',
        status: '失败',
        groupLink: 'https://example.com/152008hkVKorvdcdy',
        exceptionEntry: '异常/未进入',
        groupCount: 30,
        manager: '201220952303',
        taskMode: '多拉模式',
        createTime: '2024-07-25 15:30:00',
      },
      {
        id: 64453860,
        taskName: '106 (6)_100',
        taskRemarks: '完成',
        status: '完成',
        groupLink: 'https://example.com/151945TwNxckMVT',
        exceptionEntry: '正常/进入',
        groupCount: 60,
        manager: '201211749703',
        taskMode: '多拉模式',
        createTime: '2024-07-24 11:00:00',
      },
      {
        id: 64453859,
        taskName: '106 (6)_095',
        taskRemarks: '完成',
        status: '完成',
        groupLink: 'https://example.com/151948JHReXrcOHyNVL',
        exceptionEntry: '正常/进入',
        groupCount: 45,
        manager: '201220031350',
        taskMode: '多拉模式',
        createTime: '2024-07-23 09:15:00',
      },
      {
        id: 64453777,
        taskName: '106 (6)_084',
        taskRemarks: '完成',
        status: '完成',
        groupLink: 'https://example.com/151945kekLrCXJRSgW',
        exceptionEntry: '正常/进入',
        groupCount: 55,
        manager: '201220031350',
        taskMode: '多拉模式',
        createTime: '2024-07-22 14:00:00',
      },
      {
        id: 64453583,
        taskName: '106 (6)_100',
        taskRemarks: '拉手号邀请成员，错误Invitation failed...',
        status: '失败',
        groupLink: 'https://example.com/151917ClaZpsiJoNDTeM',
        exceptionEntry: '异常/未进入',
        groupCount: 20,
        manager: '201220064729',
        taskMode: '多拉模式',
        createTime: '2024-07-21 16:45:00',
      },
    ];
    return { list: mockData, pageNum: 1, pageSize: 10, total: 100 };
  };

  const [register] = useForm({
    gridProps: { cols: '1 s:1 m:2 l:3 xl:4 2xl:4' },
    labelWidth: 80,
    schemas: consoleFilterFormSchemas,
  });

  // 计算scrollX，根据实际列数和actionColumn的宽度来动态调整
  scrollX.value = computed(() => {
    const totalColumnsWidth = columns.reduce((sum, col) => sum + (col.width || 0), 0);
    return totalColumnsWidth + actionColumn.width;
  }).value;
</script>
