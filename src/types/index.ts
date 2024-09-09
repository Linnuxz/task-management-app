export type Column = {
    name: string;
    tasks: Task[];
};

export type Task = {
    title: string;
    description: string;
    status: string;
    subtasks: Subtask[];
};

export type Subtask = {
    title: string;
    isCompleted: boolean;
};

export const statuses: string[] = ["Todo", "Doing", "Done"];
export type Status = (typeof statuses)[number];
