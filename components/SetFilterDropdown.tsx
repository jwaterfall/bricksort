import { Dispatch, FC, SetStateAction } from 'react';
import { FaFilter } from 'react-icons/fa';

import useThemes from '@/queries/useThemes';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import Input from '@/components/Input';
import Checkbox from '@/components/Checkbox';
import { Theme } from '@/models/Theme';

interface ThemeFilterProps {
  theme: Theme;
  isChild?: boolean;
  isLastChild?: boolean;
}

interface SetFilterDropdownProps {
  search: string;
  setSearch: Dispatch<SetStateAction<string | null>>;
  minYear: number;
  setMinYear: Dispatch<SetStateAction<number | null>>;
  maxYear: number;
  setMaxYear: Dispatch<SetStateAction<number | null>>;
  themeIds: string[];
  setThemeIds: Dispatch<SetStateAction<string[] | null>>;
}

const SetFilterDropdown: FC<SetFilterDropdownProps> = ({ search, setSearch, minYear, setMinYear, maxYear, setMaxYear, themeIds, setThemeIds }) => {
  const { data: themes } = useThemes();

  const getChildren = (theme: Theme) => themes?.filter((t) => t.parentId === theme._id) ?? [];
  const getChildrenDeep = (theme: Theme): Theme[] => {
    const children = getChildren(theme);
    return children.reduce((acc, child) => [...acc, ...getChildrenDeep(child)], children);
  };

  const ThemeFilter: FC<ThemeFilterProps> = ({ theme, isChild = false, isLastChild = false }) => {
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
        {isChild && !isLastChild && <div className="absolute -left-2.5 -top-0 h-full w-0.5 bg-zinc-300" />}
        {isChild && <div className="absolute -left-2.5 -top-4 h-8 w-2.5 border-zinc-300 border-l-2 border-b-2 rounded-bl-md" />}
        <div
          className={`h-8 flex items-center gap-2 min-w-0 cursor-pointer truncate text-sm font-medium relative z-10 ${
            checked ? 'text-zinc-900' : 'text-zinc-500'
          }`}
        >
          <Checkbox
            checked={checked}
            onChange={async () => {
              await setThemeIds(getThemeIds());
            }}
          />
          <span className="truncate shrink">{theme.name}</span>({theme.setCount})
        </div>
        {children.map((child, index) => (
          <ThemeFilter theme={child} isChild key={child._id} isLastChild={index === children.length - 1} />
        ))}
      </div>
    );
  };

  return (
    <Popover>
      <PopoverTrigger>
        <Button color="primary">Filters</Button>
      </PopoverTrigger>
      <PopoverContent>
        <div>
          <h4 className="font-semibold text-sm uppercase mb-2">search</h4>
          <Input
            type="text"
            placeholder="Set ID or name..."
            value={search ?? ''}
            onChange={async (e) => {
              await setSearch(e.target.value || null);
              await setPage(1);
            }}
          />
        </div>
        <div>
          <h4 className="font-semibold text-sm uppercase mb-2">year</h4>
          <div className="flex items-center gap-2">
            <Input
              type="number"
              label="From"
              value={minYear ?? ''}
              onChange={async (e) => {
                await setMinYear(isNaN(parseInt(e.target.value)) ? null : parseInt(e.target.value));
                await setPage(1);
              }}
            />
            <Input
              type="number"
              label="To"
              value={maxYear ?? ''}
              onChange={async (e) => {
                await setMaxYear(isNaN(parseInt(e.target.value)) ? null : parseInt(e.target.value));
                await setPage(1);
              }}
            />
          </div>
        </div>
        {themes && (
          <div>
            <h4 className="font-semibold text-sm uppercase mb-2">themes</h4>
            <div className="max-h-80 overflow-y-auto scrollbar-thin hide-scrollbar:scrollbar-none scrollbar-thumb-zinc-300 scrollbar-track-zinc-200 dark:scrollbar-thumb-zinc-600 dark:scrollbar-track-zinc-700">
              {themes
                ?.filter((theme) => !theme.parentId)
                .map((theme) => (
                  <ThemeFilter key={theme._id} theme={theme} />
                ))}
            </div>
          </div>
        )}
        <Button
          color="primary"
          onClick={async () => {
            await setSearch('');
            await setThemeIds([]);
            await setMinYear(1950);
            await setMaxYear(new Date().getFullYear());
          }}
        >
          Clear Filters
        </Button>
      </PopoverContent>
    </Popover>
  );
};

export default SetFilterDropdown;
