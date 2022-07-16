/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import fs from 'fs';
import { ImagePool } from '@squoosh/lib';
import { cpus } from 'os';
import sharp from 'sharp';
import ConvertAPI from 'convertapi';

// @squoosh/lib doesn't have type declarations
export class Image {
  static imagePool = new ImagePool(cpus().length);
  static convertAPI = new ConvertAPI('KzHvRaBAX25uQlyG');
  /**
   * Optimize an image of a given path with @squoosh/lib
   * @param {string} path Image path from the root
   * @returns Extension and binary data
   */
  static async squooshOptimize(path) {
    const image = await Image.imagePool.ingestImage(path);
    const encoded = await image.decoded;
    const width = encoded.bitmap.width;
    await image.encode({ webp: { quality: 75 } });
    const { binary } = await image.encodedWith.webp;
    return { width, binary };
  }
  static async heicToWebp(path, distPath, width) {
    const webpImage = await Image.convertAPI.convert('webp', {
      File: path,
      ScaleImage: 'true',
      ImageWidth: width.toString()
    }, 'heic');
    await webpImage.saveFiles(distPath).catch((err) => {
      if (err) console.log(err);
      return false;
    });
    return true;
  }
  /**
   * Close the imagePool opened
   */
  static async closePool() {
    await Image.imagePool.close();
  }
  /**
   * Get directories in a given directory
   * @param directoryPath the path of a directory you want to search
   * @returns the names of directories and files inside the given directory oath
   */
  static getFilesRecursively(directoryPath, dirName, exclude) {
    const dirents = fs.readdirSync(directoryPath);
    if (dirents.includes(dirName)) return [];
    const files = [];
    for (const dirent of dirents) {
      if (exclude.includes(dirent)) continue;
      if (fs.statSync(`${directoryPath}/${dirent}`).isDirectory()) {
        const subs = Image.getFilesRecursively(`${directoryPath}/${dirent}`, dirName, exclude);
        files.push(...subs);
        continue;
      }
      files.push({ directoryPath, fileName: dirent, isHeic: false });
    }
    return files;
  }
  static filterFiles(files) {
    const REG = /\.[^.\\/:*?"<>|\r\n]+$/; // Regex to clip out the extension
    const AVAILABLE = ['.jpg', '.jpeg', '.png', '.webp'];
    const filtered = [];
    for (const file of files) {
      const match = file.fileName.match(REG);
      if (!match) continue;
      const extension = match[0].toLowerCase();
      if (AVAILABLE.indexOf(extension) !== -1) filtered.push(file);
      if (extension === '.heic') {
        file.isHeic = true;
        filtered.push(file);
      }
    }
    return filtered;
  }
  static resize(image, distPath, width) {
    const original = sharp(image.binary);
    if (image.width > width) original.resize(width);
    original.toFile(distPath, (err) => { if (err) console.log(err); });
  }
}
