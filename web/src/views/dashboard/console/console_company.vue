<template>
  <div class="console">
    <div>JeanmiTesst</div>
  </div>
</template>
<script lang="ts" setup>
  import { ref, onMounted } from 'vue';

  import { getConsoleInfo } from '@/api/dashboard/console';

  const loading = ref(true);
  const visits = ref<any>({});
  const saleroom = ref<any>({});
  const orderLarge = ref<any>({});
  const volume = ref({});

  onMounted(async () => {
    const data = await getConsoleInfo();
    visits.value = data.visits;
    saleroom.value = data.saleroom;
    orderLarge.value = data.orderLarge;
    volume.value = data.volume;
    loading.value = false;
  });
</script>

<style lang="less" scoped></style>
