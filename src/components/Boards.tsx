import { useState } from "react";
import BoardList from "./BoardList";
import boardData from "../data.json";
// import { Column, Task, Subtask } from "../types";

const Boards = () => {
    const [selectedBoardIndex, setSelectedBoardIndex] = useState<number>(0);

    // const handleBoardSelection = (index: number) => {
    //     setSelectedBoardIndex(index);
    // };

    const selectedBoard = boardData.boards[selectedBoardIndex];

    return (
        <div className="flex overflow-x-scroll bg-[#F4F7FD] transition duration-500 dark:bg-[#20212C]">
            <BoardList
                initialColumns={selectedBoard.columns}
            />
        </div>
    );
};

export default Boards;
