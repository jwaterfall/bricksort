import { FC, PropsWithChildren } from "react";

import SetFilterBar from "../../../components/FilterSidebar/SetFilterSidebar";
import connectToDatabase from "../../../data/connectToDatabase";
import ThemeModel, { Theme } from "../../../models/Theme";

const getThemes = async () => {
  connectToDatabase();
  const themes = await ThemeModel.find();
  return themes.map((theme) => theme.toObject()) as Theme[];
};

// @ts-expect-error
const Layout: FC<PropsWithChildren> = async ({ children }) => {
  const themes = await getThemes();

  return (
    <div className="h-full flex">
      <SetFilterBar themes={themes} />
      <div className="grow p-4 overflow-x-auto scrollbar-thin scrollbar-thumb-slate-300 hover:scrollbar-thumb-slate-400">{children}</div>
    </div>
  );
};

export default Layout;
