import { FC, PropsWithChildren } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export enum CardBorder {
    Error = 'error',
    Warning = 'warning',
    Success = 'success',
}

interface CardProps {
    body: string;
    title?: string;
    href?: string;
    onClick?: () => void;
    border?: CardBorder;
}

interface CardWithImageProps extends CardProps {
    imgSrc: string;
    imgAlt: string;
}

const Card: FC<PropsWithChildren<CardProps | CardWithImageProps>> = ({ title, body, href, children, onClick, border, ...props }) => {
    const getBorderStyles = () => {
        switch (border) {
            case CardBorder.Error:
                return `border-2 border-error`;
            case CardBorder.Warning:
                return `border-2 border-warning`;
            case CardBorder.Success:
                return `border-2 border-success`;
            default:
                return '';
        }
    };

    const BaseCard = () => (
        <div className={`card card-compact bg-base-100 shadow-xl h-fit ${getBorderStyles()}`} onClick={onClick}>
            {'imgSrc' in props && (
                <figure>
                    <Image
                        src={props.imgSrc}
                        alt={props.imgAlt}
                        width={300}
                        height={300}
                        className="p-4 object-contain w-full aspect-video mix-blend-multiply"
                        priority={true}
                    />
                </figure>
            )}
            <div className="card-body">
                {title && <h2 className="card-title">{title}</h2>}
                <p className="font-medium">{body}</p>
                {children && <div className="card-actions mt-4">{children}</div>}
            </div>
        </div>
    );

    return href ? (
        <Link href={href} className="h-fit">
            <BaseCard />
        </Link>
    ) : (
        <BaseCard />
    );
};

export default Card;
