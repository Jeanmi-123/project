<template>
  <div class="layout-header flex items-center">
    <!-- logo区 -->
    <div class="layout-header-left flex items-center min-w-[180px]">
      <div class="logo" v-if="navMode === 'horizontal'">
        <img src="~@/assets/icons/superhero.svg" alt="" />
        <h2 v-show="!collapsed" class="title">{{ projectName }}</h2>
      </div>
    </div>
    <!-- 横向菜单区 -->
    <div
      v-if="navMode === 'horizontal' || (navMode === 'horizontal-mix' && mixMenu)"
      class="flex-1 flex justify-center"
    >
      <AsideMenu
        @update:collapsed="updateMenu"
        v-model:location="getMenuLocation"
        :inverted="getInverted"
        mode="horizontal"
      />
    </div>
    <!--左侧菜单-->
    <div class="layout-header-left" v-else>
      <!-- 菜单收起 -->
      <div
        class="ml-1 layout-header-trigger layout-header-trigger-min"
        @click="() => $emit('update:collapsed', !collapsed)"
      >
        <n-icon size="18" v-if="collapsed">
          <MenuUnfoldOutlined />
        </n-icon>
        <n-icon size="18" v-else>
          <MenuFoldOutlined />
        </n-icon>
      </div>
      <!-- 刷新 -->
      <div
        class="mr-1 layout-header-trigger layout-header-trigger-min"
        v-if="headerSetting.isReload"
        @click="reloadPage"
      >
        <n-icon size="18">
          <ReloadOutlined />
        </n-icon>
      </div>
      <!-- 面包屑 -->
      <n-breadcrumb v-if="crumbsSetting.show">
        <template v-for="routeItem in breadcrumbList" :key="routeItem.name">
          <n-breadcrumb-item>
            <n-dropdown
              v-if="routeItem.children.length"
              :options="routeItem.children"
              @select="dropdownSelect"
            >
              <span class="link-text">
                <component
                  v-if="crumbsSetting.showIcon && routeItem.meta.icon"
                  :is="routeItem.meta.icon"
                />
                {{ routeItem.meta.title }}
              </span>
            </n-dropdown>
            <span class="link-text" v-else>
              <component
                v-if="crumbsSetting.showIcon && routeItem.meta.icon"
                :is="routeItem.meta.icon"
              />
              {{ routeItem.meta.title }}
            </span>
          </n-breadcrumb-item>
        </template>
      </n-breadcrumb>
    </div>
    <div class="layout-header-right">
      <!-- 用户余额展示 -->
      <div
        class="flex items-center gap-2 mr-8 font-medium text-[14px] leading-6 whitespace-nowrap cursor-default"
      >
        <span class="text-gray-500 dark:text-gray-300">用户余额：</span>
        <span class="font-bold text-blue-600 dark:text-blue-400">205.130 USDT</span>
        <span
          class="ml-2 cursor-pointer text-blue-600 dark:text-blue-400 hover:underline transition"
          @click="goToRecharge"
          >充值</span
        >
      </div>

      <!-- 个人中心 -->
      <div
        class="layout-header-trigger layout-header-trigger-min h-auto w-auto px-0 whitespace-nowrap"
      >
        <n-dropdown trigger="click" @select="avatarSelect" :options="avatarOptions" show-arrow>
          <div class="flex items-center gap-2 h-auto w-auto px-0">
            <n-avatar v-if="userStore.avatar" round :size="30" :src="userStore.avatar" />
            <div class="flex flex-col justify-center leading-tight">
              <span class="text-sm text-gray-500 dark:text-gray-200 font-medium">
                {{ userStore.info?.username }}
              </span>
              <span class="text-xs text-gray-500 dark:text-gray-400">
                {{ userStore?.info?.roleName }}
              </span>
            </div>
          </div>
        </n-dropdown>
      </div>
    </div>
  </div>

  <template>
    <n-notification-provider :max="3" />
  </template>
</template>

