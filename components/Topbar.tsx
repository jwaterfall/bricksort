import { FC } from "react";
import { MdOutlineSearch } from "react-icons/md";
import Image from "next/image";
import Breadcrumb from "./Breadcrumb";

const Topbar: FC = () => (
  <div className="bg-slate-50 w-full h-20 px-8 flex items-center justify-between border-b border-slate-300 shrink-0">
    <Breadcrumb />
    <div className="flex items-center gap-4">
      <div className="bg-darken-0.05 px-4 py-2 rounded-full flex items-center gap-2 w-80">
        <MdOutlineSearch className="w-6 h-6 text-text-secondary" />
        <input className="text-sm placeholder:text-text-secondary bg-transparent outline-none grow" placeholder="Search something here..." />
      </div>
      <div className="border-l border-slate-300 pl-4 flex items-center gap-4">
        <img
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
