export enum TaskStatus {
    ToDo = 'A faire',
    InProgress = 'En cours',
    Done = 'Finis'
}

export interface Task {
    id: number;
    name: string;
    status: TaskStatus;
    important: boolean;
}
