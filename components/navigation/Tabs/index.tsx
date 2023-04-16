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
            className={`px-4 flex-1 flex justify-center items-center font-medium text-sm transition border-r border-slate-300 last:border-r-0
            ${activeValue === value ? 'bg-red-500 text-slate-50' : ''}`}
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
            <nav className="h-10 flex bg-slate-50 rounded-md overflow-hidden border border-slate-300">{children}</nav>
        </TabsContext.Provider>
    );
};

export default Tabs;
