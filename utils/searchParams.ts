import { usePathname, useRouter } from 'next/navigation';

export type SearchParamValue = undefined | string | string[];

export interface SearchParams {
    [key: string]: SearchParamValue;
}

export const parseIntSearchParam = (value: SearchParamValue) => {
    return typeof value === 'string' ? parseInt(value) : undefined;
};

export const parseStringSearchParam = (value: SearchParamValue) => {
    return typeof value === 'string' ? value : undefined;
};

export const parseArraySearchParam = (value: SearchParamValue) => {
    if (Array.isArray(value)) return value;
    return typeof value === 'string' ? [value] : undefined;
};

export const useSetSearchParam = () => {
    const pathName = usePathname();
    const router = useRouter();

    return (key: string, value: string | number | null) => {
        const url = new URL(pathName, window.location.origin);

        if (value === null) {
            url.searchParams.delete(key);
        } else {
            url.searchParams.set(key, typeof value === 'number' ? value.toString() : value);
        }

        router.push(url.toString());
    };
};
