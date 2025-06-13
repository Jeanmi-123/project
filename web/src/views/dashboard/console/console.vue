<template>
  <div class="mt-2">
    <div class="n-layout-page-header">
      <n-card :bordered="false" title="默认首页">
        <Company v-if="userStore.isCompanyDept" />
      </n-card>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import Company from './console_company.vue';
  import { useUserStore } from '@/store/modules/user';

  const userStore = useUserStore();
</script>
