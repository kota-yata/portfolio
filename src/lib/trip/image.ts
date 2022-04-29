import fs from 'fs';
import { ImagePool } from '@squoosh/lib';
import { cpuCount } from 'os-utils';

// @squoosh/lib doesn't have type declarations
export class Image {
  private static imagePool = new ImagePool(cpuCount());
  /**
   * Optimize all files in a given directory
   * @param directoryPath Directory path from the root
   * @returns A list of optimized images in binary
   */
  public static async optimizeDirectory(directoryPath: string): Promise<void> {
    const fileNames = fs.readdirSync(directoryPath).filter((fileName) => fileName.includes('webp') && !fileName.includes('thumbnail'));
    // If the optimized directory has already exist, just skip this process
    if (fs.existsSync(`${directoryPath}/optimized`)) {
      // fs.rmSync(`${directoryPath}/optimized`, { recursive: true });
      return;
    };
    console.log(fileNames);
    fs.mkdirSync(`${directoryPath}/optimized`);
    await Promise.all(fileNames.map(async (fileName, index) => {
      console.log(`Optimizing ${fileName}...`);
      const { extension, binary }: { extension: string, binary: NodeJS.ArrayBufferView } = await Image.optimizeImage(`${directoryPath}/${fileName}`);
      fs.writeFileSync(`${directoryPath}/optimized/${index}.${extension}`, binary);
      console.log(`Optimized✨ (${fileName} => ${index}.${extension})`);
    }));
  }
  /**
   * Optimize an image of a given path
   * @param path Image path from the root
   * @returns Extension and binary data
   */
  public static async optimizeImage(path: string): Promise<{ extension: string, binary: NodeJS.ArrayBufferView }> {
    const image = await Image.imagePool.ingestImage(path);
    const bitmap = await image.decoded;
    const width = bitmap.width;
    if (width > 1024) {
      await image.preprocess({
        resize: {
          enabled: true,
          width: 1024
        }
      });
    }
    await image.encode({ webp: { quality: 80 } });
    const result: { extension: string, binary: NodeJS.ArrayBufferView } = await image.encodedWith.webp;
    return result;
  }
  public static async closePool(): Promise<void> {
    await Image.imagePool.close();
  }
  public static getDirsInDir(directoryPath: string): string[] {
    const dirents = fs.readdirSync(directoryPath);
    const dirs: string[] = [];
    for (const dirent of dirents) {
      if (!fs.statSync(`${directoryPath}/${dirent}`).isDirectory()) continue;
      dirs.push(dirent);
    }
    return dirs;
  }
}
