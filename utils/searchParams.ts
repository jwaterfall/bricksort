import { usePathname, useRouter } from 'next/navigation';

export interface SearchParams {
    [key: string]: string | undefined;
}

export const parseIntSearchParam = (value?: string) => (value ? parseInt(value, 10) : undefined);

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
