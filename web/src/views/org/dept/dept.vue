<template>
  <div class="min-h-screen py-4 px-2">
    <!-- 顶部横向卡片导航（有数字） -->
    <n-grid :cols="6" x-gap="16" y-gap="0" class="mb-4">
      <n-gi v-for="item in navCardList" :key="item.title">
        <div
          class="bg-[#18181c] rounded-lg shadow flex flex-col items-center justify-center py-3 min-h-[80px] transition-shadow hover:shadow-lg"
        >
          <div class="flex items-center gap-2 mb-2">
            <div :style="{ color: item.color }">
              <n-icon size="16">
                <component :is="item.icon" />
              </n-icon>
            </div>
            <div class="text-base font-medium">{{ item.title }}</div>
          </div>
          <div class="text-lg font-bold">{{ item.value }}</div>
        </div>
      </n-gi>
    </n-grid>

    <n-card
      class="rounded-lg shadow mb-4"
      :bordered="false"
      content-style="padding: 12px 12px 0 12px;"
    >
      <!-- 筛选表单 -->
      <div class="mb-4">
        <BasicForm
          @register="register"
          @submit="reloadTable"
          @reset="resetFields"
          @keyup.enter="reloadTable"
        />
      </div>

      <!-- 操作按钮 -->
      <n-space justify="end" size="small" class="flex flex-wrap gap-2" style="margin-bottom: 1%">
        <n-button type="primary" size="medium">
          <template #icon>
            <n-icon>
              <StopOutlined />
            </n-icon>
          </template>
          一键移除封禁账号
        </n-button>
        <n-button size="medium">
          <template #icon>
            <n-icon>
              <ArrowUpOutlined />
            </n-icon>
          </template>
          全部上线
        </n-button>
        <n-button size="medium">
          <template #icon>
            <n-icon>
              <DownloadOutlined />
            </n-icon>
          </template>
          全部下载
        </n-button>
        <n-button size="medium" @click="handleExportAccount">
          <template #icon>
            <n-icon>
              <UploadOutlined />
            </n-icon>
          </template>
          导入账号
        </n-button>
        <n-button size="medium">
          <template #icon>
            <n-icon>
              <ExportOutlined />
            </n-icon>
          </template>
          导出账号
        </n-button>
        <n-button size="medium">
          <template #icon>
            <n-icon>
              <TagOutlined />
            </n-icon>
          </template>
          批量标签
        </n-button>
        <n-button type="error" size="medium">
          <template #icon>
            <n-icon>
              <DeleteOutlined />
            </n-icon>
          </template>
          移除
        </n-button>
      </n-space>
      <!-- 数据表格 -->

      <BasicTable
        :columns="columns"
        :request="loadDataTable"
        :row-key="(row) => row.id"
        :actionColumn="actionColumn"
        :scroll-x="scrollX"
        :resizeHeightOffset="-10000"
        size="small"
        :pagination="pagination"
        ref="actionRef"
        :openChecked="true"
      />
    </n-card>

    <n-modal
      v-model:show="showModal"
      :mask-closable="false"
      :closable="false"
      preset="dialog"
      title="表单标题"
    >
      <template #header>
        <div class="n-modal-header">
          <div class="n-modal-header-title">表单标题</div>
        </div>
      </template>
      <template #action>
        <n-space>
          <n-button @click="() => (showModal = false)" size="medium">取消</n-button>
          <n-button type="info" :loading="formBtnLoading" @click="confirmForm" size="medium">
            确定
          </n-button>
        </n-space>
      </template>
    </n-modal>
  </div>
</template>

