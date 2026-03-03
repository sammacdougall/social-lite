/**
 * Shared header bar styling for all tabs – same background, modern look.
 * Use HEADER_GRADIENT_COLORS with LinearGradient for the banner; use HEADER_BAR_GRADIENT for its style.
 */
export const HEADER_GRADIENT_COLORS = ['#E85D75', '#c94b62'] as const;

export const HEADER_BAR = {
  backgroundColor: '#1e293b',
  minHeight: 52,
  paddingHorizontal: 16,
  paddingVertical: 12,
  borderRadius: 12,
  marginBottom: 12,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.12,
  shadowRadius: 8,
  elevation: 4,
  borderBottomWidth: 0,
} as const;

/** Header bar style for use with LinearGradient (no backgroundColor). */
export const HEADER_BAR_GRADIENT = {
  minHeight: HEADER_BAR.minHeight,
  paddingHorizontal: HEADER_BAR.paddingHorizontal,
  paddingVertical: HEADER_BAR.paddingVertical,
  borderRadius: HEADER_BAR.borderRadius,
  marginBottom: HEADER_BAR.marginBottom,
  shadowColor: HEADER_BAR.shadowColor,
  shadowOffset: HEADER_BAR.shadowOffset,
  shadowOpacity: HEADER_BAR.shadowOpacity,
  shadowRadius: HEADER_BAR.shadowRadius,
  elevation: HEADER_BAR.elevation,
} as const;

export const HEADER_TITLE = {
  fontSize: 18,
  fontWeight: '700',
  color: '#fff',
  letterSpacing: 0.3,
} as const;

export const HEADER_ICON = {
  color: '#fff',
  fontSize: 20,
} as const;
