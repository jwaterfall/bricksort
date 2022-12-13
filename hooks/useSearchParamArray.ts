import useSearchParam from "./useSearchParam";

function useSearchParamArray(name: string, initialValue?: string[]) {
  const [stringValue, setStringValue] = useSearchParam(name, initialValue?.join(","));
  const values = stringValue ? stringValue.split(",") : [];

  const includesValue = (newValue: string) => values.includes(newValue.toString());

  const setValues = (newValues: string[]) => {
    setStringValue(newValues.join(","));
  };

  const addValues = (...newValues: string[]) => {
    setValues([...values, ...newValues]);
  };

  const removeValues = (...newValues: string[]) => {
    setValues(values.filter((v) => !newValues.includes(v)));
  };

  const toggleValue = (newValue: string) => {
    if (includesValue(newValue)) {
      removeValues(newValue);
    } else {
      addValues(newValue);
    }
  };

  return {
    values,
    addValues,
    removeValues,
    toggleValue,
    includesValue,
  };
}

export default useSearchParamArray;
