import { useState } from "react";
import BoardList from "./BoardList";
import boardData from "../data.json";
// import { Column, Task, Subtask } from "../types";

const Boards = ({
    
}: {
    onBoardChange?: (num: number) => void;
}) => {
    const [selectedBoardIndex] = useState<number>(0);

    const selectedBoard = boardData.boards[selectedBoardIndex];

    return (
        <div className="flex overflow-x-scroll bg-[#F4F7FD] transition duration-500 dark:bg-[#20212C]">
            <BoardList initialColumns={selectedBoard.columns} />
        </div>
    );
};

export default Boards;
