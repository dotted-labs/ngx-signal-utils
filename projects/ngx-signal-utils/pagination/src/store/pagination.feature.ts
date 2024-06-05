import { computed } from '@angular/core';
import { patchState, signalStoreFeature, withComputed, withMethods, withState } from '@ngrx/signals';
import { PaginationState } from '../states/pagination.state';
import { setAllEntities, setEntity, withEntities } from '@ngrx/signals/entities';

export function withPagination<T>(params: { isLocal: boolean } = { isLocal: false }) {
  const initialState: PaginationState = {
    page: 1,
    pageSize: 10,
    total: 0,
  };

  return signalStoreFeature(
    withEntities<T>(),
    withState<PaginationState>(initialState),
    withComputed((store) => ({
      isEmpty: computed(() => store.entities().length === 0),
      hasNextPage: computed(() => store.page() * store.pageSize() < store.total()),
      hasPreviousPage: computed(() => store.page() > 1),
      totalPages: computed(() => Math.ceil(store.total() / store.pageSize())),
      currentPage: computed(() => store.entities().slice((store.page() - 1) * store.pageSize(), store.page() * store.pageSize())),
    })),
    withMethods((store) => ({
      changePage(page: number, callback?: CallableFunction): void {
        patchState(store, (state: PaginationState) => ({ ...state, page }));
        if (callback) {
          callback();
        }
      },
      changePageSize(pageSize: number, callback?: CallableFunction): void {
        patchState(store, (state: PaginationState) => ({ ...state, pageSize }));
        if (callback) {
          callback();
        }
      },
    })),
  );
}

export function setTotalItems<T>(total: number): { total: number } {
  return { total };
}
