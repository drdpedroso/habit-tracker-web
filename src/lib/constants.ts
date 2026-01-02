import type { Habit } from "@/types";

export const defaultHabits: Habit[] = [
  { id: 1, name: "Wake up 5am", emoji: "⏰" },
  { id: 2, name: "Gym", emoji: "💪" },
  { id: 3, name: "Reading", emoji: "📖" },
  { id: 4, name: "Plan day", emoji: "📋" },
  { id: 5, name: "Finances", emoji: "💰" },
  { id: 6, name: "Deep work", emoji: "🎯" },
  { id: 7, name: "No alcohol", emoji: "🍾" },
  { id: 8, name: "Jiu-Jitsu", emoji: "🥋" },
];

export const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const weekDays = ["S", "M", "T", "W", "T", "F", "S"];
