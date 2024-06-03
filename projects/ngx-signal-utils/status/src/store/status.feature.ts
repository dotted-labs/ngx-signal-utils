import { computed } from '@angular/core';
import { signalStoreFeature, withComputed, withState } from '@ngrx/signals';
import { CallState } from '../states/call.state';
import { ErrorState } from '../states/error.state';
import { LoadingState } from '../states/loading.state';
import { StatusState } from '../states/status.state';

const initialState: StatusState = {
  status: LoadingState.INIT,
};

export function withStatus() {
  return signalStoreFeature(
    withState<StatusState>(initialState),
    withComputed(({ status }: { status: () => CallState }) => ({
      isLoading: computed(() => status() === LoadingState.LOADING),
      isLoaded: computed(() => status() === LoadingState.LOADED),
      error: computed(() => getError(status())),
    })),
  );
}

export function setLoading(): StatusState {
  return { status: LoadingState.LOADING };
}

export function setLoaded(): StatusState {
  return { status: LoadingState.LOADED };
}

export function setError(error: string): StatusState {
  return { status: { error } };
}

export function getError(callState: CallState): string | null {
  console.log('callState', callState);
  if ((callState as ErrorState).error !== undefined) {
    console.log('callState', (callState as ErrorState).error);
    return (callState as ErrorState).error;
  }

  return null;
}
