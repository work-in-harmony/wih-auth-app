import { Sun, Moon } from "lucide-react";

function LightModeButton({ toggleTheme, theme }) {
  const Icon = theme === "light" ? Moon : Sun;

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full bg-wih-700 text-wih-50 hover:bg-wih-600 transition"
      aria-label="Toggle theme"
    >
      <Icon size={18} />
    </button>
  );
}

export default LightModeButton;
