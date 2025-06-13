<template>
  <div class="mt-2">
    <div class="n-layout-page-header">
      <n-card :bordered="false" title="控制台">
        <div>12321321</div>
      </n-card>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { useUserStore } from '@/store/modules/user';

  const userStore = useUserStore();
  const username = userStore.info.username;
</script>

<style lang="less" scoped>
  .project-card {
    margin-right: -6px;

    &-item {
      margin: -1px;
      width: 33.333333%;
    }
  }
</style>
