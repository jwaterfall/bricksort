import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useCallback, useEffect } from "react";

export type UseSearchParamResult<T, U = T> = readonly [T | U, (newValue?: T) => void];

function useSearchParam(name: string): UseSearchParamResult<string | undefined>;
function useSearchParam(name: string, defaultValue?: string): UseSearchParamResult<string>;
function useSearchParam(name: string, defaultValue?: string): UseSearchParamResult<string | undefined> {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const value = searchParams.get(name) ?? undefined;

  const setValue = useCallback(
    (newValue?: string) => {
      const newSearchParams = new URLSearchParams(searchParams.toString());

      if (newValue === undefined) {
        newSearchParams.delete(name);
      } else {
        newSearchParams.set(name, newValue);
      }

      router.push(`${pathname}?${newSearchParams.toString()}`);
    },
    [searchParams, name, pathname, router]
  );

  useEffect(() => {
    if (value === undefined && defaultValue !== undefined) {
      setValue(defaultValue);
    }
  }, [value, defaultValue, setValue]);

  return [value ?? defaultValue, setValue] as const;
}

export default useSearchParam;
