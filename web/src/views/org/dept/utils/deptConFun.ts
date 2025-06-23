import { useRouter } from 'vue-router';

export function useDeptActions(actionRef: any) {
  const router = useRouter();

  // 导出账号
  const handleExportAccount = () => {
    router.push('/org/dept/edit');
  };

  // 上线
  const handleOnlineAccount = (row: any) => {
    console.log('上线', row);
    // 这里可以添加单个账号上线的逻辑
  };

  // 下线
  const handleOfflineAccount = (row: any) => {
    console.log('下线', row);
    // 这里可以添加单个账号下线的逻辑
  };

  // 移除
  const handleRemoveAccount = (row: any) => {
    console.log('移除', row);
    // 这里可以添加单个账号移除的逻辑
  };

  // 刷新表格
  const reloadTable = () => {
    actionRef.value?.reload();
  };

  return {
    handleExportAccount,
    handleOnlineAccount,
    handleOfflineAccount,
    handleRemoveAccount,
    reloadTable,
  };
}