<script lang="ts">
  import {
    defineComponent,
    reactive,
    toRefs,
    ref,
    computed,
    unref,
    watch,
    h,
    onMounted,
  } from 'vue';
  import { useRouter, useRoute } from 'vue-router';
  import components from './components';
  import {
    NDialogProvider,
    useDialog,
    useMessage,
    NAvatar,
    NTag,
    NIcon,
    useNotification,
    NotificationReactive,
    NButton,
  } from 'naive-ui';
  import { TABS_ROUTES } from '@/store/mutation-types';
  import { useUserStore } from '@/store/modules/user';
  import { AsideMenu } from '@/layout/components/Menu';
  import { useProjectSetting } from '@/hooks/setting/useProjectSetting';
  import { NotificationsOutline as NotificationsIcon } from '@vicons/ionicons5';
  import SystemMessage from './SystemMessage.vue';
  import { notificationStoreWidthOut } from '@/store/modules/notification';
  import { getIcon } from '@/enums/systemMessageEnum';

  export default defineComponent({
    name: 'PageHeader',
    components: {
      ...components,
      NDialogProvider,
      AsideMenu,
      SystemMessage,
    },
    props: {
      collapsed: {
        type: Boolean,
      },
      inverted: {
        type: Boolean,
      },
    },
    setup(props, { emit }) {
      const userStore = useUserStore();
      const notificationStore = notificationStoreWidthOut();

      const message = useMessage();
      const dialog = useDialog();
      const {
        getNavMode,
        getNavTheme,
        getHeaderSetting,
        getMenuSetting,
        getCrumbsSetting,
        getIsMobile,
      } = useProjectSetting();

      // const { username, avatar } = userStore?.info || {};
      const drawerSetting = ref();
      // @ts-ignore
      const projectName = import.meta.env.VITE_GLOB_APP_TITLE;

      const state = reactive({
        // username: username || '',
        // avatar: avatar || '',
        fullscreenIcon: 'FullscreenOutlined',
        navMode: getNavMode,
        navTheme: getNavTheme,
        headerSetting: getHeaderSetting,
        crumbsSetting: getCrumbsSetting,
      });

      const getInverted = computed(() => {
        const navTheme = unref(getNavTheme);
        return ['light', 'header-dark'].includes(navTheme) ? props.inverted : !props.inverted;
      });

      const mixMenu = computed(() => {
        return unref(getMenuSetting).mixMenu;
      });

      const getChangeStyle = computed(() => {
        const { collapsed } = props;
        const { minMenuWidth, menuWidth }: any = unref(getMenuSetting);
        return {
          left: collapsed ? `${minMenuWidth}px` : `${menuWidth}px`,
          width: `calc(100% - ${collapsed ? `${minMenuWidth}px` : `${menuWidth}px`})`,
        };
      });

      const getMenuLocation = computed(() => {
        return 'header';
      });

      const router = useRouter();
      const route = useRoute();

      const generator: any = (routerMap) => {
        return routerMap.map((item) => {
          const currentMenu = {
            ...item,
            label: item.meta.title,
            key: item.name,
            disabled: item.path === '/',
          };
          // 是否有子菜单，并递归处理
          if (item.children && item.children.length > 0) {
            // Recursion
            currentMenu.children = generator(item.children, currentMenu);
          }
          return currentMenu;
        });
      };

      const breadcrumbList = computed(() => {
        return generator(route.matched);
      });

      const dropdownSelect = (key) => {
        router.push({ name: key });
      };

      // 刷新页面
      const reloadPage = () => {
        const full = unref(route);
        router.push({
          path: '/redirect' + full.path,
          query: full.query,
        });
      };

      // 注销登录
      const doLogout = () => {
        dialog.info({
          title: '提示',
          content: '您确定要注销登录吗',
          positiveText: '确定',
          negativeText: '取消',
          onPositiveClick: () => {
            userStore.logout().then(() => {
              message.success('成功注销登录');
              // 移除标签页
              localStorage.removeItem(TABS_ROUTES);
              router
                .replace({
                  name: 'Login',
                  query: {
                    redirect: route.fullPath,
                  },
                })
                .finally(() => location.reload());
            });
          },
          onNegativeClick: () => {},
        });
      };

      const goToRecharge = () => {
        router.push('/apply/asset/recharge');
      };

      const avatarOptions = [
        // {
        //   key: 'header',
        //   type: 'render',
        //   render: renderCustomHeader,
        // },
        {
          label: '个人设置',
          key: 1,
        },
        {
          label: '注销登录',
          key: 2,
        },
      ];

      //头像下拉菜单
      const avatarSelect = (key) => {
        switch (key) {
          case 1:
            router.push({ name: 'home_account' });
            break;
          case 2:
            doLogout();
            break;
        }
      };

      const notification = useNotification();
      const getMessages = computed(() => {
        return notificationStore.newMessage;
      });
      const nRef = ref<NotificationReactive | null>(null);
      // 监听新消息，推送通知
      watch(
        getMessages,
        (newVal, _oldVal) => {
          if (newVal === null || newVal === undefined) {
            return;
          }

          nRef.value = notification.create({
            title: newVal.title,
            description:
              newVal.tagTitle === '' || newVal.tagTitle === undefined
                ? undefined
                : () =>
                    h(
                      NTag,
                      {
                        style: {
                          marginRight: '6px',
                        },
                        type: newVal.tagProps?.type,
                        bordered: false,
                      },
                      {
                        default: () => newVal.tagTitle,
                      }
                    ),

            content: () =>
              newVal.content === '' || newVal.content === undefined
                ? undefined
                : h('div', { innerHTML: '<div>' + newVal.content + '</div>' }),
            meta: newVal.createdAt,
            avatar: () =>
              newVal.senderAvatar !== '' || newVal.senderAvatar === undefined
                ? h(NAvatar, {
                    size: 'small',
                    round: true,
                    src: newVal.senderAvatar,
                  })
                : h(NIcon, null, { default: () => h(getIcon(newVal)) }),
            action: () =>
              h(
                NButton,
                {
                  text: true,
                  type: 'info',
                  onClick: () => {
                    (nRef.value as NotificationReactive).destroy();
                    router.push({
                      name: 'home_message',
                      query: {
                        type: newVal.type,
                      },
                    });
                  },
                },
                {
                  default: () => '查看详情',
                }
              ),
            onClose: () => {
              nRef.value = null;
            },
          });
        },
        { immediate: true, deep: true }
      );

      const updateMenu = () => {
        emit('update:collapsed', !props.collapsed);
      };

      onMounted(() => {
        if (notificationStore.getUnreadCount() === 0) {
          notificationStore.pullMessages();
        }
      });
      return {
        ...toRefs(state),
        doLogout,
        route,
        dropdownSelect,
        avatarOptions,
        getChangeStyle,
        avatarSelect,
        breadcrumbList,
        reloadPage,
        drawerSetting,
        getInverted,
        getMenuLocation,
        mixMenu,
        NotificationsIcon,
        SystemMessage,
        notificationStore,
        getIsMobile,
        userStore,
        updateMenu,
        projectName,
        goToRecharge,
      };
    },
  });
