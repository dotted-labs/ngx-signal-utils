# withStatus() Feature

The `withStatus` feature provides comprehensive management of the 'loading', 'loaded', and 'error' states within `ngrx/signals` stores, facilitating the tracking and handling of different data fetching states throughout the lifecycle of asynchronous operations.

## 🚀 Usage

Here is an example of how to use the `withStatus` feature in a practical scenario within an Angular application. This example demonstrates the integration of status management into a user management system using the `TestStore`. The store is configured to handle user entities, manage modal interactions, and track loading, loaded, and error statuses for user data fetched from a server.

```typescript
import { withStatus } from '@dotted-labs/ngx-signal-utils/status';

export const TestStore = signalStore(
  withStatus(),
  withMethods((store) => ({
    placeHolderMethod: () => {
      // Using the helper functions to set the store to loading state
      patchState(store, setLoading())
      // Without the helper functions, you would need to manually update the store's state using the LoadingState enum
      patchState(store, { status: LoadingState.LOADED });
      //or set the error state returning an { error: string } object.
      patchState(store, { status: { error: 'An error occurred' } });
    },
  })),
);

readonly #testStore = inject(TestStore);

console.log(this.#testStore.isLoading());
console.log(this.#testStore.isLoaded());
console.log(this.#testStore.computed());

```

### Pagination Methods and State Attributes

The `withStatus` feature provides several methods and state attributes to manage pagination effectively:

#### State Attributes:

- `status`: Returns the raw status object containing the loading, loaded, or error states.
- `isLoading`: Returns `true` if the store is loading, otherwise `false`.
- `isLoaded`: Returns `true` if the store is loaded, otherwise `false`.
- `error`: Returns an object containing the error message { error: string } if the store is in an error state, otherwise `null`. You can use the `getError()` helper function to detect if there is an error.

#### Helper Functions:

- `setLoading()`: Sets the store to loading state.
- `setLoaded()`: Sets the store to loaded state.
- `setError(error:string)`: Sets the store to error state.
