import { create } from 'zustand'

const useThemeStore = create((set) => ({
    theme: localStorage.getItem("connectify-theme")||"light",
    setTheme: (theme)=>
    {
        localStorage.setItem("connectify-theme",theme)
        set({theme});
    }
}))

export default useThemeStore;
