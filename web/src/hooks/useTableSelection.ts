import { ref } from 'vue';

export function useTableSelection<T = number>() {
  const checkedIds = ref<T[]>([]);
  const clearChecked = () => {
    checkedIds.value = [];
  };
  const onCheckedRow = (rowKeys: T[]) => {
    checkedIds.value = rowKeys;
  };
  return { checkedIds, clearChecked, onCheckedRow };
}
