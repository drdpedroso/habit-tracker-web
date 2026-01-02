"use client";

import { useEffect, useRef, useState } from "react";

interface AddHabitModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (name: string, emoji: string) => void;
}

const defaultEmojis = ["📚", "🏃", "💤", "🧘", "💊", "🥗", "💧", "✍️"];

export function AddHabitModal({ isOpen, onClose, onAdd }: AddHabitModalProps) {
  const [name, setName] = useState("");
  const [emoji, setEmoji] = useState("📚");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setName("");
      setEmoji("📚");
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onAdd(name.trim(), emoji);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
      onClick={onClose}
      onKeyDown={(e) => e.key === "Escape" && onClose()}
    >
      <div
        role="document"
        className="w-full max-w-md rounded-2xl bg-slate-800 p-6"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <h2 id="modal-title" className="mb-4 text-xl font-semibold text-white">
          Add New Habit
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="habit-name"
              className="mb-2 block text-sm text-slate-400"
            >
              Habit Name
            </label>
            <input
              ref={inputRef}
              id="habit-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Morning meditation"
              className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-white placeholder-slate-500 outline-none focus:border-blue-500"
            />
          </div>

          <fieldset className="mb-6 border-0 p-0">
            <legend className="mb-2 block text-sm text-slate-400">
              Choose an Emoji
            </legend>
            <div className="flex flex-wrap gap-2">
              {defaultEmojis.map((e) => (
                <button
                  key={e}
                  type="button"
                  onClick={() => setEmoji(e)}
                  className={`flex h-10 w-10 items-center justify-center rounded-lg text-xl transition-all ${
                    emoji === e
                      ? "bg-blue-500 ring-2 ring-blue-400 ring-offset-2 ring-offset-slate-800"
                      : "bg-slate-700 hover:bg-slate-600"
                  }`}
                >
                  {e}
                </button>
              ))}
            </div>
          </fieldset>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-lg border border-slate-700 px-4 py-3 text-white transition-colors hover:bg-slate-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!name.trim()}
              className="flex-1 rounded-lg bg-blue-500 px-4 py-3 font-medium text-white transition-colors hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Add Habit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
