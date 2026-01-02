"use client";

import { months } from "@/lib/constants";

interface HeaderProps {
  currentMonth: number;
  currentYear: number;
  onPreviousMonth: () => void;
  onNextMonth: () => void;
}

export function Header({
  currentMonth,
  currentYear,
  onPreviousMonth,
  onNextMonth,
}: HeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <button
        type="button"
        onClick={onPreviousMonth}
        className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-800 text-white transition-colors hover:bg-slate-700 active:scale-95"
        aria-label="Previous month"
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
            d="M15.75 19.5L8.25 12l7.5-7.5"
          />
        </svg>
      </button>

      <h1 className="text-xl font-semibold text-white md:text-2xl">
        {months[currentMonth]} {currentYear}
      </h1>

      <button
        type="button"
        onClick={onNextMonth}
        className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-800 text-white transition-colors hover:bg-slate-700 active:scale-95"
        aria-label="Next month"
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
            d="M8.25 4.5l7.5 7.5-7.5 7.5"
          />
        </svg>
      </button>
    </div>
  );
}
