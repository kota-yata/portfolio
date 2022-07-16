/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
import fs from 'fs';
import { Image } from './image.js';

const run = async (directoryPath, width, dirName, exclude) => {
  exclude.push(dirName);
  const files = Image.getFilesRecursively(directoryPath, exclude);
  const filtered = Image.filterFiles(files);
  await Promise.all(filtered.map(async (file, index) => {
    const fileNameWithoutExtension = file.fileName.match(/([^/]*)\./)[1];
    const targetPath = `${file.directoryPath}/${file.fileName}`;
    console.log(`Optimizing ${targetPath}...`);
    const distPath = `${file.directoryPath}/${dirName}`;
    const doesDistDirExist = fs.existsSync(distPath);
    if (!doesDistDirExist) fs.mkdirSync(distPath);
    if (file.isHeic) {
      const isConverted = await Image.heicToWebp(targetPath, distPath, width);
      if (!isConverted) throw new Error('Conversion from heic to webp failed');
      fs.renameSync(`${distPath}/${fileNameWithoutExtension}.webp`, `${distPath}/${index}.webp`);
      console.log(`Optimized✨ (${targetPath})`);
      return;
    }
    const imageData = await Image.squooshOptimize(targetPath);
    Image.resize(imageData, `${distPath}/${index}.webp`, width);
    console.log(`Optimized✨ (${targetPath})`);
  })).catch((err) => {
    if (err) console.log(err);
  });
  // eslint-disable-next-line no-useless-return
  return;
};

export default run;
