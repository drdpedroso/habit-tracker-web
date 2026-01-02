"use client";

import { getProgressTextColorClass } from "@/lib/calendar";
import type { HabitProgress } from "@/types";

interface StatsBarProps {
  habitCount: number;
  totalProgress: HabitProgress;
}

export function StatsBar({ habitCount, totalProgress }: StatsBarProps) {
  return (
    <div className="flex gap-2 md:gap-3">
      <div className="flex flex-1 flex-col items-center rounded-lg bg-slate-800 p-2 md:p-3">
        <span className="text-lg font-bold text-white md:text-xl">
          {habitCount}
        </span>
        <span className="text-xs text-slate-400 md:text-sm">Habits</span>
      </div>

      <div className="flex flex-1 flex-col items-center rounded-lg bg-slate-800 p-2 md:p-3">
        <span className="text-lg font-bold text-white md:text-xl">
          {totalProgress.completed}
        </span>
        <span className="text-xs text-slate-400 md:text-sm">Completed</span>
      </div>

      <div className="flex flex-1 flex-col items-center rounded-lg bg-slate-800 p-2 md:p-3">
        <span
          className={`text-lg font-bold md:text-xl ${getProgressTextColorClass(totalProgress.percent)}`}
        >
          {totalProgress.percent}%
        </span>
        <span className="text-xs text-slate-400 md:text-sm">Progress</span>
      </div>
    </div>
  );
}
