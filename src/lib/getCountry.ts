import { writable } from 'svelte/store';

export const getCountry = (): string => {
  const countryCode: string | undefined = localStorage.getItem('countryCode');
  if (countryCode) return countryCode;
  localStorage.setItem('countryCode', 'JP');
  return 'JP';
};

export const countryCode = writable('JP');
