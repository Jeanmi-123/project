import { defineStore } from 'pinia';
import { store } from '@/store';

export interface IRechargeState {
  amount: string | number;
}

export const useRechargeStore = defineStore({
  id: 'app-recharge',
  state: (): IRechargeState => ({
    amount: 0,
  }),
  actions: {
    setAmount(amount: string | number) {
      this.amount = amount;
    },
  },
});

export function useRechargeStoreWidthOut() {
  return useRechargeStore(store);
} 