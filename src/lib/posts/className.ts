export const getClassName = (category: string): string => {
  if (category === 'Cryptography') return 'cryptography';
  if (category === 'Decentralized') return 'decentralized';
  if (category === 'Algorithm') return 'algorithm';
  if (category === 'Non-Tech') return 'non-tech';
  if (category === 'Programming') return 'programming';
  if (category === 'Computer Science') return 'cs';
  return '';
};
