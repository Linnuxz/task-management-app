import { useState } from "react";
import { Status, Task } from "../types";
import DropdownList from "./DropdownList";

const TaskPopup = ({
    task,
    onClose,
    onUpdate,
}: {
    task: Task;
    onClose: () => void;
    onUpdate: (task: Task) => void;
}) => {
    const [updatedTask, setUpdatedTask] = useState<Task>(task);

    const handleCheckboxChange = (index: number) => {
        const newSubtasks = updatedTask.subtasks.map((subtask, subtaskIndex) =>
            subtaskIndex === index
                ? { ...subtask, isCompleted: !subtask.isCompleted }
                : subtask,
        );
        setUpdatedTask({ ...updatedTask, subtasks: newSubtasks });
    };

    const handleStatusChange = (newStatus: Status) => {
        const newTask = { ...updatedTask, status: newStatus };
        setUpdatedTask(newTask);
        onUpdate(newTask);
    };

    const completedSubtasks = updatedTask.subtasks.filter(
        (subtask) => subtask.isCompleted,
    ).length;
    const totalSubtasks = updatedTask.subtasks.length;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="w-[95%] max-w-md rounded-lg bg-white p-6 shadow-lg dark:bg-[#2B2C37]">
                <h2 className="mb-4 pb-2 pt-[px] text-[16px] font-bold dark:text-white">
                    {updatedTask.title}
                </h2>
                <p className="text-[13px] font-medium leading-[23px] text-[#828FA3]">
                    {updatedTask.description}
                </p>
                <h3 className="mt-4 text-[12px] text-lg font-semibold text-[#828FA3] dark:text-white">
                    Subtasks ({completedSubtasks} of {totalSubtasks})
                </h3>
                <ul className="mt-2">
                    {updatedTask.subtasks.map((subtask, index) => (
                        <li
                            key={index}
                            className="mb-2 flex items-center rounded-[4px] bg-[#F4F7FD] py-[13px] pl-[12px] dark:bg-[#20212C]"
                        >
                            <label className="flex cursor-pointer items-center space-x-2">
                                <input
                                    className="hidden"
                                    type="checkbox"
                                    checked={subtask.isCompleted}
                                    onChange={() => handleCheckboxChange(index)}
                                />
                                <div
                                    className={`flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-sm transition-colors ${
                                        subtask.isCompleted
                                            ? "bg-[#635FC7]"
                                            : "bg-gray-200"
                                    }`}
                                >
                                    {subtask.isCompleted && (
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="16"
                                            height="16"
                                            viewBox="0 0 16 16"
                                            fill="none"
                                        >
                                            <rect
                                                width="16"
                                                height="16"
                                                rx="2"
                                                fill="#635FC7"
                                            />
                                            <path
                                                d="M4.27583 8.0658L7.03229 10.8223L12.0323 5.82227"
                                                stroke="white"
                                                strokeWidth="2"
                                            />
                                        </svg>
                                    )}
                                </div>
                                <span
                                    className={`break-words pl-2 text-[12px] font-bold leading-normal dark:text-white ${subtask.isCompleted ? "line-through opacity-50" : ""}`}
                                >
                                    {subtask.title}
                                </span>
                            </label>
                        </li>
                    ))}
                </ul>
                <div className="text-[12px] font-bold text-white">
                    <h2>Current Status</h2>
                    <DropdownList
                        currentStatus={updatedTask.status}
                        onStatusChange={handleStatusChange}
                    />
                </div>
            </div>
        </div>
    );
};

export default TaskPopup;
