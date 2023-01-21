import { useSearchParams, useRouter, usePathname } from "next/navigation";

export interface SearchParamValues {
  [key: string]: string | number | undefined;
}

const useSetSearchParams = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const setSearchParams = (values: SearchParamValues) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());

    for (const [name, value] of Object.entries(values)) {
      if (value === undefined) {
        newSearchParams.delete(name);
      } else {
        newSearchParams.set(name, value.toString());
      }
    }

    router.push(`${pathname}?${newSearchParams.toString()}`);
  };

  return setSearchParams;
};

export default useSetSearchParams;
