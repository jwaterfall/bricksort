import { PropsWithPadding, PropsWithWidth } from '@/components/Props';
import { FC } from 'react';

interface ListProps extends PropsWithWidth, PropsWithPadding {
  title: string;
  subtitle?: string;
  body?: string;
  leftElement?: JSX.Element;
  rightElement?: JSX.Element;
}

export const List: FC<ListProps> = ({ width = 'w-full', padding = 'py-3 pl-4 pr-6', title, subtitle, body, leftElement, rightElement }) => (
  <div className={`flex items-center gap-4 ${width} ${padding}`}>
    {leftElement}
    <div className="flex-1 overflow-hidden">
      <div className="text-xs text-zinc-500 truncate">{subtitle}</div>
      <div className="text-zinc-950 dark:text-zinc-50 truncate">{title}</div>
      <div className="text-sm text-zinc-500 truncate">{body}</div>
    </div>
    {rightElement}
  </div>
);
