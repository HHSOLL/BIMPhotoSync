"use client";

export type PhotoOption = {
  value: string;
  label: string;
};

export const defaultTradeOptions: PhotoOption[] = [
  { value: "WATERPROOF", label: "방수" },
  { value: "TILE", label: "타일" },
  { value: "PAINT", label: "도장" },
  { value: "ELECTRIC", label: "전기" },
  { value: "MEP", label: "기계/설비" },
  { value: "WINDOW", label: "창호" },
  { value: "CONCRETE", label: "콘크리트" },
  { value: "OTHER", label: "기타" }
];

export const defaultSurfaceOptions: PhotoOption[] = [
  { value: "FLOOR", label: "바닥" },
  { value: "ENTRY_WALL", label: "기준벽(출입문)" },
  { value: "FRONT_WALL", label: "전면벽" },
  { value: "RIGHT_WALL", label: "우측벽" },
  { value: "LEFT_WALL", label: "좌측벽" },
  { value: "WALL", label: "벽(기타)" },
  { value: "CEILING", label: "천장" },
  { value: "WINDOW", label: "창호" },
  { value: "DOOR", label: "문" },
  { value: "PIPE", label: "배관" },
  { value: "ELECTRIC", label: "전기" },
  { value: "OTHER", label: "기타" }
];

export const customTradeStorageKey = "bps_custom_trade_labels";

export function readCustomTradeOptions() {
  if (typeof window === "undefined") return [];
  const raw = window.localStorage.getItem(customTradeStorageKey);
  if (!raw) return [];
  const parsed: unknown = JSON.parse(raw);
  if (!Array.isArray(parsed)) return [];
  return parsed.filter(isPhotoOption);
}

export function saveCustomTradeOptions(options: PhotoOption[]) {
  window.localStorage.setItem(customTradeStorageKey, JSON.stringify(options));
}

export function labelForOption(options: PhotoOption[], value: string) {
  return options.find((option) => option.value === value)?.label ?? value;
}

export function mergeCustomTradeOptions(customOptions: PhotoOption[]) {
  return [...defaultTradeOptions, ...customOptions];
}

export function customTradeValue(label: string) {
  return `CUSTOM:${label.trim()}`;
}

export function apiTradeValue(value: string) {
  return value.startsWith("CUSTOM:") ? "OTHER" : value;
}

export function customTradeLabel(value: string) {
  return value.startsWith("CUSTOM:") ? value.slice("CUSTOM:".length) : "";
}

function isPhotoOption(value: unknown): value is PhotoOption {
  if (!value || typeof value !== "object") return false;
  const candidate = value as Record<string, unknown>;
  return typeof candidate.value === "string" && typeof candidate.label === "string";
}
