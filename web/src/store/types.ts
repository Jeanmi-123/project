import { IAsyncRouteState } from '@/store/modules/asyncRoute';
import { IUserState } from '@/store/modules/user';
import { ITabsViewState } from '@/store/modules/tabsView';
import { INotificationStore } from '@/store/modules/notification';
import { IDictState } from '@/store/modules/dict';

export interface IStore {
  asyncRoute: IAsyncRouteState;
  user: IUserState;
  tabsView: ITabsViewState;
  dict: IDictState;
  notification: INotificationStore;
  count: number;
}
