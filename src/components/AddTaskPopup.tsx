import { useRef, useEffect, useState } from "react";

import { statuses, Task } from "../types";

import CrossIcon from "../assets/icon-cross.svg";
import DropdownList from "./DropdownList";

// import data from "../data.json";

const AddTaskPopup = ({
    onClose,
    // selectedBoard,
}: {
    onClose: () => void;
    selectedBoard?: number;
}) => {
    const popupRef = useRef<HTMLDivElement | null>(null);

    // TODO assemble the newTask component properly and then make sure it is added to the localstorage.
    const [subTasks, setSubTasks] = useState(["", ""]);

    const [newTaskStatus, setNewTaskStatus] = useState<
        (typeof statuses)[number]
    >(statuses[0]);

    const [newTask, setNewTask] = useState<Task>({
        title: "",
        description: "",
        status: statuses[0],
        subtasks: [{ title: "", isCompleted: false }],
    });

    const handleCreateTask = () => {
        // const taskToCreate = {
        //     ...newTask,
        //     subtasks: subTasks
        //         .map((subtask) => ({
        //             title: subtask,
        //             isCompleted: false,
        //         }))
        //         .filter((subtask) => subtask.title !== ""),
        //     status: newTaskStatus,
        // };

        // const boardData = data.boards[selectedBoard];
        // const columnIndex = boardData.columns.findIndex(
        //     (column) => column.name === newTaskStatus,
        // );

        // localStorage.setItem("columns", JSON.stringify(data))

        // onClose();
    };

    const handleAddSubtask = () => {
        setSubTasks([...subTasks, ""]);
    };

    const handleSubtaskChange = (index: number, value: string) => {
        const updatedSubtasks = subTasks.map((subtask, i) => {
            return i === index ? value : subtask;
        });
        setSubTasks(updatedSubtasks);
    };

    const removeSubtaskBar = (index: number) => {
        const updatedSubtasks = [...subTasks];
        updatedSubtasks.splice(index, 1);
        setSubTasks(updatedSubtasks);
    };

    const checkClickOutside = (e: MouseEvent) => {
        if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
            onClose();
        }
    };

    useEffect(() => {
        const handleClick = (e: MouseEvent) => checkClickOutside(e);

        document.addEventListener("mousedown", handleClick);

        return () => {
            document.removeEventListener("mousedown", handleClick);
        };
    }, []);

    useEffect(() => {
        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = "auto";
        };
    }, []);

    const handleStatusChange = (status: (typeof statuses)[number]) => {
        setNewTaskStatus(status);
    };

    return (
        <div className="fixed inset-0 z-10 overflow-y-auto bg-black bg-opacity-50">
            <div
                ref={popupRef}
                className="absolute left-1/2 top-1/2 h-[659px] max-h-[89vh] w-[343px] -translate-x-1/2 -translate-y-1/2 transform overflow-y-auto rounded-[6px] bg-white px-6 py-6 dark:bg-[#2B2C37]"
            >
                <h2 className="text-[18px] font-bold text-[#000112] dark:text-white">
                    Add New Task
                </h2>
                <div className="mt-6 flex flex-col gap-6">
                    <div className="flex flex-col gap-2">
                        <p className="text-[12px] font-bold text-[#828FA3] dark:text-white">
                            Task
                        </p>
                        <input
                            className="h-[40px] rounded-[4px] border border-solid border-custom-border bg-transparent px-4 py-2 text-[13px] leading-[23px] text-[#000112] outline-none transition duration-300 focus:border-focus-border dark:text-white"
                            placeholder="e.g. Take coffee break"
                            type="text"
                            onChange={(e) =>
                                setNewTask({
                                    ...newTask,
                                    title: e.target.value,
                                })
                            }
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <p className="text-[12px] font-bold text-[#828FA3] dark:text-white">
                            Description
                        </p>
                        <textarea
                            className="textarea-placeholder-left h-[112px] w-full resize-none rounded-[4px] border border-solid border-custom-border bg-transparent px-4 py-2 text-[13px] leading-[23px] text-[#000112] outline-none transition duration-300 focus:border-focus-border dark:text-white"
                            placeholder="e.g. It’s always good to take a break. This 15-minute break will recharge the batteries a little."
                            onChange={(e) =>
                                setNewTask({
                                    ...newTask,
                                    description: e.target.value,
                                })
                            }
                        ></textarea>
                    </div>
                    <div className="flex flex-col gap-2">
                        <p className="text-[12px] font-bold text-[#828FA3] dark:text-white">
                            Subtasks
                        </p>
                        <ul className="flex max-h-[200px] flex-col gap-3 overflow-y-auto">
                            {subTasks.map((subtask, index) => (
                                <li
                                    key={index}
                                    className="flex items-center justify-between pr-2"
                                >
                                    <input
                                        className="h-[40px] w-[264px] rounded-[4px] border border-solid border-custom-border bg-transparent px-4 py-2 text-[13px] leading-[23px] text-[#000112] outline-none transition duration-300 focus:border-focus-border dark:text-white"
                                        placeholder="e.g. Make coffee"
                                        type="text"
                                        value={subtask}
                                        onChange={(e) =>
                                            handleSubtaskChange(
                                                index,
                                                e.target.value,
                                            )
                                        }
                                    />
                                    <button
                                        onClick={() => removeSubtaskBar(index)}
                                        className=""
                                    >
                                        <img src={CrossIcon} alt="" />
                                    </button>
                                </li>
                            ))}
                        </ul>
                        <button
                            className="mt-1 h-10 w-full rounded-[20px] bg-new-subtask-light text-[13px] font-bold leading-[23px] text-[#635FC7] dark:bg-white"
                            onClick={handleAddSubtask}
                        >
                            + Add New Subtask
                        </button>
                    </div>
                    <div className="text-white">
                        <h2 className="text-[12px] text-xs font-bold text-[#828FA3] dark:text-white">
                            Status
                        </h2>
                        <DropdownList
                            currentStatus={newTaskStatus}
                            onStatusChange={handleStatusChange}
                            direction="up"
                        />
                    </div>
                </div>
                <button
                    onClick={handleCreateTask}
                    className="mt-4 h-10 w-full rounded-[20px] bg-[#635FC7]"
                >
                    <h2 className="text-center text-[13px] font-bold leading-[23px] text-white">
                        Create Task
                    </h2>
                </button>
            </div>
        </div>
    );
};

export default AddTaskPopup;
