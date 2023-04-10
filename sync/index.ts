import dotenv from 'dotenv-flow';
import mongoose from 'mongoose';
import axios from 'axios';
import colorConvert from 'color-convert';
import zlib from 'zlib';
import { parse } from 'csv-parse/sync';

import getProgressBar from './utils/getProgressBar';
import ThemeModel, { Theme } from '../models/Theme';
import ColorModel, { Color } from '../models/Color';
import PartCategoryModel, { PartCategory } from '../models/PartCategory';
import PartModel, { Part } from '../models/Part';
import PartRelationshipModel, { PartRelationship } from '../models/PartRelationship';
import SetModel, { Set } from '../models/Set';
import ElementModel, { Element } from '../models/Element';
import MinifigModel, { Minifig } from '../models/Minifig';
import InventoryModel, { Inventory } from '../models/Inventory';
import InventoryPartModel, { InventoryPart } from '../models/InventoryPart';
import InventorySetModel, { InventorySet } from '../models/InventorySet';
import InventoryMinifigModel, { InventoryMinifig } from '../models/InventoryMinifig';

dotenv.config();

const BASE_URL = 'https://cdn.rebrickable.com/media/downloads';

interface SyncResult {
    name: string;
    count: number;
}

type SyncFunction = () => Promise<SyncResult>;

const cache = new Map<string, any[]>();

const fetchData = async (filename: string) => {
    if (cache.has(filename)) return cache.get(filename);

    const url = `${BASE_URL}/${filename}.csv.gz`;
    const response = await axios.get(url, { responseType: 'arraybuffer' });
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

    cache.set(filename, array);
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
    await MinifigModel.deleteMany({});
    await InventoryModel.deleteMany({});
    await InventoryPartModel.deleteMany({});
    await InventorySetModel.deleteMany({});
    await InventoryMinifigModel.deleteMany({});
};

const syncThemes: SyncFunction = async () => {
    const inserts = new Map<string, Theme>();
    const themes = await fetchData('themes');
    const sets = await fetchData('sets');

    let successful = 0;

    for (const theme of themes) {
        const setCount = sets.filter((set: any) => set.theme_id === theme.id).length;

        const newTheme = new ThemeModel({
            _id: theme.id,
            name: theme.name,
            parent: theme.parent_id,
            setCount,
        });

        inserts.set(newTheme._id, newTheme);
        console.log('Themes: ', getProgressBar(themes.length, ++successful));
    }

    const values = Array.from(inserts.values());
    await ThemeModel.insertMany(values);

    return {
        name: 'Themes',
        count: values.length,
    };
};

const syncColors: SyncFunction = async () => {
    const inserts = new Map<string, Color>();
    const colors = await fetchData('colors');
    let successful = 0;

    for (const color of colors) {
        const hex = `#${color.rgb}`;

        const newColor = new ColorModel({
            _id: color.id,
            name: color.name,
            hex,
            rgb: `rgb(${colorConvert.hex.rgb(hex).join(', ')})`,
            hsl: `hsl(${colorConvert.hex.hsl(hex).join(', ')})`,
            isTranslucent: color.is_trans === 't',
        });

        inserts.set(newColor._id, newColor);
        console.log('Colors: ', getProgressBar(colors.length, ++successful));
    }

    const values = Array.from(inserts.values());
    await ColorModel.insertMany(values);

    return {
        name: 'Colors',
        count: values.length,
    };
};

const syncPartCategories: SyncFunction = async () => {
    const inserts = new Map<string, PartCategory>();
    const partCategories = await fetchData('part_categories');
    let successful = 0;

    for (const partCategory of partCategories) {
        const newPartCategory = new PartCategoryModel({
            _id: partCategory.id,
            name: partCategory.name,
        });

        inserts.set(newPartCategory._id, newPartCategory);
        console.log('Part Categories: ', getProgressBar(partCategories.length, ++successful));
    }

    const values = Array.from(inserts.values());
    await PartCategoryModel.insertMany(values);

    return {
        name: 'Part Categories',
        count: values.length,
    };
};

