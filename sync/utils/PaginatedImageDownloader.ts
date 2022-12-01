import axios from "axios";

import getProgressBar from "./getProgressBar";
import AbstractImageDownloader, { Images } from "./AbstractImageDownloader";

class PaginatedImageDownloader extends AbstractImageDownloader {
  protected total = 0;
  protected successful = 0;
  protected failed = 0;

  constructor(
    protected readonly keys: string[],
    protected readonly type: string,
    protected readonly folder: string,
    protected readonly idFieldName: string,
    protected readonly imageFieldName: string,
    protected readonly timeout = 1050,
    protected readonly pageSize = 1000,
    protected readonly dataWorkers = 4,
    protected readonly imageWorkers = 25
  ) {
    super(imageWorkers);
  }

  protected wait(start: Date) {
    return new Promise((resolve) => setTimeout(resolve, this.timeout - (Date.now() - start.getTime())));
  }

  protected async startDataWorker(key: string, pages: number[], images: Images) {
    while (pages.length) {
      const page = pages.pop();
      if (!page) break;

      const start = new Date();
      const response = await axios.get(`${process.env.REBRICKABLE_API_URL}/${this.type}/?key=${key}&page=${page}&page_size=${this.pageSize}`);
      const data = response.data;

      for (const item of data.results) {
        const id = item[this.idFieldName];
        const imageUrl = item[this.imageFieldName];
        if (!id || !imageUrl) continue;

        images.set(id, imageUrl);
      }

      this.successful += data.results.length;
      console.log(`Getting ${this.type}`, getProgressBar(this.total, this.successful, this.failed));
      await this.wait(start);
    }

    return images;
  }

  public async download() {
    const response = await axios.get(`${process.env.REBRICKABLE_API_URL}/${this.type}/?key=${this.keys[0]}`);
    const pageCount = Math.ceil(response.data.count / this.pageSize);
    const pages = Array.from({ length: pageCount }, (_, i) => i + 1);

    this.total = response.data.count;
    this.successful = 0;
    this.failed = 0;

    const images: Images = new Map();
    await Promise.all(this.keys.map((key) => this.startDataWorker(key, pages, images)));

    await this.downloadImages(images);

    return Array.from(images.keys());
  }
}

export default PaginatedImageDownloader;
