export const getDaysInMonth = (month: number, year: number): number =>
  new Date(year, month + 1, 0).getDate();

export const getDayOfWeek = (
  day: number,
  month: number,
  year: number,
): number => new Date(year, month, day).getDay();

export const getProgressColor = (
  percent: number,
): "green" | "yellow" | "red" => {
  if (percent >= 80) return "green";
  if (percent >= 50) return "yellow";
  return "red";
};

export const getProgressColorClass = (percent: number): string => {
  const color = getProgressColor(percent);
  switch (color) {
    case "green":
      return "bg-green-500";
    case "yellow":
      return "bg-yellow-500";
    case "red":
      return "bg-red-400";
  }
};

export const getProgressTextColorClass = (percent: number): string => {
  const color = getProgressColor(percent);
  switch (color) {
    case "green":
      return "text-green-400";
    case "yellow":
      return "text-yellow-400";
    case "red":
      return "text-red-400";
  }
};
