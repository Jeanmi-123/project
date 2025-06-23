import { useDialog, useMessage } from 'naive-ui';

export function useConsoleActions(actionRef, checkedIds) {
  const message = useMessage();
  const dialog = useDialog();

  function reloadTable() {
    actionRef.value.reload();
  }

  function onCheckedRow(rowKeys) {
    checkedIds.value = rowKeys;
  }

  function clearChecked() {
    checkedIds.value = [];
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
    if (checkedIds.value.length === 0) {
      message.warning('请选择要删除的任务');
      return;
    }
    dialog.warning({
      title: '警告',
      content: `您确定要删除选中的 ${checkedIds.value.length} 项任务吗？`,
      positiveText: '确定',
      negativeText: '取消',
      onPositiveClick: () => {
        message.success('删除成功');
        checkedIds.value = [];
        reloadTable();
      },
    });
  }

  function handleAction(action, record) {
    message.info(`执行操作: ${action} for ID: ${record.id}`);
  }

  return {
    reloadTable,
    onCheckedRow,
    clearChecked,
    handleBatchDeleteFailed,
    handlePullTask,
    handleRefreshTag,
    handleAutoPackage,
    handleDeleteSelected,
    handleAction,
  };
} 