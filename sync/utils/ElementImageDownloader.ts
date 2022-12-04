import axios from "axios";

import getProgressBar from "./getProgressBar";
import AbstractImageDownloader, { Images } from "./AbstractImageDownloader";

class ElementImageDownloader extends AbstractImageDownloader {
  protected readonly type = "elements";
  protected readonly folder = "public/images/elements";

  protected total = 0;
  protected successful = 0;
  protected failed = 0;

  constructor(
    protected readonly keys: string[],
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

  protected async startDataWorker(key: string, setIds: string[], images: Images) {
    while (setIds.length) {
      const setId = setIds.pop();
      if (!setId) break;

      const start = new Date();
      const response = await axios.get(`${process.env.REBRICKABLE_API_URL}/sets/${setId}/parts/?key=${key}&page_size=${this.pageSize}`);
      const data = response.data;

      for (const item of data.results) {
        const id = item.element_id;
        const imageUrl = item.part.part_img_url;
        if (!id || !imageUrl) continue;

        images.set(id, imageUrl);
      }

      console.log(`Getting ${this.type}`, getProgressBar(this.total, this.successful++, this.failed));
      await this.wait(start);
    }

    return images;
  }

  public async download(setIds: string[]) {
    this.total = setIds.length;
    this.successful = 0;
    this.failed = 0;

    const images: Images = new Map();
    await Promise.all(this.keys.map((key) => this.startDataWorker(key, setIds, images)));

    await this.downloadImages(images);

    return Array.from(images.keys());
  }
}

export default ElementImageDownloader;
