import dotenv from "dotenv-flow";
import mongoose from "mongoose";
import axios from "axios";
import colorConvert from "color-convert";
import zlib from "zlib";
import { parse } from "csv-parse/sync";

import getProgressBar from "./utils/getProgressBar";
import ThemeModel, { Theme } from "../models/Theme";
import ColorModel, { Color } from "../models/Color";
import PartCategoryModel, { PartCategory } from "../models/PartCategory";
import PartModel, { Part } from "../models/Part";
import PartRelationshipModel, { PartRelationship } from "../models/PartRelationship";
import SetModel, { Set } from "../models/Set";
import ElementModel, { Element } from "../models/Element";

dotenv.config();

const BASE_URL = "https://cdn.rebrickable.com/media/downloads";

interface SyncResult {
  name: string;
  count: number;
}

type SyncFunction = () => Promise<SyncResult>;

const fetchData = async (filename: string) => {
  const url = `${BASE_URL}/${filename}.csv.gz`;
  const response = await axios.get(url, { responseType: "arraybuffer" });
  const unzipped = await new Promise<Buffer>((resolve, reject) => {
    zlib.unzip(response.data, (err, buffer) => {
      if (err) reject(err);
      else resolve(buffer);
    });
  });

  const array = parse(unzipped.toString(), {
    columns: true,
    skip_empty_lines: true,
  });

  return array;
};

const resetDatabase = async () => {
  await ThemeModel.deleteMany({});
  await ColorModel.deleteMany({});
  await PartCategoryModel.deleteMany({});
  await PartModel.deleteMany({});
  await PartRelationshipModel.deleteMany({});
  await SetModel.deleteMany({});
  await ElementModel.deleteMany({});
};

const syncThemes: SyncFunction = async () => {
  const inserts = new Map<number, Theme>();
  const themes = await fetchData("themes");
  let current = 0;

  for (const theme of themes) {
    const newTheme = new ThemeModel({
      _id: theme.id,
      name: theme.name,
      parent: theme.parent_id,
    });

    inserts.set(newTheme._id, newTheme);
    console.log("Themes: ", getProgressBar(themes.length, ++current));
  }

  const values = Array.from(inserts.values());
  await ThemeModel.insertMany(values);

  return {
    name: "Themes",
    count: values.length,
  };
};

const syncColors: SyncFunction = async () => {
  const inserts = new Map<number, Color>();
  const colors = await fetchData("colors");
  let current = 0;

  for (const color of colors) {
    const hex = `#${color.rgb}`;

    const newColor = new ColorModel({
      _id: color.id,
      name: color.name,
      hex,
      rgb: `rgb(${colorConvert.hex.rgb(hex).join(", ")})`,
      hsl: `hsl(${colorConvert.hex.hsl(hex).join(", ")})`,
      isTranslucent: color.is_trans === "t",
    });

    inserts.set(newColor._id, newColor);
    console.log("Colors: ", getProgressBar(colors.length, ++current));
  }

  const values = Array.from(inserts.values());
  await ColorModel.insertMany(values);

  return {
    name: "Colors",
    count: values.length,
  };
};

const syncPartCategories: SyncFunction = async () => {
  const inserts = new Map<number, PartCategory>();
  const partCategories = await fetchData("part_categories");
  let current = 0;

  for (const partCategory of partCategories) {
    const newPartCategory = new PartCategoryModel({
      _id: partCategory.id,
      name: partCategory.name,
    });

    inserts.set(newPartCategory._id, newPartCategory);
    console.log("Part Categories: ", getProgressBar(partCategories.length, ++current));
  }

  const values = Array.from(inserts.values());
  await PartCategoryModel.insertMany(values);

  return {
    name: "Part Categories",
    count: values.length,
  };
};

const syncParts: SyncFunction = async () => {
  const inserts = new Map<string, Part>();
  const parts = await fetchData("parts");
  let current = 0;

  for (const part of parts) {
    const newPart = new PartModel({
      _id: part.part_num,
      name: part.name,
      category: part.part_cat_id,
      material: part.part_material,
    });

    inserts.set(newPart._id, newPart);
    console.log("Parts: ", getProgressBar(parts.length, ++current));
  }

  const values = Array.from(inserts.values());
  await PartModel.insertMany(values);

  return {
    name: "Parts",
    count: values.length,
  };
};

const syncPartRelationships: SyncFunction = async () => {
  const inserts = new Map<string, PartRelationship>();
  const partRelationships = await fetchData("part_relationships");
  let current = 0;

  for (const partRelationship of partRelationships) {
    const newPartRelationship = new PartRelationshipModel({
      relationshipType: partRelationship.rel_type,
      child: partRelationship.child_part_num,
      parent: partRelationship.parent_part_num,
    });

    inserts.set(newPartRelationship._id, newPartRelationship);
    console.log("Part Relationships: ", getProgressBar(partRelationships.length, ++current));
  }

  const values = Array.from(inserts.values());
  await PartRelationshipModel.insertMany(values);

  return {
    name: "Part Relationships",
    count: values.length,
  };
};

const syncSets: SyncFunction = async () => {
  const inserts = new Map<string, Set>();
  const sets = await fetchData("sets");
  let current = 0;

  for (const set of sets) {
    const newSet = new SetModel({
      _id: set.set_num,
      name: set.name,
      year: set.year,
      theme: set.theme_id,
      partCount: set.num_parts,
    });

    inserts.set(newSet._id, newSet);
    console.log("Sets: ", getProgressBar(sets.length, ++current));
  }

  const values = Array.from(inserts.values());
  await SetModel.insertMany(values);

  return {
    name: "Sets",
    count: values.length,
  };
};

const syncElements: SyncFunction = async () => {
  const inserts = new Map<string, Element>();
  const elements = await fetchData("elements");
  let current = 0;

  for (const element of elements) {
    const newElement = new ElementModel({
      _id: element.element_id,
      part: element.part_num,
      color: element.color_id,
    });

    inserts.set(newElement._id, newElement);
    console.log("Elements: ", getProgressBar(elements.length, ++current));
  }

  const values = Array.from(inserts.values());
  await ElementModel.insertMany(values);

  return {
    name: "Elements",
    count: values.length,
  };
};

const main = async () => {
  console.log("Starting sync...");
  await mongoose.connect(process.env.MONGODB_URI!);

  await resetDatabase();

  const syncFunctions = [syncThemes, syncColors, syncPartCategories, syncParts, syncPartRelationships, syncSets, syncElements];

  const results = await Promise.all(
    syncFunctions.map(async (syncFunction) => {
      const start = Date.now();
      const result = await syncFunction();
      const end = Date.now();

      return {
        ...result,
        time: end - start,
      };
    })
  );

  console.log("Sync complete!");
  console.log("Results:");
  results.forEach((result) => console.log(`- ${result.name}: ${result.count} records in ${result.time}ms`));
};

main();
