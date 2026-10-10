"use client";

import { useEffect, useState } from "react";

export function useLocalStorage<T>(
  initialValue: T,
  key: string,
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [value, setValue] = useState<T>(initialValue);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const init = () => {
      try {
        const storedValue = localStorage.getItem(key);

        if (storedValue !== null) {
          setValue(JSON.parse(storedValue));
        }
      } catch (error) {
        console.error("Failed to read localStorage:", error);
      } finally {
        setIsLoaded(true);
      }
    };
    init();
  }, [key]);

  useEffect(() => {
    if (!isLoaded) return;

    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error("Failed to save localStorage:", error);
    }
  }, [value, key, isLoaded]);

  return [value, setValue];
}
