const getFrontMatter = (data: string): { name: string, text: string }[] => {
  const withExtraBlank = data.split(/---/g)[1].split(/\n/g);
  const lines = withExtraBlank.slice(1, withExtraBlank.length - 1);
  const frontMatter = [];
  lines.map(c => {
    const content = c.split(':');
    content[1] = content[1].split(' ')[1];
    frontMatter.push({
      name: content[0],
      text: content[1]
    });
  });
  return frontMatter;
};

export const process = (data: string): void => {
  const frontMatter = getFrontMatter(data);
  console.log(frontMatter);
};
