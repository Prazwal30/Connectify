import { useSyncExternalStore } from "react";

let theme = localStorage.getItem("connectify-theme") || "night";
const listeners = new Set();

const subscribe = (listener) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

const getSnapshot = () => theme;

const setTheme = (nextTheme) => {
  theme = nextTheme;
  localStorage.setItem("connectify-theme", nextTheme);
  listeners.forEach((listener) => listener());
};

const useThemeStore = () => {
  const currentTheme = useSyncExternalStore(subscribe, getSnapshot);

  return { theme: currentTheme, setTheme };
};

export default useThemeStore;
