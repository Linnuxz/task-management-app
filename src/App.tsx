import { useState } from "react";
import Navbar from "./components/Navbar";
import Boards from "./components/Boards";
import ThemeToggle from "./components/ThemeToggle";

const App = () => {
    const [selectedBoard] = useState<number>(0);

    return (
        <div>
            <Navbar selectedBoard={selectedBoard} />
            <Boards />
            <ThemeToggle />
        </div>
    );
};

export default App;
