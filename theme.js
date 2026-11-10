import { Platform } from 'react-native';

export const colors = {
  primary: '#4F46E5',
  primarySoft: '#EEF2FF',
  bg: '#F3F4F6',
  card: '#FFFFFF',
  text: '#111827',
  muted: '#6B7280',
  border: '#E5E7EB',
  danger: '#EF4444',
  dangerSoft: '#FEE2E2',
};

export const shadow = Platform.select({
  web: { boxShadow: '0 4px 14px rgba(0,0,0,0.08)' },
  default: {
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
});