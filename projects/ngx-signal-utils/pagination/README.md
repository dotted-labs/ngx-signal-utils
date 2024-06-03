# withPagination() Feature

The `withPagination` feature integrates pagination capabilities into your store, managing entities with the ability to navigate through pages and adjust page sizes dynamically. It is designed to work seamlessly with the `ngrx/signals` entities.

## 🚀 Usage

Here is an example of how to use the `withPagination` feature in a practical scenario within an Angular application. This example demonstrates the integration of pagination into a user management system using the `entityListStore`. The store is configured to handle user entities, manage modal interactions, track loading statuses, and paginate user data fetched from a server.

```typescript
import { withPagination } from '@dotted-labs/ngx-signal-utils/pagination';

export const EntityListStore = signalStore(
  withEntities<EntityType>(),
  withPagination<EntityType>({
    isLocal: true // If true, the entities are sliced locally based on the current page and page size. If false, the entities are fetched from the server.
  })
);

readonly #entityListStore = inject(EntityListStore);

console.log(this.#entityListStore.currentPage());
console.log(this.#entityListStore.totalPages());
console.log(this.#entityListStore.hasNextPage());
console.log(this.#entityListStore.hasPreviousPage());

```

### Pagination Methods and State Attributes

The `withPagination` feature provides several methods and state attributes to manage pagination effectively:

#### State Attributes:

- `page`: Current page number.
- `pageSize`: Number of items per page.
- `total`: Total number of items across all pages.

#### Computed Attributes:

- `isEmpty`: Returns `true` if there are no entities, otherwise `false`.
- `hasNextPage`: Returns `true` if there is a next page available based on the current page and page size.
- `hasPreviousPage`: Returns `true` if there is a previous page available.
- `totalPages`: Calculates the total number of pages based on total items and page size.
- `currentPage`: Returns the entities for the current page. If `isLocal` parameter is `true`, it slices the entities locally based on the current page and page size.

#### Methods:

- `changePage(page: number, callback?: CallableFunction)`: Changes the current page to the specified page number and executes a callback function if provided.
- `changePageSize(pageSize: number, callback?: CallableFunction)`: Changes the number of items per page to the specified size and executes a callback function if provided.

These features allow for dynamic and flexible pagination handling within your Angular applications using the `ngrx/signals` store.

## 🔍 Example with `@dotted-labs/ngx-bootstrap-components`

The `withPagination` feature is specifically designed to work seamlessly with the pagination component from the [@dotted-labs/ngx-bootstrap-components](https://www.npmjs.com/package/@dotted-labs/ngx-bootstrap-components) package. This integration allows for efficient and dynamic pagination within Angular applications, enhancing user interfaces with robust pagination capabilities that are easy to implement and customize.

```ts
<!-- component.ts -->

import { PaginationComponent } from '@dotted-labs/ngx-bootstrap-components/pagination';

@Component({
...,
  standalone: true,
  imports: [TableComponent],
})

export class UsersComponent implements OnInit {
  public readonly entityListStore = inject(entityListStore);

  public changePage(page: number): void {
    this.entityListStore.changePage(page, this.entityListStore.loadUsers);
  }

  public changePageSize(pageSize: number): void {
    this.entityListStore.changePageSize(pageSize, this.entityListStore.loadUsers);
  }

}
```

```html
<!-- component.html -->

<dl-pagination
  [page]="entityListStore.page()"
  [pageSize]="entityListStore.pageSize()"
  [total]="entityListStore.total()"
  [totalPages]="entityListStore.totalPages()"
  [hasPreviousPage]="entityListStore.hasPreviousPage()"
  [hasNextPage]="entityListStore.hasNextPage()"
  [pageSize]="entityListStore.pageSize()"
  (pageChange)="changePage($event)"
  (pageSizeChange)="changePageSize($event)"
></dl-pagination>
```
