import useSearchParam, { UseSearchParamResult } from "./useSearchParam";

function useSearchParamNumber(name: string): UseSearchParamResult<number, undefined>;
function useSearchParamNumber(name: string, initialValue: number): UseSearchParamResult<number>;
function useSearchParamNumber(name: string, initialValue?: number): UseSearchParamResult<number, undefined> {
  const [stringValue, setStringValue] = useSearchParam(name, initialValue?.toString());

  const value = parseInt(stringValue);

  const setValue = (newValue?: number) => {
    setStringValue(newValue?.toString());
  };

  return [value, setValue] as const;
}

export default useSearchParamNumber;
