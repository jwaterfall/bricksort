import { FC, PropsWithChildren } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface CardImageProps {
  src: string;
  alt: string;
}

export const CardImage: FC<PropsWithChildren<CardImageProps>> = ({ src, alt }) => (
  <figure className="border-b bg-zinc-50 border-zinc-300 -m-2 mb-2 p-2 sm:-m-4 sm:mb-4 sm:p-4 dark:border-zinc-800">
    <Image src={src} alt={alt} width={300} height={300} className="object-contain w-full aspect-video mix-blend-multiply" priority={true} />
  </figure>
);

export const CardTitle: FC<PropsWithChildren> = ({ children }) => <h2 className="font-semibold line-clamp-2">{children}</h2>;
export const CardBody: FC<PropsWithChildren> = ({ children }) => <p className="text-xs truncate">{children}</p>;
export const CardFooter: FC<PropsWithChildren> = ({ children }) => <div className="mt-auto pt-4">{children}</div>;

interface CardProps {
  href?: string;
  onClick?: () => void;
}

const Card: FC<PropsWithChildren<CardProps>> = ({ href, children, onClick }) => {
  const BaseCard = () => (
    <div
      className={`bg-zinc-50 p-2 sm:p-4 border border-zinc-300 rounded-md overflow-hidden transition-transform lg:hover:scale-105 flex flex-col dark:bg-zinc-900 dark:border-zinc-800
                ${onClick ? 'cursor-pointer' : ''} ${href ? 'h-full' : ''}`}
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
