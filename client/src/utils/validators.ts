export const validateEmail = (email: string): string | null => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) return 'Email is required';
  if (!re.test(email)) return 'Invalid email format';
  return null;
};

export const validatePhone = (phone: string): string | null => {
  const re = /^[0-9]{10}$/;
  if (!phone) return 'Phone number is required';
  if (!re.test(phone)) return 'Phone must be 10 digits';
  return null;
};

export const validateRequired = (value: string | any[] | number | null | undefined, fieldName: string): string | null => {
  if (value === null || value === undefined) return `${fieldName} is required`;
  if (typeof value === 'string' && value.trim() === '') return `${fieldName} is required`;
  if (Array.isArray(value) && value.length === 0) return `${fieldName} is required`;
  return null;
};

export const validatePositiveNumber = (value: number | string | undefined | null, fieldName: string): string | null => {
  if (value === null || value === undefined || value === '') return `${fieldName} is required`;
  const num = Number(value);
  if (isNaN(num)) return `${fieldName} must be a number`;
  if (num <= 0) return `${fieldName} must be greater than zero`;
  return null;
};

export const validateMinValue = (value: number | string | undefined | null, min: number, fieldName: string): string | null => {
  if (value === null || value === undefined || value === '') return `${fieldName} is required`;
  const num = Number(value);
  if (isNaN(num)) return `${fieldName} must be a number`;
  if (num < min) return `${fieldName} must be at least ${min}`;
  return null;
};

export const validateDate = (date: string, fieldName: string): string | null => {
  if (!date) return `${fieldName} is required`;
  const d = new Date(date);
  if (isNaN(d.getTime())) return `Invalid date format for ${fieldName}`;
  return null;
};
