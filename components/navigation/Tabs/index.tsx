import { FC, PropsWithChildren, createContext, useContext } from 'react';

const TabsContext = createContext<TabsProps>({} as TabsProps);

export interface TabProps {
  id: string;
}

export const Tab: FC<PropsWithChildren<TabProps>> = ({ id: value, children }) => {
  const { onChange, active: activeValue } = useContext(TabsContext);

  return (
    <button
      onClick={() => onChange(value)}
      className={`px-4 py-2 font-medium text-sm rounded-lg transition text-slate-800 hover:text-slate-950
            ${activeValue === value ? 'bg-slate-300 text-slate-950' : ''}`}
    >
      {children}
    </button>
  );
};

export interface TabsProps {
  active: string;
  onChange: (value: string) => void;
}

const Tabs: FC<PropsWithChildren<TabsProps>> = ({ active, onChange, children }) => {
  return (
    <TabsContext.Provider value={{ active, onChange }}>
      <nav className="flex gap-2 justify-center overflow-hidden">{children}</nav>
    </TabsContext.Provider>
  );
};

export default Tabs;
