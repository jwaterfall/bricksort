import { Dispatch, FC, SetStateAction } from 'react';
import { FaFilter } from 'react-icons/fa';

import useThemes from '@/queries/useThemes';
import Dropdown, { DropdownToggle, DropdownContent } from '@/components/Dropdown';
import Button from '@/components/actions/Button';
import Input from '@/components/Input';
import Checkbox from '@/components/Checkbox';

interface SetFilterDropdownProps {
    search: string;
    setSearch: Dispatch<SetStateAction<string | null>>;
    minYear: number;
    setMinYear: Dispatch<SetStateAction<number | null>>;
    maxYear: number;
    setMaxYear: Dispatch<SetStateAction<number | null>>;
    themeIds: string[];
    setThemeIds: Dispatch<SetStateAction<string[] | null>>;
    setPage: Dispatch<SetStateAction<number>>;
}

const SetFilterDropdown: FC<SetFilterDropdownProps> = ({
    search,
    setSearch,
    minYear,
    setMinYear,
    maxYear,
    setMaxYear,
    themeIds,
    setThemeIds,
    setPage,
}) => {
    const { data: themes } = useThemes();

    return (
        <Dropdown>
            <DropdownToggle>
                <Button color="primary" Icon={FaFilter}>
                    Filters
                </Button>
            </DropdownToggle>
            <DropdownContent>
                <div className="bg-slate-50 border border-slate-300 rounded-md p-4 mt-2 shadow-xl max-w-xs flex flex-col gap-4">
                    <div>
                        <h4 className="font-semibold">Search</h4>
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
                        <h4 className="font-semibold">Year</h4>
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
                            <h4 className="font-semibold">Themes</h4>
                            <div className="flex flex-col gap-2 max-h-52 overflow-y-auto p-4 rounded-md bg-slate-100 border border-slate-300">
                                {themes
                                    .filter((theme) => !theme.parentId)
                                    .sort((a, b) => a.name.localeCompare(b.name))
                                    .map((theme) => (
                                        <div key={theme._id} className="flex items-center gap-2">
                                            <Checkbox
                                                checked={themeIds.includes(theme._id)}
                                                onChange={async (checked) => {
                                                    if (checked) {
                                                        await setThemeIds((themeIds) => {
                                                            const newThemeIds = [...(themeIds ?? []), theme._id];
                                                            return newThemeIds.length ? newThemeIds : null;
                                                        });
                                                    } else {
                                                        await setThemeIds((themeIds) => {
                                                            if (!themeIds) return null;
                                                            const newThemeIds = themeIds.filter((id) => id !== theme._id);
                                                            return newThemeIds.length ? newThemeIds : null;
                                                        });
                                                    }
                                                    await setPage(1);
                                                }}
                                            />
                                            <span className="text-sm font-medium">{theme.name}</span>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    )}
                    <Button
                        color="primary"
                        isFullWidth
                        onClick={async () => {
                            await setSearch('');
                            await setThemeIds([]);
                            await setMinYear(1950);
                            await setMaxYear(new Date().getFullYear());
                            await setPage(1);
                        }}
                    >
                        Clear Filters
                    </Button>
                </div>
            </DropdownContent>
        </Dropdown>
    );
};

export default SetFilterDropdown;
