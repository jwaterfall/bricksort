import { FC, PropsWithChildren } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface CardImageProps {
  src: string;
  alt: string;
}

export const CardImage: FC<PropsWithChildren<CardImageProps>> = ({ src, alt }) => (
  <figure className="-order-1 bg-slate-50 -m-6 mb-6">
    <Image src={src} alt={alt} width={300} height={300} className="object-contain w-full aspect-video mix-blend-multiply" priority={true} />
  </figure>
);

export const CardTitle: FC<PropsWithChildren> = ({ children }) => (
  <h2 className="text-xl mb-2 text-slate-950 font-medium dark:text-slate-50 dark:font-normal">{children}</h2>
);
export const CardBody: FC<PropsWithChildren> = ({ children }) => (
  <p className="text-sm truncate text-slate-600 dark:text-slate-200 dark:font-thin">{children}</p>
);
export const CardFooter: FC<PropsWithChildren> = ({ children }) => <div className="flex pt-4 gap-4">{children}</div>;

interface CardProps {
  hoverable?: boolean;
  href?: string;
  onClick?: () => void;
}

const Card: FC<PropsWithChildren<CardProps>> = ({ hoverable = false, href, onClick, children }) => {
  const BaseCard = () => (
    <div
      onClick={onClick}
      className={`
        bg-slate-50 dark:bg-slate-800 p-6 rounded-xl overflow-hidden transition-transform flex flex-col
        ${onClick ? 'cursor-pointer' : ''} ${href ? 'h-full' : ''} ${hoverable ? 'lg:hover:scale-105' : ''}
      `}
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
