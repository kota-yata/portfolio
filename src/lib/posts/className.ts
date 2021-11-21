export const getClassName = (category: string): string => {
  if (category === '暗号') return 'cryptography';
  if (category === '研究') return 'research';
  if (category === 'アルゴリズム') return 'algorithm';
  if (category === '非技術') return 'non-tech';
  if (category === 'プログラミング') return 'programming';
  if (category === '計算機科学') return 'cs';
  return '';
};
