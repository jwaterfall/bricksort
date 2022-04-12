import { ChangeEvent, useState } from 'react';

type Event = ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>;

type UseInput<T> = [T, (e: Event) => void, (newValue: T) => void];

const useInput = <T>(initialValue: T) => {
  const [value, setValue] = useState(initialValue);

  const handleOnChange = (e: Event) => {
    setValue(e.target.value as unknown as T);
  };

  return [value, handleOnChange, setValue] as UseInput<T>;
};

export default useInput;
