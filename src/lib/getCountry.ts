export const getCountry = async (): Promise<string> => {
  const res: Response = await fetch('http://ip-api.com/json');
  if (!res.ok) throw new Error('Response failed');
  const json = await res.json();
  return json.countryCode;
};
