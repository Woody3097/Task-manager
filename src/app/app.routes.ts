import { Routes } from '@angular/router';

import { EditTaskResolver } from './edit-task/edit-task.resolver';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'add-task',
    loadComponent: () =>
      import('./add-task/add-task.component').then((m) => m.AddTaskComponent),
  },
  {
    path: 'task-list',
    loadComponent: () =>
      import('./task-list/task-list.component').then(
        (m) => m.TaskListComponent,
      ),
  },
  {
    path: 'edit-task/:taskId',
    loadComponent: () =>
      import('./edit-task/edit-task.component').then(
        (m) => m.EditTaskComponent,
      ),
    resolve: {
      task: EditTaskResolver,
    },
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];
