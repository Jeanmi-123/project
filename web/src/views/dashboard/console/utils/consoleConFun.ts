import { useDialog, useMessage } from 'naive-ui';
import { useRouter } from 'vue-router';

export function useConsoleActions(actionRef) {
  const message = useMessage();
  const dialog = useDialog();
  const router = useRouter();

  function reloadTable() {
    actionRef.value.reload();
  }

  function handleBatchDeleteFailed() {
    message.info('一键删除失败任务');
  }

  function handlePullTask() {
    message.info('拉群任务');
  }

  function handleRefreshTag() {
    message.info('刷新拉手标签');
  }

  function handleAutoPackage() {
    message.info('自动分包');
  }

  function handleDeleteSelected() {
    message.info('删除选中');
  }

  function handleAction(action, record) {
    message.info(`执行操作: ${action} for ID: ${record.id}`);
  }
  function handleBatchLogDetail() {
    router.push({
      path: '/apply/log/log',
    });
  }
  return {
    reloadTable,
   
    handleBatchDeleteFailed,
    handlePullTask,
    handleRefreshTag,
    handleAutoPackage,
    handleDeleteSelected,
    handleAction,
    handleBatchLogDetail,
  };
}
