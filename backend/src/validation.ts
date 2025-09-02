export const validateCurrency = (currency: any): string | null => {
  if (typeof currency !== 'string') return 'Currency must be a string';
  if (!currency.trim()) return 'Currency cannot be empty';
  if (currency.length > 10) return 'Currency code too long';
  if (!/^[A-Z]+$/.test(currency)) return 'Currency must contain only uppercase letters';
  return null;
};

export const sanitizeCurrency = (currency: string): string => {
  return currency.trim().toUpperCase();
};
