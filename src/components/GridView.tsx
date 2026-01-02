"use client";

import { getDayOfWeek, getProgressTextColorClass } from "@/lib/calendar";
import { weekDays } from "@/lib/constants";
import type { Habit, HabitProgress } from "@/types";

interface GridViewProps {
  habits: Habit[];
  days: number[];
  currentMonth: number;
  currentYear: number;
  isCompleted: (habitId: number, day: number) => boolean;
  toggleCompletion: (habitId: number, day: number) => void;
  getHabitProgress: (habitId: number) => HabitProgress;
  onRemoveHabit: (habitId: number) => void;
}

export function GridView({
  habits,
  days,
  currentMonth,
  currentYear,
  isCompleted,
  toggleCompletion,
  getHabitProgress,
  onRemoveHabit,
}: GridViewProps) {
  return (
    <div className="overflow-x-auto rounded-xl bg-slate-800">
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="sticky left-0 z-10 bg-slate-800 p-2 text-left">
              <span className="text-sm font-medium text-slate-400">Habit</span>
            </th>
            {days.map((day) => {
              const dayOfWeek = getDayOfWeek(day, currentMonth, currentYear);
              return (
                <th key={day} className="p-1 text-center">
                  <div className="flex flex-col items-center">
                    <span className="text-xs text-slate-500">
                      {weekDays[dayOfWeek]}
                    </span>
                    <span className="text-xs font-medium text-slate-400">
                      {day}
                    </span>
                  </div>
                </th>
              );
            })}
            <th className="p-2 text-right">
              <span className="text-sm font-medium text-slate-400">%</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {habits.map((habit) => {
            const progress = getHabitProgress(habit.id);
            return (
              <tr
                key={habit.id}
                className="group border-t border-slate-700 hover:bg-slate-750"
              >
                <td className="sticky left-0 z-10 bg-slate-800 p-2 group-hover:bg-slate-700">
                  <div className="flex items-center gap-2">
                    <span className="text-base">{habit.emoji}</span>
                    <span className="max-w-[80px] truncate text-sm text-white md:max-w-[120px]">
                      {habit.name}
                    </span>
                    <button
                      type="button"
                      onClick={() => onRemoveHabit(habit.id)}
                      className="ml-auto hidden text-slate-500 transition-colors hover:text-red-400 group-hover:block"
                      aria-label={`Remove ${habit.name}`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="h-4 w-4"
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
                </td>
                {days.map((day) => {
                  const completed = isCompleted(habit.id, day);
                  return (
                    <td key={day} className="p-1 text-center">
                      <button
                        type="button"
                        onClick={() => toggleCompletion(habit.id, day)}
                        className={`flex h-6 w-6 items-center justify-center rounded transition-all active:scale-90 md:h-7 md:w-7 ${
                          completed
                            ? "bg-green-500 text-white"
                            : "border border-slate-700 bg-slate-800 hover:border-slate-500"
                        }`}
                        aria-label={`${completed ? "Unmark" : "Mark"} ${habit.name} for day ${day}`}
                      >
                        {completed && (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={3}
                            stroke="currentColor"
                            className="h-3 w-3 md:h-4 md:w-4"
                            aria-hidden="true"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M4.5 12.75l6 6 9-13.5"
                            />
                          </svg>
                        )}
                      </button>
                    </td>
                  );
                })}
                <td className="p-2 text-right">
                  <span
                    className={`text-sm font-medium ${getProgressTextColorClass(progress.percent)}`}
                  >
                    {progress.percent}%
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
