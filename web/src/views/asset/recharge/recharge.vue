<template>
  <div class="min-h-screen flex flex-col items-center py-5 px-2">
    <n-card :bordered="false" class="rounded-xl shadow" title="充值">
      <n-steps :current="1" class="mb-8 pl-[25%]" size="medium">
        <n-step title="创建充值订单" />
        <n-step title="充值订单消息" />
      </n-steps>
      <n-alert
        v-if="showAlert1"
        type="info"
        class="mb-3 rounded text-base"
        show-icon
        closable
        @close="showAlert1 = false"
      >
        1 USDT 兑换 1积分
      </n-alert>
      <n-alert
        v-if="showAlert2"
        type="info"
        class="mb-6 rounded text-base"
        show-icon
        closable
        @close="showAlert2 = false"
      >
        请选择和填写充值信息，创建充值订单后继续充值
      </n-alert>

      <n-form :model="formValue" label-width="100" label-placement="left">
        <n-form-item label="转账金额：" class="mb-4">
          <n-input-group>
            <n-input value="USDT" disabled class="w-20 font-bold text-gray-700 rounded-l-lg" />
            <n-input-number
              v-model:value="formValue.amount"
              placeholder="输入转账金额"
              class="w-56 rounded-r-lg"
              :min="0"
            />
          </n-input-group>
        </n-form-item>
        <n-form-item>
          <div class="w-full flex justify-center">
            <n-button
              type="primary"
              @click="nextStep"
              class="w-44 h-10 rounded-lg text-base font-medium shadow"
              :disabled="!formValue.amount"
              >下一步</n-button
            >
          </div>
        </n-form-item>
      </n-form>
    </n-card>
  </div>
</template>

<script lang="ts" setup>
  import { ref, onMounted } from 'vue';
  import { useRouter } from 'vue-router';

  import { useRechargeStore } from '@/store/modules/recharge';

  const rechargeStore = useRechargeStore();

  const formValue = ref({ amount: '' });
  const showAlert1 = ref(true);
  const showAlert2 = ref(true);

  const router = useRouter();

  onMounted(() => {});

  const nextStep = () => {
    rechargeStore.setAmount(formValue.value.amount);
    router.push({
      path: '/apply/asset/recharge/order-detail',
    });
  };
</script>
