"use client";

import { useCallback, useMemo, useState } from "react";
import { getDaysInMonth } from "@/lib/calendar";
import { defaultHabits } from "@/lib/constants";
import type { Completions, Habit, HabitProgress } from "@/types";
import { useLocalStorage } from "./useLocalStorage";

export function useHabits() {
  const [habits, setHabits, habitsLoaded] = useLocalStorage<Habit[]>(
    "habits",
    defaultHabits,
  );
  const [completions, setCompletions, completionsLoaded] =
    useLocalStorage<Completions>("completions", {});

  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  const isLoaded = habitsLoaded && completionsLoaded;

  const daysInMonth = useMemo(
    () => getDaysInMonth(currentMonth, currentYear),
    [currentMonth, currentYear],
  );

  const days = useMemo(
    () => Array.from({ length: daysInMonth }, (_, i) => i + 1),
    [daysInMonth],
  );

  const isCompleted = useCallback(
    (habitId: number, day: number) => {
      const key = `${currentYear}-${currentMonth}-${day}-${habitId}`;
      return completions[key] || false;
    },
    [completions, currentMonth, currentYear],
  );

  const toggleCompletion = useCallback(
    (habitId: number, day: number) => {
      const key = `${currentYear}-${currentMonth}-${day}-${habitId}`;
      setCompletions((prev) => ({ ...prev, [key]: !prev[key] }));
    },
    [currentMonth, currentYear, setCompletions],
  );

  const getHabitProgress = useCallback(
    (habitId: number): HabitProgress => {
      const completed = days.filter((d) => isCompleted(habitId, d)).length;
      return {
        completed,
        total: daysInMonth,
        percent: Math.round((completed / daysInMonth) * 100),
      };
    },
    [days, daysInMonth, isCompleted],
  );

  const getTotalProgress = useCallback((): HabitProgress => {
    const totalPossible = habits.length * daysInMonth;
    let totalCompleted = 0;

    for (const habit of habits) {
      totalCompleted += days.filter((d) => isCompleted(habit.id, d)).length;
    }

    return {
      completed: totalCompleted,
      total: totalPossible,
      percent:
        totalPossible > 0
          ? Math.round((totalCompleted / totalPossible) * 100)
          : 0,
    };
  }, [habits, days, daysInMonth, isCompleted]);

  const addHabit = useCallback(
    (name: string, emoji: string) => {
      const maxId = habits.reduce((max, h) => Math.max(max, h.id), 0);
      const newHabit: Habit = { id: maxId + 1, name, emoji };
      setHabits((prev) => [...prev, newHabit]);
    },
    [habits, setHabits],
  );

  const removeHabit = useCallback(
    (habitId: number) => {
      setHabits((prev) => prev.filter((h) => h.id !== habitId));
    },
    [setHabits],
  );

  const goToPreviousMonth = useCallback(() => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((prev) => prev - 1);
    } else {
      setCurrentMonth((prev) => prev - 1);
    }
  }, [currentMonth]);

  const goToNextMonth = useCallback(() => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((prev) => prev + 1);
    } else {
      setCurrentMonth((prev) => prev + 1);
    }
  }, [currentMonth]);

  return {
    habits,
    completions,
    currentMonth,
    currentYear,
    daysInMonth,
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
  };
}
