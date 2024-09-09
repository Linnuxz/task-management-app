import { useState } from "react";
import ThreeColumns from "../assets/3-columns.svg";
import ArrowDown from "../assets/icon-chevron-down.svg";
import ArrowUp from "../assets/icon-chevron-up.svg";
import AddTaskMobile from "../assets/icon-add-task-mobile.svg";
import VerticalEllipsis from "../assets/icon-vertical-ellipsis.svg";

const Navbar = ({ isCreating }: { isCreating: boolean }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <div
            className={`flex items-center justify-between px-[16px] py-[20px] transition duration-500 dark:bg-contentDarkBG ${
                isCreating ? "brightness-50" : ""
            }`}
        >
            <div className="flex gap-4">
                <img src={ThreeColumns} alt="" className="h-[24px] w-[24px]" />
                <h3
                    className={
                        "text-lg font-bold text-[#000112] transition duration-500 dark:text-[#FFFFFF]"
                    }
                >
                    Platform Launch
                </h3>
                {!isOpen ? (
                    <button
                        onClick={() => {
                            setIsOpen(!isOpen);
                        }}
                    >
                        <img src={ArrowDown} alt="Arrow" />
                    </button>
                ) : (
                    <button
                        onClick={() => {
                            setIsOpen(!isOpen);
                        }}
                    >
                        <img src={ArrowUp} alt="Arrow" />
                    </button>
                )}
            </div>
            <div className="flex gap-4">
                <button className="flex h-8 w-12 items-center justify-center rounded-3xl bg-[#635FC7]">
                    <img src={AddTaskMobile} />
                </button>
                <button>
                    <img src={VerticalEllipsis} className="h-4 w-1" />
                </button>
            </div>
            {isOpen && <div className="absolute text-white">hrdegjdofsigj</div>}
        </div>
    );
};

export default Navbar;
