<template>
  <div class="history-list">
    <n-card :bordered="false" title="历史导入记录" class="proCard">
      <n-data-table :columns="columns" :data="data" :pagination="pagination" />
    </n-card>
  </div>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  const columns = [
    {
      title: '导入时间',
      key: 'importTime',
    },
    {
      title: '备注',
      key: 'remarks',
    },
    {
      title: '版本',
      key: 'version',
    },
    {
      title: '数量',
      key: 'totalCount',
    },
    {
      title: '封号数量',
      key: 'blockedCount',
    },
    {
      title: '密钥失效数量',
      key: 'keyInvalidCount',
    },
    {
      title: '重复数量',
      key: 'duplicateCount',
    },
    {
      title: '格式化错误数量',
      key: 'formatErrorCount',
    },
  ];

  const data = ref([
    {
      importTime: '2023-01-01 10:00:00',
      remarks: '首次导入用户数据',
      version: 'v1.0',
      totalCount: 100,
      blockedCount: 5,
      keyInvalidCount: 2,
      duplicateCount: 3,
      formatErrorCount: 1,
    },
    {
      importTime: '2023-01-02 11:30:00',
      remarks: '更新产品信息',
      version: 'v1.1',
      totalCount: 200,
      blockedCount: 0,
      keyInvalidCount: 1,
      duplicateCount: 5,
      formatErrorCount: 0,
    },
    {
      importTime: '2023-01-03 14:00:00',
      remarks: '导入订单数据',
      version: 'v1.0',
      totalCount: 50,
      blockedCount: 1,
      keyInvalidCount: 0,
      duplicateCount: 0,
      formatErrorCount: 2,
    },
    {
      importTime: '2023-01-03 14:00:00',
      remarks: '导入订单数据',
      version: 'v1.0',
      totalCount: 50,
      blockedCount: 1,
      keyInvalidCount: 0,
      duplicateCount: 0,
      formatErrorCount: 2,
    },
    {
      importTime: '2023-01-03 14:00:00',
      remarks: '导入订单数据',
      version: 'v1.0',
      totalCount: 50,
      blockedCount: 1,
      keyInvalidCount: 0,
      duplicateCount: 0,
      formatErrorCount: 2,
    },
    {
      importTime: '2023-01-03 14:00:00',
      remarks: '导入订单数据',
      version: 'v1.0',
      totalCount: 50,
      blockedCount: 1,
      keyInvalidCount: 0,
      duplicateCount: 0,
      formatErrorCount: 2,
    },
    {
      importTime: '2023-01-03 14:00:00',
      remarks: '导入订单数据',
      version: 'v1.0',
      totalCount: 50,
      blockedCount: 1,
      keyInvalidCount: 0,
      duplicateCount: 0,
      formatErrorCount: 2,
    },
    {
      importTime: '2023-01-03 14:00:00',
      remarks: '导入订单数据',
      version: 'v1.0',
      totalCount: 50,
      blockedCount: 1,
      keyInvalidCount: 0,
      duplicateCount: 0,
      formatErrorCount: 2,
    },
    {
      importTime: '2023-01-03 14:00:00',
      remarks: '导入订单数据',
      version: 'v1.0',
      totalCount: 50,
      blockedCount: 1,
      keyInvalidCount: 0,
      duplicateCount: 0,
      formatErrorCount: 2,
    },
    {
      importTime: '2023-01-03 14:00:00',
      remarks: '导入订单数据',
      version: 'v1.0',
      totalCount: 50,
      blockedCount: 1,
      keyInvalidCount: 0,
      duplicateCount: 0,
      formatErrorCount: 2,
    },
    {
      importTime: '2023-01-03 14:00:00',
      remarks: '导入订单数据',
      version: 'v1.0',
      totalCount: 50,
      blockedCount: 1,
      keyInvalidCount: 0,
      duplicateCount: 0,
      formatErrorCount: 2,
    },
  ]);

  const pagination = { pageSize: 8 };
</script>
<style lang="less" scoped>
  .history-list {
    background-color: #f6f8fa;
  }
</style>
