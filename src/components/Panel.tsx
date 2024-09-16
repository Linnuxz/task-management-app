
type BoardPanelProps = {
    boards: string[];
    onSelectBoard: (index: number) => void;
};

const Panel = ({ boards, onSelectBoard }: BoardPanelProps) => {
    const handleBoardClick = (index: number) => {
        onSelectBoard(index);
    };

    return (
        <div>
            <ul>
                {boards.map((board, index) => (
                    <li key={index} className='my-2'>
                        <button onClick={() => handleBoardClick(index)}>{board}</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Panel;
