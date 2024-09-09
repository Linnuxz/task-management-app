import { useState } from "react";
import Navbar from "./components/Navbar";
import Boards from "./components/Boards";
import ThemeToggle from "./components/ThemeToggle";

const App = () => {
    const [isCreating, setIsCreating] = useState<boolean>(false);

    // const handleCreateClick = () => {
    //     setIsCreating(!isCreating);
    // };

    return (
        <>
            <Navbar isCreating={isCreating} />
            <Boards />
            <ThemeToggle />
        </>
    );
};

export default App;
