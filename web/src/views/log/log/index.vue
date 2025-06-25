<template>
  <div class="min-h-screen  flex flex-col items-center py-5 px-2">
    <n-card :bordered="false" class="rounded-xl shadow" title="日志详情">
      <template #header-extra>
        <n-button @click="router.back()" type="default">返回</n-button>
      </template>

      <n-log :log="log" ref="logInst" language="bash" trim />
    </n-card>
  </div>
</template>

<script setup lang="ts">
  import { ref, onBeforeUnmount, watch, nextTick } from 'vue';
  import { useRouter } from 'vue-router';
  import type { LogInst } from 'naive-ui';

  const router = useRouter();

  function generateLog(): string {
    const l: string[] = [];
    for (let i = 0; i < 40; ++i) {
      l.push(Math.random().toString(16));
    }
    return `${l.join('\n')}\n`;
  }

  const log = ref(generateLog());
  const logInst = ref<LogInst | null>(null);
  const isAdding = ref(false);
  const timer = ref<number | null>(null);

  const handleClick = () => {
    isAdding.value = !isAdding.value;
    if (isAdding.value) {
      if (timer.value) clearInterval(timer.value);
      timer.value = window.setInterval(() => {
        log.value += generateLog();
      }, 1000);
    } else {
      if (timer.value) {
        clearInterval(timer.value);
        timer.value = null;
      }
    }
  };

  watch(log, () => {
    nextTick(() => {
      logInst.value?.scrollTo({ position: 'bottom', silent: true });
    });
  });

  onBeforeUnmount(() => {
    if (timer.value) {
      clearInterval(timer.value);
    }
  });
</script>
