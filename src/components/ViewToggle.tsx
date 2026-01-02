"use client";

export type ViewType = "grid" | "list";

interface ViewToggleProps {
  view: ViewType;
  onViewChange: (view: ViewType) => void;
}

export function ViewToggle({ view, onViewChange }: ViewToggleProps) {
  return (
    <div className="flex rounded-lg bg-slate-800 p-1">
      <button
        type="button"
        onClick={() => onViewChange("grid")}
        className={`flex-1 rounded-md px-4 py-2 text-sm font-medium transition-colors ${
          view === "grid"
            ? "bg-slate-700 text-white"
            : "text-slate-400 hover:text-white"
        }`}
      >
        Grid
      </button>
      <button
        type="button"
        onClick={() => onViewChange("list")}
        className={`flex-1 rounded-md px-4 py-2 text-sm font-medium transition-colors ${
          view === "list"
            ? "bg-slate-700 text-white"
            : "text-slate-400 hover:text-white"
        }`}
      >
        List
      </button>
    </div>
  );
}
