<template>
  <div class="logo">
    <img src="~@/assets/icons/superhero.svg" alt="" :class="{ 'mr-2': !collapsed }" />
    <h1 v-show="!collapsed" class="title">{{ projectName }}</h1>
  </div>
</template>

<script>
  export default {
    name: 'Index',
    props: {
      collapsed: {
        type: Boolean,
      },
    },
    setup() {
      const projectName = import.meta.env.VITE_GLOB_APP_TITLE;
      return {
        projectName,
      };
    },
  };
</script>

<style lang="less" scoped>
  .logo {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 64px;
    line-height: 64px;
    overflow: hidden;
    white-space: nowrap;

    img {
      width: auto;
      height: 30px;
      border-radius: 20px;
    }

    .title {
      margin-bottom: 0px;
    }
  }
</style>
