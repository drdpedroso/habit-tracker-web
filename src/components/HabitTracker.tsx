"use client";

import { useState } from "react";
import { useHabits } from "@/hooks/useHabits";
import { AddHabitModal } from "./AddHabitModal";
import { FAB } from "./FAB";
import { GridView } from "./GridView";
import { Header } from "./Header";
import { ListView } from "./ListView";
import { StatsBar } from "./StatsBar";
import { ViewToggle, type ViewType } from "./ViewToggle";

export function HabitTracker() {
  const {
    habits,
    currentMonth,
    currentYear,
    days,
    isLoaded,
    isCompleted,
    toggleCompletion,
    getHabitProgress,
    getTotalProgress,
    addHabit,
    removeHabit,
    goToPreviousMonth,
    goToNextMonth,
  } = useHabits();

  const [view, setView] = useState<ViewType>("grid");
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!isLoaded) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-700 border-t-blue-500" />
      </div>
    );
  }

  const totalProgress = getTotalProgress();

  return (
    <div className="min-h-screen bg-slate-900">
      <div className="sticky top-0 z-30 bg-slate-900 pb-4">
        <div className="mx-auto max-w-6xl px-4 pt-4">
          <Header
            currentMonth={currentMonth}
            currentYear={currentYear}
            onPreviousMonth={goToPreviousMonth}
            onNextMonth={goToNextMonth}
          />

          <div className="mt-4">
            <StatsBar
              habitCount={habits.length}
              totalProgress={totalProgress}
            />
          </div>

          <div className="mt-4 flex items-center justify-between gap-4">
            <ViewToggle view={view} onViewChange={setView} />
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="hidden items-center gap-2 rounded-lg bg-blue-500 px-4 py-2 font-medium text-white transition-colors hover:bg-blue-600 md:flex"
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
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
              Add Habit
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 pb-24 md:pb-8">
        {view === "grid" ? (
          <GridView
            habits={habits}
            days={days}
            currentMonth={currentMonth}
            currentYear={currentYear}
            isCompleted={isCompleted}
            toggleCompletion={toggleCompletion}
            getHabitProgress={getHabitProgress}
            onRemoveHabit={removeHabit}
          />
        ) : (
          <ListView
            habits={habits}
            days={days}
            currentMonth={currentMonth}
            currentYear={currentYear}
            isCompleted={isCompleted}
            toggleCompletion={toggleCompletion}
            getHabitProgress={getHabitProgress}
            onRemoveHabit={removeHabit}
          />
        )}
      </div>

      <FAB onClick={() => setIsModalOpen(true)} />

      <AddHabitModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={addHabit}
      />
    </div>
  );
}
