/**
 * Visual design tokens for calendar (see document: event categories, privacy, recurring)
 * Top-designer aesthetic: clean, rounded, clear color coding.
 */

export type EventCategoryKey = 'work' | 'personal' | 'health' | 'hobbies';

// Match reference: Work (blue), Social (green), Family (yellow), Fitness (red)
export const EVENT_CATEGORY_COLORS: Record<EventCategoryKey, string> = {
  work: '#4A90D9',       // Blue – Work
  personal: '#5BA561',    // Green – Social
  health: '#D64545',      // Red – Fitness
  hobbies: '#E8B923',     // Yellow – Family
};

export const TENTATIVE_COLOR = '#6BC4B8';
export const CANCELLED_COLOR = '#9CA3AF';

/** For Duo/Group: distinct colors per user (max 6 for group) */
export const USER_EVENT_COLORS = [
  '#4A90D9', // blue
  '#E85D75', // pink/magenta
  '#6BCB77', // green
  '#FFB347', // orange
  '#9B59B6', // purple
  '#3498DB', // light blue
];

/** Transparency for recurring events (0–1). One-off = 1. */
export const RECURRING_OPACITY = 0.72;
export const ONE_OFF_OPACITY = 1;

/** Confidential events: black bar on top (borderTopWidth + color) */
export const CONFIDENTIAL_INDICATOR = {
  borderTopWidth: 3,
  borderTopColor: '#1a1a1a',
};

/** Status styles */
export const EVENT_STATUS = {
  scheduled: {},
  tentative: {
    opacity: 0.85,
    borderStyle: 'dashed' as const,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.2)',
  },
  cancelled: {
    opacity: 0.5,
    textDecorationLine: 'line-through' as const,
  },
};

/** react-native-calendars theme (clean, modern) */
export const CALENDAR_THEME = {
  backgroundColor: '#ffffff',
  calendarBackground: '#ffffff',
  textSectionTitleColor: '#6b7280',
  selectedDayBackgroundColor: '#4A90D9',
  selectedDayTextColor: '#ffffff',
  todayTextColor: '#4A90D9',
  dayTextColor: '#1f2937',
  textDisabledColor: '#d1d5db',
  dotColor: '#4A90D9',
  selectedDotColor: '#ffffff',
  arrowColor: '#4A90D9',
  monthTextColor: '#1f2937',
  textDayFontWeight: '500' as const,
  textMonthFontWeight: '700' as const,
  textDayHeaderFontWeight: '600' as const,
  textDayFontSize: 16,
  textMonthFontSize: 18,
  textDayHeaderFontSize: 13,
};

export const CALENDAR_THEME_DARK = {
  ...CALENDAR_THEME,
  backgroundColor: '#111827',
  calendarBackground: '#111827',
  textSectionTitleColor: '#9ca3af',
  selectedDayBackgroundColor: '#4A90D9',
  selectedDayTextColor: '#ffffff',
  todayTextColor: '#60a5fa',
  dayTextColor: '#f3f4f6',
  textDisabledColor: '#4b5563',
  dotColor: '#4A90D9',
  selectedDotColor: '#ffffff',
  arrowColor: '#60a5fa',
  monthTextColor: '#f3f4f6',
};
