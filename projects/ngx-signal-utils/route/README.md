# withRouteParams() & withRouteQueryParams() Feature

The `withRouteParams` and `withRouteQueryParams` features enable easy and quick retrieval of route parameters and query parameters from a URL within `ngrx/signals` stores. Additionally, they facilitate the use of these parameters within `withMethods` and `withComputed` by creating them as computed signals within the store.

## 🚀 Usage

Here is an example of how to use the `withRouteParams` and `withRouteQueryParams` features in a practical scenario within an Angular application. This example demonstrates the integration of status management into a user management system using the `TestStore`. The store is configured to handle user entities, manage modal interactions, and track loading, loaded, and error statuses for user data fetched from a server.

```typescript
import { withStatus } from '@dotted-labs/ngx-signal-utils/status';

const routes = [
  { path: 'user/:routeParamId', ... },
];

export const TestStore = signalStore(
  // With the withRouteParams() feature, you can easily access the route parameters of the current route within the store.
  withRouteParams({ routeParamId: (param) => param }),
  // With the withRouteQueryParams() feature, you can easily access the query parameters of the current route within the store.
  // withRouteQueryParams({ queryParamId: (param) => param }),
  withMethods((store) => ({
    placeHolderMethod: () => {
     // Now you can use the route parameters and query parameters within the store.
     console.log(routeParamId());
     ...
    },
  })),
);

readonly #testStore = inject(TestStore);

console.log(this.#testStore.isLoading());
console.log(this.#testStore.isLoaded());
console.log(this.#testStore.computed());

```