<script setup lang="ts">
  import { ref, h, reactive } from 'vue';
  import { NTag, NIcon, type DataTableColumn, NSpace, NButton } from 'naive-ui';
  import {
    UserOutlined,
    CheckCircleOutlined,
    CloseCircleOutlined,
    StopOutlined,
    ClockCircleOutlined,
    WarningOutlined,
    DeleteOutlined,
    ArrowUpOutlined,
    DownloadOutlined,
    UploadOutlined,
    TagOutlined,
    ExportOutlined,
    ArrowDownOutlined,
  } from '@vicons/antd';
  import { TableAction, BasicTable } from '@/components/Table';
  import { BasicForm, useForm } from '@/components/Form/index';
  import { deptFilterFormSchemas } from './utils/deptForm';
  import { useDeptActions } from './utils/deptConFun';

  // 统计数据变量
  const statTotal = ref(1008);
  const statOnline = ref(701);
  const statOffline = ref(1);
  const statBanned = ref(180);
  const statLockTime = ref(126);
  const statLoginFail = ref(0);

  const [register, { resetFields }] = useForm({
    gridProps: { cols: '1 s:1 m:2 l:3 xl:4 2xl:4' },
    labelWidth: 80,
    schemas: deptFilterFormSchemas,
  });

  const scrollX = ref(1500);

  const actionRef = ref();
  const {
    handleExportAccount,
    handleOnlineAccount,
    handleOfflineAccount,
    handleRemoveAccount,
    reloadTable,
  } = useDeptActions(actionRef);

  const actionColumn = reactive({
    width: 250,
    title: '操作',
    key: 'action',
    fixed: 'right',
    render(record) {
      return h(TableAction as any, {
        style: 'button',
        actions: [
          {
            label: '上线',
            icon: ArrowUpOutlined,
            type: 'default',
            onClick: handleOnlineAccount.bind(null, record),
          },
          {
            label: '下线',
            icon: ArrowDownOutlined,
            type: 'default',
            onClick: handleOfflineAccount.bind(null, record),
          },
          {
            label: '移除',
            icon: DeleteOutlined,
            type: 'error',
            onClick: handleRemoveAccount.bind(null, record),
          },
        ],
      });
    },
  });
  const columns: DataTableColumn<any>[] = [
    { type: 'selection' },
    { title: 'ID', key: 'id', width: 80, fixed: 'left' },
    {
      title: '账号',
      key: 'account',
      width: 150,
      fixed: 'left',
      ellipsis: {
        tooltip: true,
      },
    },
    {
      title: '标签',
      key: 'tag',
      width: 200,
      ellipsis: {
        tooltip: true,
      },
      render(row: any) {
        if (!row.tag || !row.tag.length) return '';
        return h(
          'div',
          { style: { display: 'flex', gap: '4px', flexWrap: 'wrap' } },
          row.tag.map((tag: string) =>
            h(
              NTag,
              {
                type: 'info',
                size: 'small',
                round: true,
              },
              { default: () => tag }
            )
          )
        );
      },
    },
    {
      title: '风控状态',
      key: 'riskStatus',
      width: 100,
      ellipsis: {
        tooltip: true,
      },
      render(row: any) {
        if (row.riskStatus === 0) {
          return h(
            NTag,
            { type: 'success', size: 'small', round: true },
            { default: () => '正常' }
          );
        } else if (row.riskStatus === 1) {
          return h(
            NTag,
            { type: 'warning', size: 'small', round: true },
            { default: () => '风控' }
          );
        } else {
          return h(NTag, { type: 'default', size: 'small', round: true }, { default: () => '-' });
        }
      },
    },
    {
      title: '账号状态',
      key: 'accountStatus',
      width: 100,
      ellipsis: {
        tooltip: true,
      },
      render(row: any) {
        if (row.accountStatus === 0) {
          return h(
            NTag,
            { type: 'success', size: 'small', round: true },
            { default: () => '在线' }
          );
        } else if (row.accountStatus === 1) {
          return h(NTag, { type: 'error', size: 'small', round: true }, { default: () => '离线' });
        } else if (row.accountStatus === 2) {
          return h(
            NTag,
            { type: 'warning', size: 'small', round: true },
            { default: () => '封禁' }
          );
        }
      },
    },
    {
      title: '总群发目标数',
      key: 'totalTarget',
      width: 120,
      ellipsis: {
        tooltip: true,
      },
    },
    {
      title: '今日群发目标数',
      key: 'todayTarget',
      width: 120,
      ellipsis: {
        tooltip: true,
      },
    },
    {
      title: 'IP分组',
      key: 'ipGroup',
      width: 200,
      ellipsis: {
        tooltip: true,
      },
    },
    {
      title: '账号版本',
      key: 'accountVersion',
      width: 100,
      ellipsis: {
        tooltip: true,
      },
    },
    {
      title: '上号时间',
      key: 'loginTime',
      width: 160,
      ellipsis: {
        tooltip: true,
      },
    },
    {
      title: '拉群时间',
      key: 'groupTime',
      width: 160,
      ellipsis: {
        tooltip: true,
      },
    },
    actionColumn,
  ];

  const tableData = [
    {
      id: 1041517,
      account: '918799394559',
      tag: ['JP群', 'VIP'],
      riskStatus: 0,
      accountStatus: 0,
      totalTarget: 0,
      todayTarget: 0,
      ipGroup: '活动动IP(随机)',
      accountVersion: '单用户个人',
      loginTime: '2025-06-11 12:47:36',
      groupTime: '2025-06-11 12:47:36',
    },
    {
      id: 1041518,
      account: '918799394559',
      tag: ['JP群', 'VIP'],
      riskStatus: 1,
      accountStatus: 1,
      totalTarget: 0,
      todayTarget: 0,
      ipGroup: '活动动IP(随机)',
      accountVersion: '单用户个人',
      loginTime: '2025-06-11 12:47:36',
      groupTime: '2025-06-11 12:47:36',
    },
    // ... 你可以继续添加更多数据
  ];

  const pagination = reactive({
    page: 1,
    pageSize: 10,
    showSizePicker: true,
    pageSizes: [10, 20, 30, 40],
    onChange: (page) => {
      pagination.page = page;
    },
    onUpdatePageSize: (pageSize) => {
      pagination.pageSize = pageSize;
      pagination.page = 1;
    },
  });

  const navCardList = [
    { title: '账号总数', icon: UserOutlined, color: '#36a3f7', value: statTotal.value },
    { title: '在线', icon: CheckCircleOutlined, color: '#52c41a', value: statOnline.value },
    { title: '离线', icon: CloseCircleOutlined, color: '#ff4d4f', value: statOffline.value },
    { title: '封禁', icon: StopOutlined, color: '#faad14', value: statBanned.value },
    { title: '锁粉时间', icon: ClockCircleOutlined, color: '#b37feb', value: statLockTime.value },
    { title: '登录失败', icon: WarningOutlined, color: '#ff85c0', value: statLoginFail.value },
  ];

  const showModal = ref(false);
  const formBtnLoading = ref(false);
  const confirmForm = () => {
    // 表单提交逻辑
  };

  // 添加数据加载函数
  const loadDataTable = async (params) => {
    // 这里替换为实际的API调用
    console.log('Loading data with params:', params);
    return {
      list: tableData,
      pageNum: pagination.page,
      pageSize: pagination.pageSize,
      total: tableData.length,
    };
  };
</script>
