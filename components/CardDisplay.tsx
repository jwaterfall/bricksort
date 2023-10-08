import { FC, PropsWithChildren } from 'react';

interface CardDisplayProps {
  pageCount: number;
  emptyTitle: string;
  emptySubtitle: string;
  FilterDropdown?: JSX.Element;
}

const CardDisplay: FC<PropsWithChildren<CardDisplayProps>> = ({ pageCount, emptyTitle, emptySubtitle, children, FilterDropdown }) => {
  if (pageCount <= 0)
    return (
      <div className="h-96 flex flex-col gap-2 justify-center items-center">
        <h2 className="text-2xl font-bold">{emptyTitle}</h2>
        <h3 className="font-medium text-center">{emptySubtitle}</h3>
      </div>
    );

  return <div className="flex-1 grid gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">{children}</div>;
};

export default CardDisplay;
