import { FC } from "react";
import { MdAdd } from "react-icons/md";
import Button from "./Button";

const Topbar: FC = () => (
  <div className="w-full h-20 px-8 flex items-center justify-between border-b border-darken-0.1">
    <Button Icon={MdAdd}>Add Set</Button>
  </div>
);

export default Topbar;
