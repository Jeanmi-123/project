<template>
  <div class="account-manage-page">
    <!-- 顶部横向卡片导航（有数字） -->
    <n-grid :cols="6" x-gap="16" y-gap="0" class="top-nav-cards">
      <n-gi v-for="item in navCardList" :key="item.title">
        <div class="nav-card">
          <div class="nav-card-header">
            <div class="nav-card-icon" :style="{ color: item.color }">
              <n-icon size="16">
                <component :is="item.icon" />
              </n-icon>
            </div>
            <div class="nav-card-title">{{ item.title }}</div>
          </div>
          <div class="nav-card-value">{{ item.value }}</div>
        </div>
      </n-gi>
    </n-grid>

    <n-card class="main-card" :bordered="false" content-style="padding: 12px 12px 0 12px;">
      <!-- 筛选表单 -->
      <n-form :model="searchForm" class="filter-form" size="small">
        <n-grid :cols="24" :x-gap="10" style="width: 100%">
          <n-form-item-gi span="6" label="账号">
            <n-input
              v-model:value="searchForm.account"
              placeholder="请输入账号"
              clearable
              size="medium"
            />
          </n-form-item-gi>
          <n-form-item-gi span="6" label="风控状态">
            <n-select
              v-model:value="searchForm.riskStatus"
              :options="riskStatusOptions"
              clearable
              placeholder="请选择风控状态"
              size="medium"
            />
          </n-form-item-gi>

          <n-form-item-gi span="6" label="账号状态">
            <n-select
              v-model:value="searchForm.accountStatus"
              :options="accountStatusOptions"
              clearable
              placeholder="请选择账号状态"
              size="medium"
            />
          </n-form-item-gi>
          <template v-if="isExpanded">
            <n-form-item-gi span="6" label="IP分组">
              <n-select
                v-model:value="searchForm.ipGroup"
                :options="ipGroupOptions"
                clearable
                placeholder="请选择IP分组"
                size="medium"
              />
            </n-form-item-gi>
            <n-form-item-gi span="6" label="账号版本">
              <n-select
                v-model:value="searchForm.accountVersion"
                :options="accountVersionOptions"
                clearable
                placeholder="请选择账号版本"
                size="medium"
              />
            </n-form-item-gi>
            <n-form-item-gi span="6" label="标签">
              <n-select
                v-model:value="searchForm.tag"
                :options="tagOptions"
                clearable
                placeholder="请选择标签"
                size="medium"
              />
            </n-form-item-gi>
            <n-form-item-gi span="6" label="是否设置头像">
              <n-select
                v-model:value="searchForm.hasAvatar"
                :options="yesNoOptions"
                clearable
                placeholder="请选择"
                size="medium"
              />
            </n-form-item-gi>
            <n-form-item-gi span="6" label="是否重新注册">
              <n-select
                v-model:value="searchForm.isReRegister"
                :options="yesNoOptions"
                clearable
                placeholder="请选择"
                size="medium"
              />
            </n-form-item-gi>
          </template>
          <n-form-item-gi :span="isExpanded ? 24 : 6" class="search-buttons-item">
            <n-space justify="end">
              <n-button type="primary" size="medium" @click="handleSearch">查询</n-button>
              <n-button size="medium" @click="handleReset">重置</n-button>
              <n-button
                text
                type="primary"
                @click="toggleExpand"
                style="margin-left: 8px; margin-top: 10px"
              >
                {{ isExpanded ? '收起' : '展开' }}
                <n-icon :component="isExpanded ? ChevronUpOutline : ChevronDownOutline" />
              </n-button>
            </n-space>
          </n-form-item-gi>
        </n-grid>
      </n-form>
      <n-divider style="margin-bottom: 12px; margin-top: 0px" />
      <!-- 操作按钮 -->
      <n-space justify="end" size="small" style="margin-bottom: 1%">
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

      <n-card class="table-card" :bordered="false" content-style="padding: 0;">
        <n-data-table
          size="small"
          :columns="columns"
          :data="tableData"
          :pagination="pagination"
          :row-key="(row) => row.id"
          :bordered="false"
          :scroll-x="1200"
          class="custom-table"
          :row-class-name="rowClassName"
        />
      </n-card>
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
  import { ChevronDownOutline, ChevronUpOutline } from '@vicons/ionicons5';
  import { useRouter } from 'vue-router';
  import { TableAction } from '@/components/Table';

  const router = useRouter();

  const searchForm = ref({
    account: '',
    riskStatus: null,
    accountStatus: null,
    ipGroup: null,
    accountVersion: null,
    tag: null,
    hasAvatar: null,
    isReRegister: null,
  });

  const isExpanded = ref(false);

  const toggleExpand = () => {
    isExpanded.value = !isExpanded.value;
  };

  // 统计数据变量
  const statTotal = ref(1008);
  const statOnline = ref(701);
  const statOffline = ref(1);
  const statBanned = ref(180);
  const statLockTime = ref(126);
  const statLoginFail = ref(0);

  const riskStatusOptions = [
    { label: '正常', value: 'normal' },
    { label: '风控', value: 'risk' },
  ];
  const accountStatusOptions = [
    { label: '在线', value: 'online' },
    { label: '离线', value: 'offline' },
    { label: '封禁', value: 'banned' },
  ];
  const ipGroupOptions = [
    { label: '分组1', value: 'group1' },
    { label: '分组2', value: 'group2' },
  ];
  const accountVersionOptions = [
    { label: '单用户个人', value: 'single' },
    { label: '多用户企业', value: 'multi' },
  ];
  const tagOptions = [
    { label: 'JP群', value: 'jp' },
    { label: 'VIP', value: 'vip' },
  ];
  const yesNoOptions = [
    { label: '是', value: 'true' },
    { label: '否', value: 'false' },
  ];

  const handleSearch = () => {
    // 查询逻辑
  };
  const handleReset = () => {
    searchForm.value = {
      account: '',
      riskStatus: null,
      accountStatus: null,
      ipGroup: null,
      accountVersion: null,
      tag: null,
      hasAvatar: null,
      isReRegister: null,
    };
  };

  const handleExportAccount = () => {
    router.push('/org/dept/edit');
  };

  const handleOnlineAccount = (row) => {
    console.log('上线', row);
    // 这里可以添加单个账号上线的逻辑
  };

  const handleOfflineAccount = (row) => {
    console.log('下线', row);
    // 这里可以添加单个账号下线的逻辑
  };

  const handleRemoveAccount = (row) => {
    console.log('移除', row);
    // 这里可以添加单个账号移除的逻辑
  };

  const actionColumn = reactive({
    width: 250,
    title: '操作',
    key: 'actions',
    fixed: 'right' as const,
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
    { title: 'ID', key: 'id', width: 80 },
    {
      title: '账号',
      key: 'account',
      width: 150,
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
      id: 1041517,
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

  const pagination = {
    page: 1,
    pageSize: 10,
    showSizePicker: true,
    pageSizes: [10, 20, 30, 40],
  };

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

  // 表格行样式
  const rowClassName = (row: any) => {
    return row.index % 2 === 1 ? 'table-row-even' : '';
  };
</script>

<style scoped>
  .account-manage-page {
    padding: 12px;
    background: #f6f8fa;
  }
  .top-nav-cards {
    margin-bottom: 16px;
  }
  .nav-card {
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 1px 4px #0000000d;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 14px 0;
    min-height: 80px;
    transition: box-shadow 0.2s;
  }
  .nav-card:hover {
    box-shadow: 0 4px 16px #00000014;
  }
  .nav-card-header {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 8px;
  }
  .nav-card-icon {
    font-size: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .nav-card-title {
    font-size: 15px;
    color: #555;
    font-weight: 500;
  }
  .nav-card-value {
    font-size: 18px;
    font-weight: bold;
    color: #222;
  }
  .main-card {
    background: #fff;
    border-radius: 6px;
    box-shadow: 0 1px 4px #0000000d;
    margin-bottom: 10px;
  }
  .filter-form {
    margin-bottom: 4px;
  }

  .table-card {
    border-radius: 8px;
    overflow: hidden;
    margin-bottom: 20px;
  }
  .custom-table {
    border-radius: 8px;
    overflow: hidden;
  }
  .custom-table .n-data-table-th {
    background-color: #f5f7fa !important;
    font-weight: 500 !important;
    color: #4e5969 !important;
  }
  .custom-table .n-data-table-tr {
    transition: all 0.2s ease;
  }
  .custom-table .n-data-table-tr:hover {
    background-color: #f0f7ff !important;
  }
  .table-row-even {
    background-color: #fafafa;
  }

  .search-buttons-item {
    display: flex;
    justify-content: flex-end;
    padding: 0;
    margin-right: 10px;
  }

  .expand-button {
    display: flex;
    align-items: center;
  }
</style>