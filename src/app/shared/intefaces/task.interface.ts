export enum ETaskStatus {
  pending = 'Pending',
  completed = 'Completed',
}

export interface ITask {
  id: number;
  title: string;
  description?: string;
  status: ETaskStatus;
}

export type TCreateTask = Omit<ITask, 'id'>;
export type TEditTask = { id: ITask['id']; data: Partial<TCreateTask> };
