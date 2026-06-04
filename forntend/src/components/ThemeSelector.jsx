import { PaletteIcon } from "lucide-react";
import { THEMES } from "../constansts/index.js";
import useThemeStore from "../hooks/useThemeStore.js";

const ThemeSelector = () => {
  const { theme, setTheme } = useThemeStore();

  return (
    <div className="dropdown dropdown-end">
      <button tabIndex={0} type="button" className="btn btn-ghost btn-circle">
        <PaletteIcon className="h-5 w-5" />
      </button>

      <div
        tabIndex={0}
        className="dropdown-content mt-2 max-h-80 w-56 overflow-auto rounded-2xl border border-base-content/10 bg-base-200 p-1 shadow-2xl"
      >
        <div className="space-y-1">
          {THEMES.map((themeOption) => (
            <button
              key={themeOption.name}
              className={`w-full rounded-xl px-4 py-3 flex items-center gap-3 transition-colors ${
                theme === themeOption.name
                  ? "bg-primary/10 text-primary"
                  : "hover:bg-base-content/5"
              }`}
              type="button"
              onClick={() => setTheme(themeOption.name)}
            >
              <PaletteIcon className="h-4 w-4" />
              <span className="text-sm font-medium">{themeOption.label}</span>
              <span className="ml-auto flex gap-1">
                {themeOption.colors.map((color) => (
                  <span
                    key={color}
                    className="h-2 w-2 rounded-full"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ThemeSelector;
