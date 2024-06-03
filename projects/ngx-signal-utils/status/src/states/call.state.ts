import { ErrorState } from './error.state';
import { LoadingState } from './loading.state';

export type CallState = LoadingState | ErrorState;
