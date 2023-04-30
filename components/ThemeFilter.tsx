import { Dispatch, FC, SetStateAction } from 'react';
import { FaFilter } from 'react-icons/fa';

import useThemes from '@/queries/useThemes';
import Dropdown, { DropdownToggle, DropdownContent } from '@/components/Dropdown';
import Button from '@/components/actions/Button';
import Input from '@/components/Input';
import Checkbox from '@/components/Checkbox';
import { Theme } from '@/models/Theme';

interface ThemeFilterProps {
  themeIds: string[];
  onChange: (themeIds: string[]) => void;
}

interface IndividualThemeFilterProps {
  theme: Theme;
  isChild?: boolean;
  isLastChild?: boolean;
}

const ThemeFilter: FC<ThemeFilterProps> = ({ themeIds, onChange }) => {
  const { data: themes } = useThemes();

  const getChildren = (theme: Theme) => themes?.filter((t) => t.parentId === theme._id) ?? [];
  const getChildrenDeep = (theme: Theme): Theme[] => {
    const children = getChildren(theme);
    return children.reduce((acc, child) => [...acc, ...getChildrenDeep(child)], children);
  };

  const IndividualThemeFilter: FC<IndividualThemeFilterProps> = ({ theme, isChild = false, isLastChild = false }) => {
    const checked = themeIds.includes(theme._id);
    const children = getChildren(theme);

    const getThemeIds = () => {
      if (checked) return themeIds.filter((id) => id !== theme._id);

      const children = getChildrenDeep(theme);
      const newValues = [theme._id, ...children.map((theme) => theme._id)];
      const filteredValues = themeIds.filter((id) => !newValues.includes(id));

      return [...filteredValues, ...newValues];
    };

    return (
      <div className={isChild ? 'ml-5 relative' : ''}>
        {!isLastChild && <div className="absolute -left-2.5 -top-0 h-full w-0.5 bg-slate-300" />}
        {isChild && <div className="absolute -left-2.5 -top-4 h-8 w-2.5 border-slate-300 border-l-2 border-b-2 rounded-bl-md" />}
        <div
          className={`h-8 flex items-center gap-2 min-w-0 cursor-pointer truncate text-sm font-medium relative z-10 ${
            checked ? 'text-slate-900' : 'text-slate-500'
          }`}
        >
          <Checkbox checked={checked} onChange={() => onChange(getThemeIds())} />
          <span className="truncate shrink">{theme.name}</span>({theme.setCount})
        </div>
        {children.map((child, index) => (
          <IndividualThemeFilter theme={child} isChild key={child._id} isLastChild={index === children.length - 1} />
        ))}
      </div>
    );
  };

  return (
    <div>
      <h4 className="font-semibold text-sm uppercase mb-2">themes</h4>
      {themes
        ?.filter((theme) => !theme.parentId)
        .map((theme) => (
          <IndividualThemeFilter key={theme._id} theme={theme} />
        ))}
    </div>
  );
};

export default ThemeFilter;
