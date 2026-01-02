"use client";

import {
  getDayOfWeek,
  getProgressColorClass,
  getProgressTextColorClass,
} from "@/lib/calendar";
import { weekDays } from "@/lib/constants";
import type { Habit, HabitProgress } from "@/types";

interface HabitCardProps {
  habit: Habit;
  days: number[];
  currentMonth: number;
  currentYear: number;
  progress: HabitProgress;
  isCompleted: (habitId: number, day: number) => boolean;
  toggleCompletion: (habitId: number, day: number) => void;
  onRemove: () => void;
}

export function HabitCard({
  habit,
  days,
  currentMonth,
  currentYear,
  progress,
  isCompleted,
  toggleCompletion,
  onRemove,
}: HabitCardProps) {
  const firstDayOfWeek = getDayOfWeek(1, currentMonth, currentYear);
  const emptyDays = Array.from({ length: firstDayOfWeek }, (_, i) => i);

  return (
    <div className="group rounded-xl bg-slate-800 p-4 transition-colors hover:bg-slate-750">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xl">{habit.emoji}</span>
          <span className="font-medium text-white">{habit.name}</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <span
              className={`text-lg font-bold ${getProgressTextColorClass(progress.percent)}`}
            >
              {progress.percent}%
            </span>
            <p className="text-xs text-slate-500">
              {progress.completed}/{progress.total} days
            </p>
          </div>
          <button
            type="button"
            onClick={onRemove}
            className="hidden text-slate-500 transition-colors hover:text-red-400 group-hover:block"
            aria-label={`Remove ${habit.name}`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-5 w-5"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>

      <div className="mb-3 grid grid-cols-7 gap-1">
        {weekDays.map((day) => (
          <div
            key={day}
            className="flex aspect-square items-center justify-center text-xs text-slate-500"
          >
            {day}
          </div>
        ))}

        {emptyDays.map((i) => (
          <div key={`empty-${i}`} className="aspect-square" />
        ))}

        {days.map((day) => {
          const completed = isCompleted(habit.id, day);
          return (
            <button
              type="button"
              key={day}
              onClick={() => toggleCompletion(habit.id, day)}
              className={`flex aspect-square items-center justify-center rounded text-xs transition-all active:scale-90 ${
                completed
                  ? "bg-green-500 font-medium text-white"
                  : "bg-slate-700 text-slate-400 hover:bg-slate-600"
              }`}
              aria-label={`${completed ? "Unmark" : "Mark"} ${habit.name} for day ${day}`}
            >
              {day}
            </button>
          );
        })}
      </div>

      <div className="h-1.5 overflow-hidden rounded-full bg-slate-700">
        <div
          className={`h-full rounded-full transition-all ${getProgressColorClass(progress.percent)}`}
          style={{ width: `${progress.percent}%` }}
        />
      </div>
    </div>
  );
}
