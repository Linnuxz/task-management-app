import { useState } from "react";
import ChevronDown from "../assets/icon-chevron-down.svg";
import ChevronUp from "../assets/icon-chevron-up.svg";

import { Status, statuses } from "../types";

const DropdownList = ({
    currentStatus,
    onStatusChange,
    direction = "down",
}: {
    currentStatus: Status;
    onStatusChange: (status: Status) => void;
    direction: "up" | "down";
}) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleClick = () => {
        setIsOpen(!isOpen);
    };

    const handleStatusChange = (newStatus: Status) => {
        onStatusChange(newStatus);
        setIsOpen(false);
    };

    const currentStatusIndex = statuses.indexOf(currentStatus);
    const aboveStatuses = statuses.slice(0, currentStatusIndex);
    const belowStatuses = statuses.slice(currentStatusIndex + 1);

    return (
        <div className="relative">
            <button
                onClick={handleClick}
                className="mt-2 flex h-10 w-full items-center justify-between rounded-[4px] px-4"
                style={{
                    border: "1px solid rgba(130, 143, 163, 0.25)",
                }}
            >
                <h2 className="text-[13px] text-black transition duration-500 dark:text-white">
                    {currentStatus}
                </h2>
                <img
                    src={isOpen ? ChevronUp : ChevronDown}
                    className="h-[6px] w-[10px]"
                />
            </button>

            {isOpen && (
                <div
                    className={`absolute left-0 right-0 flex flex-col rounded-md bg-white text-[13px] dark:bg-[#2B2C37] ${
                        direction === "up"
                            ? "bottom-full mb-2"
                            : "top-full mt-2"
                    }`}
                >
                    {aboveStatuses.map((status, index) => (
                        <div
                            key={index}
                            className="flex h-10 w-full cursor-pointer items-center px-4 text-black transition duration-500 hover:bg-[#635FC7] hover:text-white dark:text-white"
                            onClick={() => handleStatusChange(status)}
                        >
                            <h2>{status}</h2>
                        </div>
                    ))}

                    <div className="flex h-10 w-full items-center bg-[#635FC7] px-4 dark:bg-[#20212C]">
                        <h2>{currentStatus}</h2>
                    </div>

                    {belowStatuses.map((status, index) => (
                        <div
                            key={index}
                            className="flex h-10 w-full cursor-pointer items-center px-4 text-black transition duration-500 hover:bg-[#635FC7] hover:text-white dark:text-white"
                            onClick={() => handleStatusChange(status)}
                        >
                            <h2 className="dark:text-white">{status}</h2>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default DropdownList;
