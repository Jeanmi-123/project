<template>
  <div class="view-account">
    <div class="view-account-header"></div>
    <div :style="containerCSS">
      <n-card :bordered="false">
        <header class="justify-between">
          <n-space justify="center">
            <div></div>
            <img src="~@/assets/icons/superhero.svg" class="account-logo" alt="" />
            <n-gradient-text type="primary" :size="26">{{ projectName }}</n-gradient-text>
            <div></div>
          </n-space>
        </header>
        <main class="pt-24px">
          <div class="pt-18px">
            <transition name="fade-slide" appear>
              <component
                :is="activeModule.component"
                @update-active-module="handleUpdateActiveModule"
              />
            </transition>
          </div>
        </main>
      </n-card>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref, computed, onMounted } from 'vue';
  import type { Component } from 'vue';
  import LoginFrom from './login/index.vue';
  import { useRouter } from 'vue-router';
  import { useUserStore } from '@/store/modules/user';

  const userStore = useUserStore();
  const projectName = import.meta.env.VITE_GLOB_APP_TITLE;

  interface LoginModule {
    key: string;
    label: string;
    component: Component;
  }

  const router = useRouter();
  const activeModule = ref<LoginModule>({
    key: 'login',
    label: '账号登录',
    component: LoginFrom,
  });

  const modules: LoginModule[] = [{ key: 'login', label: '账号登录', component: LoginFrom }];

  const containerCSS = computed(() => {
    const val = document.body.clientWidth;
    return val <= 720
      ? {}
      : {
          flex: `1`,
          padding: `62px 12px`,
          'max-width': `484px`,
          'min-width': '320px',
          margin: '0 auto',
        };
  });

  function handleUpdateActiveModule(key: string) {
    const findItem = modules.find((item) => item.key === key);
    if (findItem) {
      activeModule.value = findItem;
    }
  }

  onMounted(() => {
    const key = router.currentRoute.value.query?.scope as string;
    if (key) {
      handleUpdateActiveModule(key);
    }
  });
</script>

<style lang="less" scoped>
  .view-account {
    display: flex;
    flex-direction: column;
    height: 100vh;
    overflow: auto;

    &-top {
      padding: 32px 0;
      text-align: center;

      &-desc {
        font-size: 14px;
        color: #808695;
      }
    }

    &-other {
      width: 100%;
    }

    .default-color {
      color: #515a6e;

      .ant-checkbox-wrapper {
        color: #515a6e;
      }
    }
  }

  @media (min-width: 768px) {
    .view-account {
      background-image: url('../../assets/images/login.svg');
      background-repeat: no-repeat;
      background-position: 50%;
      background-size: 100%;
    }

    .page-account-container {
      padding: 32px 0 24px 0;
    }
  }

  .card-tabs .n-tabs-nav--bar-type {
    padding-left: 4px;
  }

  .pt-24px {
    padding-top: 24px;
  }

  .pt-18px {
    padding-top: 18px;
  }

  .text-18px {
    font-size: 18px;
  }

  .ease-in-out {
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  }

  .duration-300 {
    transition-duration: 0.3s;
  }

  .transition {
    transition-property:
      color, background-color, border-color, outline-color, text-decoration-color, fill, stroke,
      opacity, box-shadow, transform, filter, backdrop-filter;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 0.15s;
  }

  .account-logo {
    width: 42px;
    height: 42px;
  }
</style>
