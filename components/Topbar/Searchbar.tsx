"use client";

import { FC, useState } from "react";
import { MdOutlineSearch } from "react-icons/md";

const Searchbar: FC = () => {
    const [searchValue, setSearchValue] = useState("");

    return (
        <div className="bg-darken-0.05 px-4 py-2 rounded-full flex items-center gap-2 w-80">
            <MdOutlineSearch className="w-6 h-6 text-text-secondary" />
            <input
                className="text-sm placeholder:text-text-secondary bg-transparent outline-none grow"
                placeholder="Search something here..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
            />
            <button type="submit" className="text-text-secondary">
                Search
            </button>
        </div>
    );
};
export default Searchbar;
