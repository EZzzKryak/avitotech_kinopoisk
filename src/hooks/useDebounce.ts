import { DependencyList, useCallback, useEffect } from "react";

export const useDebounce = (
  effect: () => void,
  dependencies: DependencyList,
  delay: number,
) => {
  const callback = useCallback(effect, dependencies);

  useEffect(() => {
    const timeout = setTimeout(callback, delay);
    return () => clearTimeout(timeout);
  }, [callback, delay]);
};
