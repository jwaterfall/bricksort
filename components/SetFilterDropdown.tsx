import { Dispatch, FC, SetStateAction } from 'react';
import { Trash } from 'lucide-react';

import useThemes from '@/queries/useThemes';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface SetFilterDropdownProps {
  search?: string;
  setSearch: Dispatch<SetStateAction<string | null>>;
  minYear: number;
  setMinYear: Dispatch<SetStateAction<number | null>>;
  maxYear: number;
  setMaxYear: Dispatch<SetStateAction<number | null>>;
  theme?: string;
  setTheme: Dispatch<SetStateAction<string | null>>;
}

const SetFilterDropdown: FC<SetFilterDropdownProps> = ({ search, setSearch, minYear, setMinYear, maxYear, setMaxYear, theme, setTheme }) => {
  const { data: themes } = useThemes();

  return (
    <div className="flex items-stretch gap-4 mb-4 flex-col md:flex-row">
      <div className="flex-1">
        <h4 className="text-muted-foreground font-semibold text-xs uppercase mb-2">search</h4>
        <Input
          type="text"
          placeholder="Set ID or name..."
          value={search ?? ''}
          onChange={async (e) => {
            await setSearch(e.target.value || null);
          }}
        />
      </div>
      <div>
        <h4 className="text-muted-foreground font-semibold text-xs uppercase mb-2">year</h4>
        <div className="flex items-center gap-2">
          <Input
            type="number"
            value={minYear ?? ''}
            onChange={async (e) => {
              await setMinYear(isNaN(parseInt(e.target.value)) ? null : parseInt(e.target.value));
            }}
          />
          <span className="text-muted-foreground">-</span>
          <Input
            type="number"
            value={maxYear ?? ''}
            onChange={async (e) => {
              await setMaxYear(isNaN(parseInt(e.target.value)) ? null : parseInt(e.target.value));
            }}
          />
        </div>
      </div>
      {themes && (
        <div>
          <h4 className="text-muted-foreground font-semibold text-xs uppercase mb-2">theme</h4>
          <div className="flex items-center gap-2">
            <Select value={theme} onValueChange={setTheme}>
              <SelectTrigger>
                <SelectValue placeholder="Theme" />
              </SelectTrigger>
              <SelectContent className="max-h-80">
                {themes.map((theme) => (
                  <SelectItem key={theme._id} value={theme._id}>
                    {theme.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              variant="destructive"
              size="icon"
              onClick={async () => {
                await setSearch(null);
                await setTheme(null);
                await setMinYear(1950);
                await setMaxYear(new Date().getFullYear() + 1);
              }}
            >
              <Trash size={18} />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SetFilterDropdown;
