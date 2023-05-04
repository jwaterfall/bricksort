import { FC, PropsWithChildren, createContext, useContext } from 'react';

const TabsContext = createContext<TabsProps>({} as TabsProps);

interface TabProps {
  value: string;
}

export const Tab: FC<PropsWithChildren<TabProps>> = ({ value, children }) => {
  const { onChange, active } = useContext(TabsContext);

  return (
    <button
      onClick={() => onChange(value)}
      className={`px-4 py-2 font-medium text-sm rounded-lg transition ${
        active === value
          ? 'bg-zinc-300 text-zinc-950 dark:bg-zinc-800 dark:text-zinc-50'
          : 'text-zinc-800 hover:text-zinc-950 dark:text-zinc-200 dark:hover:text-zinc-50'
      }`}
    >
      {children}
    </button>
  );
};

interface TabsProps {
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