</script>

<style lang="less" scoped>
  .layout-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0;
    height: @header-height;
    box-shadow: 0 1px 4px rgb(0 21 41 / 8%);
    transition: all 0.2s ease-in-out;
    width: 100%;
    z-index: 11;

    &-left {
      display: flex;
      align-items: center;

      .logo {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 64px;
        line-height: 64px;
        overflow: hidden;
        white-space: nowrap;
        padding-left: 10px;
        min-width: 132px;

        img {
          width: auto;
          height: 32px;
          margin-right: 10px;
        }

        .title {
          margin-bottom: 0;
        }
      }

      ::v-deep(.ant-breadcrumb span:last-child .link-text) {
        color: #515a6e;
      }

      .n-breadcrumb {
        display: inline-block;
      }

      &-menu {
        color: var(--text-color);
      }
    }

    &-right {
      display: flex;
      align-items: center;
      margin-right: 20px;

      .avatar {
        display: flex;
        align-items: center;
        height: 64px;

        .username-display {
          margin-left: 8px; /* 根据您的UI需要调整 */
          color: #515a6e; /* 调整为您想要的颜色 */
          font-size: 13px; /* 调整为您想要的字体大小 */
        }
      }

      > * {
        cursor: pointer;
      }
    }

    &-trigger {
      display: inline-block;
      min-width: 40px;
      min-height: 40px;
      text-align: center;
      cursor: pointer;
      transition: all 0.2s ease-in-out;

      .n-icon {
        display: flex;
        align-items: center;
        min-height: 40px;
        line-height: 40px;
      }

      &:hover {
        background: hsla(0, 0%, 100%, 0.08);
      }

      .anticon {
        font-size: 16px;
        color: #515a6e;
      }
    }

    &-trigger-min {
      width: auto;
      padding: 0 12px;
    }
  }

  .layout-header-light {
    background: #fff;
    color: #515a6e;

    .n-icon {
      color: #515a6e;
    }

    .layout-header-left {
      ::v-deep(.n-breadcrumb .n-breadcrumb-item:last-child .n-breadcrumb-item__link) {
        color: #515a6e;
      }
    }

    .layout-header-trigger {
      &:hover {
        background: #f8f8f9;
      }
    }
  }

  .layout-header-fix {
    position: fixed;
    top: 0;
    right: 0;
    left: 200px;
    z-index: 11;
  }

  ::v-deep(.menu-server-link) {
    color: #515a6e;

    &:hover {
      color: #1890ff;
    }
  }

  .action-items-wrapper {
    position: relative;
    height: 100%;
    display: flex;
    align-items: center;
    z-index: 1;

    .action-item {
      min-width: 40px;
      display: flex;
      align-items: center;

      &:hover {
        cursor: pointer;
        color: var(--primary-color-hover);
      }
    }

    .badge-action-item {
      cursor: pointer;
      margin-right: 30px;
    }
  }

  :deep(.n-input .n-input__border, .n-input .n-input__state-border) {
    border: none;
    border-bottom: 1px solid currentColor;
  }

  :deep(.el-input__inner) {
    border: none !important;
    height: 35px;
    line-height: 35px;
    color: currentColor !important;
    background-color: transparent !important;
  }

  :deep(sup) {
    top: 1.3em;
  }
</style>
