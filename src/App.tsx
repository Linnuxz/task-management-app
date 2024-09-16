import { useState } from "react";
import Navbar from "./components/Navbar";
import Boards from "./components/Boards";

const App = () => {
    const [selectedBoard] = useState<number>(0);

    return (
        <div>
            <Navbar selectedBoard={selectedBoard} />
            <Boards />
        </div>
    );
};

export default App;
