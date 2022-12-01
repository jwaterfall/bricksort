import axios from "axios";
import fs from "fs";

import getProgressBar from "./getProgressBar";

export type Images = Map<string, string>;

abstract class AbstractImageDownloader {
  protected abstract readonly type: string;
  protected abstract readonly folder: string;

  protected readonly extension = "jpg";
  protected totalImages = 0;
  protected successfulImages = 0;
  protected failedImages = 0;

  constructor(protected readonly imageWorkers = 100) {}

  public abstract download(...args: any[]): Promise<string[] | void>;

  protected async downloadImages(images: Images) {
    this.totalImages = images.size;
    this.successfulImages = 0;
    this.failedImages = 0;

    const imageQueue = Array.from(images);

    await Promise.all(
      Array.from({ length: this.imageWorkers }).map(async () => {
        while (imageQueue.length) {
          const image = imageQueue.pop();
          if (!image) break;

          const [filename, url] = image;
          await this.downloadImage(filename, url);
        }
      })
    );
  }

  protected async downloadImage(filename: string, url: string) {
    const path = `${this.folder}/${filename}.${this.extension}`;

    try {
      const response = await axios.get(url, { responseType: "arraybuffer" });
      const buffer = Buffer.from(response.data, "binary");
      await fs.promises.writeFile(path, buffer);
      this.successfulImages++;
    } catch (error) {
      console.log("Error downloading image: ", url);
      this.failedImages++;
    }

    console.log(`Downloading ${this.type} images: `, getProgressBar(this.totalImages, this.successfulImages + this.failedImages));
  }
}

export default AbstractImageDownloader;
