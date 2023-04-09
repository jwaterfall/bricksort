import { FC, PropsWithChildren } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface CardImageProps {
    src: string;
    alt: string;
}

export const CardImage: FC<PropsWithChildren<CardImageProps>> = ({ src, alt }) => (
    <figure className="border-b border-slate-300 -m-4 mb-4 p-4">
        <Image src={src} alt={alt} width={300} height={300} className="object-contain w-full aspect-video mix-blend-multiply" priority={true} />
    </figure>
);

export const CardTitle: FC<PropsWithChildren> = ({ children }) => <h2 className="font-semibold line-clamp-2">{children}</h2>;
export const CardBody: FC<PropsWithChildren> = ({ children }) => <p className="text-sm">{children}</p>;
export const CardFooter: FC<PropsWithChildren> = ({ children }) => <div className="mt-auto pt-4">{children}</div>;

interface CardProps {
    href?: string;
    onClick?: () => void;
}

const Card: FC<PropsWithChildren<CardProps>> = ({ href, children, onClick }) => {
    const BaseCard = () => (
        <div
            className={`bg-slate-50 p-4 border border-slate-300 rounded-md transition-transform hover:scale-105 flex flex-col h-full ${
                onClick ? 'cursor-pointer' : ''
            }`}
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
