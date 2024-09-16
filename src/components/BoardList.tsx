import React, { useEffect, useState, useCallback, useMemo } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

// components
import TaskPopup from "./TaskPopup";

// icons
import draggableIcon from "../assets/draggableIcon.svg";

// types
import { Column, Task } from "../types";

// colors
import { tailwindColors } from "../colors";

export const getCompletedSubtasksCount = (
    tasks: Task[],
): { [key: string]: { completed: number; total: number } } => {
    const countMap: { [key: string]: { completed: number; total: number } } =
        {};
    tasks.forEach((task) => {
        const completedCount = task.subtasks.filter(
            (subtask) => subtask.isCompleted,
        ).length;
        const totalCount = task.subtasks.length;
        countMap[task.title] = { completed: completedCount, total: totalCount };
    });
    return countMap;
};

const getRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * tailwindColors.length);
    return tailwindColors[randomIndex];
};

const BoardList = React.memo(
    ({ initialColumns }: { initialColumns: Column[] }) => {
        const [columns, setColumns] = useState(initialColumns);
        const [selectedTask, setSelectedTask] = useState<Task | null>(null);

        const initialColors = useMemo(() => {
            const colors: { [key: string]: string } = {};
            initialColumns.forEach((column) => {
                colors[column.name] = getRandomColor();
            });
            return colors;
        }, [initialColumns]);

        const [columnColors] = useState<{
            [key: string]: string;
        }>(initialColors);

        useEffect(() => {
            setColumns(initialColumns);
        }, [initialColumns]);

        const handleDragEnd = useCallback(
            (result: any) => {
                const { source, destination } = result;

                if (!destination) return;

                if (
                    source.droppableId === destination.droppableId &&
                    source.index === destination.index
                ) {
                    return;
                }

                const sourceColumnIndex = columns.findIndex(
                    (column) => column.name === source.droppableId,
                );
                const destinationColumnIndex = columns.findIndex(
                    (column) => column.name === destination.droppableId,
                );

                const sourceColumn = columns[sourceColumnIndex];
                const destinationColumn = columns[destinationColumnIndex];

                const sourceTasks = [...sourceColumn.tasks];
                const destinationTasks = [...destinationColumn.tasks];

                if (sourceColumn === destinationColumn) {
                    const [movedTask] = sourceTasks.splice(source.index, 1);
                    sourceTasks.splice(destination.index, 0, movedTask);
                    const updatedColumn = {
                        ...sourceColumn,
                        tasks: sourceTasks,
                    };
                    const updatedColumns = [...columns];
                    updatedColumns[sourceColumnIndex] = updatedColumn;
                    setColumns(updatedColumns);
                } else {
                    const [movedTask] = sourceTasks.splice(source.index, 1);
                    movedTask.status = destinationColumn.name;
                    destinationTasks.splice(destination.index, 0, movedTask);

                    const updatedSourceColumn = {
                        ...sourceColumn,
                        tasks: sourceTasks,
                    };

                    const updatedDestinationColumn = {
                        ...destinationColumn,
                        tasks: destinationTasks,
                    };

                    const updatedColumns = [...columns];
                    updatedColumns[sourceColumnIndex] = updatedSourceColumn;
                    updatedColumns[destinationColumnIndex] =
                        updatedDestinationColumn;

                    setColumns(updatedColumns);
                }
            },
            [columns],
        );

        useEffect(() => {
            console.log("Initial columns:", initialColumns);
            setColumns(initialColumns);
        }, [initialColumns]);

        const handleTaskClick = useCallback((task: Task) => {
            setSelectedTask(task);
        }, []);

        const closePopup = () => {
            setSelectedTask(null);
        };

        const handleUpdateTask = (updatedTask: Task) => {
            // Find the current column of the task
            const currentColumnIndex = columns.findIndex((column) =>
                column.tasks.some((task) => task.title === updatedTask.title),
            );

            if (currentColumnIndex === -1) return; // Task not found

            const currentColumn = columns[currentColumnIndex];

            if (currentColumn.name === updatedTask.status) {
                const updatedColumns = columns.map((column) => ({
                    ...column,
                    tasks: column.tasks.map((task) =>
                        task.title === updatedTask.title ? updatedTask : task,
                    ),
                }));
                setColumns(updatedColumns);
                localStorage.setItem("columns", JSON.stringify(updatedColumns));
            } else {
                const updatedSourceColumn = {
                    ...currentColumn,
                    tasks: currentColumn.tasks.filter(
                        (task) => task.title !== updatedTask.title,
                    ),
                };

                const destinationColumnIndex = columns.findIndex(
                    (column) => column.name === updatedTask.status,
                );

                const destinationColumn = columns[destinationColumnIndex];
                const updatedDestinationColumn = {
                    ...destinationColumn,
                    tasks: [...destinationColumn.tasks, updatedTask],
                };

                const updatedColumns = [...columns];
                updatedColumns[currentColumnIndex] = updatedSourceColumn;
                updatedColumns[destinationColumnIndex] =
                    updatedDestinationColumn;

                setColumns(updatedColumns);
                localStorage.setItem("columns", JSON.stringify(updatedColumns));
            }
        };

        return (
            <div className="mx-4 mt-6 flex gap-6">
                <DragDropContext onDragEnd={handleDragEnd}>
                    {columns.map((column) => (
                        <Droppable
                            droppableId={column.name}
                            key={column.name}
                            type="TASK"
                        >
                            {(provided) => (
                                <div
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                    className="flex flex-col gap-[20px]"
                                >
                                    <div className="flex items-center gap-[12px] text-[14px] font-semibold leading-[24px] tracking-widest text-[#828FA3]">
                                        <div
                                            className={`h-[15px] w-[15px] rounded-full ${columnColors[column.name]}`}
                                        ></div>
                                        <h4>{column.name.toUpperCase()}</h4>
                                        <p>({column.tasks.length})</p>
                                    </div>
                                    {column.tasks.map((task, taskIndex) => {
                                        const { completed, total } =
                                            getCompletedSubtasksCount(
                                                column.tasks,
                                            )[task.title] || {
                                                completed: 0,
                                                total: 0,
                                            };
                                        return (
                                            <Draggable
                                                key={task.title}
                                                draggableId={task.title}
                                                index={taskIndex}
                                            >
                                                {(provided, snapshot) => (
                                                    <div
                                                        className={`relative flex min-h-[88px] w-[280px] items-center justify-between rounded-[8px] bg-white py-6 shadow-boardShadow dark:bg-[#2B2C37] dark:text-white ${
                                                            snapshot.isDragging
                                                                ? ""
                                                                : ""
                                                        }`}
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                    >
                                                        <button
                                                            onClick={() =>
                                                                handleTaskClick(
                                                                    task,
                                                                )
                                                            }
                                                            className="flex flex-col gap-2 pl-4 text-left"
                                                        >
                                                            <h3 className="text-[15px] font-bold">
                                                                {task.title}
                                                            </h3>
                                                            <p className="text-[12px] text-[#828FA3]">
                                                                {completed} of{" "}
                                                                {total} subtasks
                                                            </p>
                                                        </button>
                                                        <img
                                                            src={draggableIcon}
                                                            className="mr-2 h-[30px] w-[30px] cursor-pointer dark:invert dark:filter"
                                                        />
                                                    </div>
                                                )}
                                            </Draggable>
                                        );
                                    })}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    ))}
                </DragDropContext>
                {selectedTask && (
                    <TaskPopup
                        task={selectedTask}
                        onClose={closePopup}
                        onUpdate={handleUpdateTask}
                    />
                )}
            </div>
        );
    },
);

export default BoardList;
