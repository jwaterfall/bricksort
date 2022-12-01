import dotenv from "dotenv-flow";

import PaginatedImageDownloader from "./utils/PaginatedImageDownloader";
import ElementImageDownloader from "./utils/ElementImageDownloader";

dotenv.config();

const KEYS = [process.env.REBRICKABLE_API_KEY_1, process.env.REBRICKABLE_API_KEY_2, process.env.REBRICKABLE_API_KEY_3] as string[];

const main = async () => {
  const setImageDownloader = new PaginatedImageDownloader(KEYS, "sets", "public/images/sets", "set_num", "set_img_url");
  const setsIds = await setImageDownloader.download();

  const partImageDownloader = new PaginatedImageDownloader(KEYS, "parts", "public/images/parts", "part_num", "part_img_url");
  await partImageDownloader.download();

  const elementImageDownloader = new ElementImageDownloader(KEYS);
  await elementImageDownloader.download(setsIds);
};

main();