const syncParts: SyncFunction = async () => {
    const inserts = new Map<string, Part>();
    const parts = await fetchData('parts');
    let successful = 0;

    for (const part of parts) {
        const newPart = new PartModel({
            _id: part.part_num,
            name: part.name,
            category: part.part_cat_id,
            material: part.part_material,
        });

        inserts.set(newPart._id, newPart);
        console.log('Parts: ', getProgressBar(parts.length, ++successful));
    }

    const values = Array.from(inserts.values());
    await PartModel.insertMany(values);

    return {
        name: 'Parts',
        count: values.length,
    };
};

const syncPartRelationships: SyncFunction = async () => {
    const inserts = new Map<string, PartRelationship>();
    const partRelationships = await fetchData('part_relationships');
    let successful = 0;

    for (const partRelationship of partRelationships) {
        const newPartRelationship = new PartRelationshipModel({
            _id: partRelationship.parent_part_num + partRelationship.child_part_num + partRelationship.rel_type,
            relationshipType: partRelationship.rel_type,
            child: partRelationship.child_part_num,
            parent: partRelationship.parent_part_num,
        });

        inserts.set(newPartRelationship._id, newPartRelationship);
        console.log('Part Relationships: ', getProgressBar(partRelationships.length, ++successful));
    }

    const values = Array.from(inserts.values());
    await PartRelationshipModel.insertMany(values);

    return {
        name: 'Part Relationships',
        count: values.length,
    };
};

const syncSets: SyncFunction = async () => {
    const inserts = new Map<string, Set>();
    const sets = await fetchData('sets');
    let successful = 0;

    for (const set of sets) {
        const newSet = new SetModel({
            _id: set.set_num,
            name: set.name,
            year: set.year,
            theme: set.theme_id,
            partCount: set.num_parts,
            imageUrl: set.img_url,
        });

        inserts.set(newSet._id, newSet);
        console.log('Sets: ', getProgressBar(sets.length, ++successful));
    }

    const values = Array.from(inserts.values());
    await SetModel.insertMany(values);

    return {
        name: 'Sets',
        count: values.length,
    };
};

const syncElements: SyncFunction = async () => {
    const inserts = new Map<string, Element>();
    const elements = await fetchData('elements');
    let successful = 0;

    for (const element of elements) {
        const newElement = new ElementModel({
            _id: element.element_id,
            part: element.part_num,
            color: element.color_id,
        });

        inserts.set(newElement._id, newElement);
        console.log('Elements: ', getProgressBar(elements.length, ++successful));
    }

    const values = Array.from(inserts.values());
    await ElementModel.insertMany(values);

    return {
        name: 'Elements',
        count: values.length,
    };
};

const syncMinifigs: SyncFunction = async () => {
    const inserts = new Map<string, Minifig>();
    const minifigs = await fetchData('minifigs');
    let successful = 0;

    for (const minifig of minifigs) {
        const newMinifig = new MinifigModel({
            _id: minifig.fig_num,
            name: minifig.name,
            partCount: minifig.num_parts,
            imageUrl: minifig.img_url,
        });

        inserts.set(newMinifig._id, newMinifig);
        console.log('Minifigs: ', getProgressBar(minifigs.length, ++successful));
    }

    const values = Array.from(inserts.values());
    await MinifigModel.insertMany(values);

    return {
        name: 'Minifigs',
        count: values.length,
    };
};

