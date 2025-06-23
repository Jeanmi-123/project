<template>
  <div
    class="min-h-screen bg-gray-50 flex flex-col items-center py-5 px-2"
    v-if="Number(amount) > 0"
  >
    <n-card :bordered="false" class="rounded-xl shadow" title="充值">
      <n-steps :current="2" class="mb-8 pl-[25%]" size="medium">
        <n-step title="创建充值订单" />
        <n-step title="充值订单消息" />
      </n-steps>
      <n-alert type="info" class="mb-6" show-icon closable>
        转账时请仔细确认地址和金额是否跟页面一致
      </n-alert>
      <div class="flex flex-col md:flex-row md:items-start md:gap-x-10 mb-6">
        <div class="flex-1 space-y-4">
          <div>
            <span class="font-medium text-gray-700">充值类型：</span>
            <span class="font-bold text-orange-500">USDT-TRC20</span>
          </div>
          <div>
            <span class="font-medium text-gray-700">转账金额：</span>
            <span class="font-bold text-red-500 text-lg"
              >{{ amount }} <span class="text-base text-gray-500">USDT</span></span
            >
          </div>
          <div>
            <span class="font-medium text-gray-700">付款地址：</span>
            <span class="font-mono break-all text-black">TJCHZioCc3HxFx41kGoJJhuCdirkFKr6Wo</span>
          </div>
        </div>
        <div class="flex flex-col items-center mt-6 md:mt-0">
          <img
            class="w-32 h-32 border border-gray-200 mb-2"
            src="https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=TJCHZioCc3HxFx41kGoJJhuCdirkFKr6Wo"
            alt="二维码"
          />
          <div class="text-gray-500 text-sm">{{ timerText }}</div>
        </div>
      </div>
      <div class="mt-8">
        <div class="font-semibold mb-2">说明：</div>
        <ul class="list-disc pl-6 text-gray-600 text-sm space-y-1">
          <li>1：到账金额【{{ amount }}】USDT，否则充值不成功。</li>
          <li>2：10分钟内完成转账。转账时请再次确认地址和金额是否跟页面一致！</li>
          <li>3：交易成功后会自动充值到账。</li>
          <li>4：如因转账金额错误导致的充值失败，客服将在14:00-15:00时间段集中核对处理。</li>
        </ul>
      </div>
    </n-card>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted, onUnmounted } from 'vue';
  import { useRechargeStore } from '@/store/modules/recharge';
  import { useRouter } from 'vue-router';
  import { useDialog } from 'naive-ui';

  const rechargeStore = useRechargeStore();
  const amount = ref(rechargeStore.amount);
  const router = useRouter();
  const dialog = useDialog();
  // 页面销毁时清空金额
  onUnmounted(() => {
    rechargeStore.setAmount(0);
  });

  // 倒计时
  const timerText = ref('00:10:00');
  let seconds = 600;
  const updateTimer = () => {
    const m = String(Math.floor(seconds / 60)).padStart(2, '0');
    const s = String(seconds % 60).padStart(2, '0');
    timerText.value = `00:${m}:${s}`;
    if (seconds > 0) {
      seconds--;
      setTimeout(updateTimer, 1000);
    } else {
      dialog.warning({
        closable: false,
        title: '订单超时',
        content: '订单已超时，请重新发起充值。',
        positiveText: '知道了',
        onPositiveClick: () => {
          router.back();
        },
      });
    }
  };
  onMounted(() => {
    if (Number(amount.value) <= 0) {
      router.back();
    }
    updateTimer();
  });
</script>
