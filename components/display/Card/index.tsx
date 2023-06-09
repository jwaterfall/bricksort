import { FC, PropsWithChildren } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface CardImageProps {
  src: string;
  alt: string;
}

export const CardImage: FC<PropsWithChildren<CardImageProps>> = ({ src, alt }) => (
  <figure className="-order-1 border-b bg-zinc-50 border-zinc-300 -m-2 mb-2 p-2 sm:-m-4 sm:mb-4 sm:p-4 dark:border-zinc-800">
    <Image src={src} alt={alt} width={300} height={300} className="object-contain w-full aspect-video mix-blend-multiply" priority={true} />
  </figure>
);

export const CardTitle: FC<PropsWithChildren> = ({ children }) => (
  <h2 className="text-base font-medium mb-4 text-zinc-950 dark:text-zinc-100">{children}</h2>
);

export const CardBody: FC<PropsWithChildren> = ({ children }) => <p className="text-xs truncate">{children}</p>;
export const CardFooter: FC<PropsWithChildren> = ({ children }) => <div className="flex pt-4 justify-end">{children}</div>;

interface CardProps {
  hoverable?: boolean;
  href?: string;
  onClick?: () => void;
}

const Card: FC<PropsWithChildren<CardProps>> = ({ hoverable = false, href, onClick, children }) => {
  const BaseCard = () => (
    <div
      className={`
        bg-zinc-50 border-zinc-300 dark:bg-zinc-900 dark:border-zinc-50/10 text-zinc-700 dark:text-zinc-200 text-sm
        p-4 border rounded-sm overflow-hidden transition-transform flex flex-col
        ${onClick ? 'cursor-pointer' : ''} ${href ? 'h-full' : ''}
        ${hoverable ? 'lg:hover:scale-105' : ''}
      `}
      onClick={onClick}
    >
      {children}
    </div>
  );

  return href ? (
    <Link href={href}>
      <BaseCard />
    </Link>
  ) : (
    <BaseCard />
  );
};

export default Card;
