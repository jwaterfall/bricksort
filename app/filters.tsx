'use client';

import { FC, useOptimistic, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Check, ChevronsUpDown, ListFilter } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Theme } from '@/models/theme';
import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import {
  Command,
  CommandEmpty,
  CommandList,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

interface FiltersProps {
  themes: Theme[];
}

export const Filters: FC<FiltersProps> = ({ themes }) => {
  const [themeOpen, setThemeOpen] = useState(false);
  const searchParams = useSearchParams();
  const [optimisticTheme, setOptimisticTheme] = useOptimistic(
    searchParams.get('theme')
  );
  const router = useRouter();

  const selectedTheme = themes.find((theme) => theme.id === optimisticTheme);

  return (
    <Drawer onClose={() => setThemeOpen(false)}>
      <DrawerTrigger>
        <Button size="icon" className="shrink-0">
          <ListFilter size={16} />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Filter sets</DrawerTitle>
          <DrawerDescription>
            Filter sets by theme, year, and more.
          </DrawerDescription>
        </DrawerHeader>
        <div className="p-4">
          <Popover open={themeOpen} onOpenChange={setThemeOpen} modal>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={themeOpen}
                className="w-full justify-between"
              >
                {selectedTheme?.name || 'Select theme...'}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0 w-[calc(100vw-2rem)]">
              <Command>
                <CommandInput placeholder="Search themes..." />
                <CommandEmpty>No themes found.</CommandEmpty>
                <CommandList>
                  <CommandGroup>
                    {themes.map((theme) => (
                      <CommandItem
                        key={theme.id}
                        value={theme.name}
                        onSelect={() => {
                          setOptimisticTheme(theme.id);
                          router.push(`?theme=${theme.id}`);
                          setThemeOpen(false);
                        }}
                      >
                        <Check
                          className={cn(
                            'mr-2 h-4 w-4',
                            optimisticTheme === theme.id
                              ? 'opacity-100'
                              : 'opacity-0'
                          )}
                        />
                        {theme.name}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
        <DrawerFooter>
          <Link href="/">
            <Button variant="destructive" className="w-full">
              Clear filters
            </Button>
          </Link>
          <DrawerClose>
            <Button variant="outline" className="w-full">
              Close
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
