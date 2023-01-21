import { FC } from "react";
import Image from "next/image";

import Breadcrumb from "../Breadcrumb";
import Searchbar from "./Searchbar";

const Topbar: FC = () => (
    <div className="bg-slate-50 w-full h-20 px-8 flex items-center justify-between border-b border-slate-300 shrink-0">
        <Breadcrumb />
        <div className="flex items-center gap-4">
            <Searchbar />
            <div className="border-l border-slate-300 pl-4 flex items-center gap-4">
                <Image
                    src="https://www.jack-waterfall.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fprofile.91b825cc.png&w=1920&q=75"
                    alt="avatar"
                    className="w-10 h-10 rounded-full"
                    width={40}
                    height={40}
                />
                <h4 className="text-sm font-medium">Jack Waterfall</h4>
            </div>
        </div>
    </div>
);

export default Topbar;
