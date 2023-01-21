import { useEffect, useState } from "react";

const useDebounce = <T>(state: T, timeout: number = 500) => {
  const [debouncedState, setDebouncedState] = useState(state);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedState(state);
    }, timeout);

    return () => {
      clearTimeout(handler);
    };
  }, [state, timeout]);

  return debouncedState;
};

export default useDebounce;