const syncInventories: SyncFunction = async () => {
    const inserts = new Map<string, Inventory>();
    const inventories = await fetchData('inventories');
    let successful = 0;

    for (const inventory of inventories) {
        const newInventory = new InventoryModel({
            _id: inventory.id,
            set: inventory.set_num,
            version: inventory.version,
            quantity: inventory.quantity,
            isAlternate: inventory.is_alternate === 't',
            alternate: inventory.alternate,
            color: inventory.color_id,
        });

        inserts.set(newInventory._id, newInventory);
        console.log('Inventories: ', getProgressBar(inventories.length, ++successful));
    }

    const values = Array.from(inserts.values());
    await InventoryModel.insertMany(values);

    return {
        name: 'Inventories',
        count: values.length,
    };
};

const syncInventoryParts: SyncFunction = async () => {
    const inserts = new Map<string, InventoryPart>();
    const inventoryParts = await fetchData('inventory_parts');

    let successful = 0;

    for (const inventoryPart of inventoryParts) {
        const newInventoryPart = new InventoryPartModel({
            _id: inventoryPart.inventory_id + inventoryPart.part_num + inventoryPart.color_id,
            inventory: inventoryPart.inventory_id,
            part: inventoryPart.part_num,
            color: inventoryPart.color_id,
            quantity: inventoryPart.quantity,
            isSpare: inventoryPart.is_spare === 't',
        });

        const imageUrl = inventoryPart.img_url;
        if (imageUrl) newInventoryPart.imageUrl = imageUrl;

        inserts.set(newInventoryPart._id, newInventoryPart);
        console.log('Inventory Parts: ', getProgressBar(inventoryParts.length, ++successful));
    }

    const values = Array.from(inserts.values());
    await InventoryPartModel.insertMany(values);

    return {
        name: 'Inventory Parts',
        count: values.length,
    };
};

const syncInventorySets: SyncFunction = async () => {
    const inserts = new Map<string, InventorySet>();
    const inventorySets = await fetchData('inventory_sets');
    let successful = 0;

    for (const inventorySet of inventorySets) {
        const newInventorySet = new InventorySetModel({
            _id: inventorySet.inventory_id + inventorySet.set_num,
            inventory: inventorySet.inventory_id,
            set: inventorySet.set_num,
            quantity: inventorySet.quantity,
        });

        inserts.set(newInventorySet._id, newInventorySet);
        console.log('Inventory Sets: ', getProgressBar(inventorySets.length, ++successful));
    }

    const values = Array.from(inserts.values());
    await InventorySetModel.insertMany(values);

    return {
        name: 'Inventory Sets',
        count: values.length,
    };
};

const syncInventoryMinifigs: SyncFunction = async () => {
    const inserts = new Map<string, InventoryMinifig>();
    const inventoryMinifigs = await fetchData('inventory_minifigs');
    let successful = 0;

    for (const inventoryMinifig of inventoryMinifigs) {
        const newInventoryMinifig = new InventoryMinifigModel({
            _id: inventoryMinifig.inventory_id + inventoryMinifig.fig_num,
            inventory: inventoryMinifig.inventory_id,
            minifig: inventoryMinifig.fig_num,
            quantity: inventoryMinifig.quantity,
        });

        inserts.set(newInventoryMinifig._id, newInventoryMinifig);
        console.log('Inventory Minifigs: ', getProgressBar(inventoryMinifigs.length, ++successful));
    }

    const values = Array.from(inserts.values());
    await InventoryMinifigModel.insertMany(values);

    return {
        name: 'Inventory Minifigs',
        count: values.length,
    };
};

const main = async () => {
    console.log('Starting sync...');
    await mongoose.connect(process.env.MONGODB_URI!);

    await resetDatabase();

    const syncFunctions = [
        syncThemes,
        syncColors,
        syncPartCategories,
        syncParts,
        syncPartRelationships,
        syncSets,
        syncMinifigs,
        syncElements,
        syncInventories,
        syncInventoryParts,
        syncInventorySets,
        syncInventoryMinifigs,
    ];

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

    console.log('Sync complete!');
    console.log('Results:');
    results.forEach((result) => console.log(`- ${result.name}: ${result.count} records in ${result.time}ms`));
};

main();
