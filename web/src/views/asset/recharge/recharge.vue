<template>
  <div class="min-h-screen bg-gray-50 flex flex-col items-center py-8 px-2">
    <n-card :bordered="false" class="rounded-xl shadow" title="充值">
      <n-steps :current="1" class="mb-8 pl-[20%]" size="medium">
        <n-step title="创建充值订单" />
        <n-step title="充值订单消息" />
      </n-steps>
      <n-alert
        v-if="showAlert1"
        type="info"
        class="mb-3 bg-purple-50 rounded text-base"
        show-icon
        closable
        @close="showAlert1 = false"
      >
        1 USDT 兑换 1积分
      </n-alert>
      <n-alert
        v-if="showAlert2"
        type="info"
        class="mb-6 bg-purple-50 rounded text-base"
        show-icon
        closable
        @close="showAlert2 = false"
      >
        请选择和填写充值信息，创建充值订单后继续充值
      </n-alert>
      <div class="mt-6">
        <n-form :model="formValue" label-width="100" label-placement="left">
          <n-form-item label="转账金额：" class="mb-4">
            <n-input-group>
              <n-input
                value="USDT"
                disabled
                class="w-20 font-bold text-gray-700 bg-gray-100 rounded-l-lg"
              />
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
      </div>
    </n-card>
  </div>
</template>

<script lang="ts" setup>
  import { ref, onMounted, inject } from 'vue';
  import { useRouter } from 'vue-router';

  import { useMessage } from 'naive-ui';
  import { SocketEnum } from '@/enums/socketEnum';
  import { addOnMessage } from '@/utils/websocket';

  const showQrModal = ref(false);

  const message = useMessage();

  const formValue = ref({ amount: '' });
  const showAlert1 = ref(true);
  const showAlert2 = ref(true);

  const router = useRouter();

  onMounted(() => {});

  const onMessageList = inject('onMessageList');

  const handleMessageList = (res) => {
    const data = JSON.parse(res.data);
    if (data.event === SocketEnum.EventAdminOrderNotify) {
      if (data.code == SocketEnum.CodeErr) {
        message.error('查询出错:' + data.event);
        return;
      }

      showQrModal.value = false;
      message.success('支付成功');

      location.reload();
      return;
    }
  };

  addOnMessage(onMessageList, handleMessageList);

  const nextStep = () => {
    router.push({
      path: '/apply/asset/recharge/order-detail',
      query: {
        amount: formValue.value.amount,
      },
    });
  };
</script>
