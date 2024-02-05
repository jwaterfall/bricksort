import mongoose from 'mongoose';
import dotenv from 'dotenv';
import axios from 'axios';
import zlib from 'zlib';
import chalk from 'chalk';
import colorConvert from 'color-convert';
import { parse } from 'csv-parse/sync';

import { type Theme, ThemeModel } from '../services/theme/model.js';
import { type Color, ColorModel } from '../services/color/model.js';
import { type PartCategory, PartCategoryModel } from '../services/part-category/model.js';
import { type Part, PartModel } from '../services/part/model.js';
import {
	type PartRelationship,
	PartRelationshipModel
} from '../services/part-relationship/model.js';
import { type Set, SetModel } from '../services/set/model.js';
import { type Element, ElementModel } from '../services/element/model.js';
import { type Minifig, MinifigModel } from '../services/minifig/model.js';
import { type Inventory, InventoryModel } from '../services/inventory/model.js';
import { type InventoryPart, InventoryPartModel } from '../services/inventory-part/model.js';
import { type InventorySet, InventorySetModel } from '../services/inventory-set/model.js';
import {
	type InventoryMinifig,
	InventoryMinifigModel
} from '../services/inventory-minifig/model.js';

dotenv.config();

const PROGRESS_BAR_LENGTH = 50;

const getProgressBar = (total: number, current: number) => {
	const percentComplete = Math.round((current / total) * 100);
	const bars = Math.round((percentComplete / 100) * PROGRESS_BAR_LENGTH);
	return `${chalk.green('='.repeat(bars))}${' '.repeat(PROGRESS_BAR_LENGTH - bars)} ${percentComplete}% (${current}/${total})`;
};

const BASE_URL = 'https://cdn.rebrickable.com/media/downloads';

interface SyncResult {
	name: string;
	count: number;
}

type SyncFunction = () => Promise<SyncResult>;

const cache = new Map<string, DataItem[]>();

interface DataItem {
	[key: string]: string;
}

const fetchData = async (filename: string) => {
	if (cache.has(filename)) return cache.get(filename) as DataItem[];

	const url = `${BASE_URL}/${filename}.csv.gz`;
	const response = await axios.get(url, { responseType: 'arraybuffer' });
	const unzipped = await new Promise<Buffer>((resolve, reject) => {
		zlib.unzip(response.data, (err, buffer) => {
			if (err) reject(err);
			else resolve(buffer);
		});
	});

	const array: DataItem[] = parse(unzipped.toString(), {
		columns: true,
		skip_empty_lines: true
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

	themes.forEach((theme, index) => {
		const newTheme = new ThemeModel({
			_id: theme.id,
			name: theme.name,
			parentId: theme.parent_id.length ? theme.parent_id : null
		});

		inserts.set(newTheme._id, newTheme);

		if (index % 100 === 0) {
			console.log('Themes: ', getProgressBar(themes.length, index));
		}
	});

	const values = Array.from(inserts.values());
	await ThemeModel.insertMany(values);

	return {
		name: 'Themes',
		count: values.length
	};
};

const syncColors: SyncFunction = async () => {
	const inserts = new Map<string, Color>();
	const colors = await fetchData('colors');

	colors.forEach((color, index) => {
		const hex = `#${color.rgb}`;

		const newColor = new ColorModel({
			_id: color.id,
			name: color.name,
			hex,
			rgb: `rgb(${colorConvert.hex.rgb(hex).join(', ')})`,
			hsl: `hsl(${colorConvert.hex.hsl(hex).join(', ')})`,
			isTranslucent: color.is_trans === 't'
		});

		inserts.set(newColor._id, newColor);

		if (index % 100 === 0) {
			console.log('Colors: ', getProgressBar(colors.length, index));
		}
	});

	const values = Array.from(inserts.values());
	await ColorModel.insertMany(values);

	return {
		name: 'Colors',
		count: values.length
	};
};

const syncPartCategories: SyncFunction = async () => {
	const inserts = new Map<string, PartCategory>();
	const partCategories = await fetchData('part_categories');

	partCategories.forEach((partCategory, index) => {
		const newPartCategory = new PartCategoryModel({
			_id: partCategory.id,
			name: partCategory.name
		});

		inserts.set(newPartCategory._id, newPartCategory);

		if (index % 100 === 0) {
			console.log('Part Categories: ', getProgressBar(partCategories.length, index));
		}
	});

	const values = Array.from(inserts.values());
	await PartCategoryModel.insertMany(values);

	return {
		name: 'Part Categories',
		count: values.length
	};
};

const syncParts: SyncFunction = async () => {
	const inserts = new Map<string, Part>();
	const parts = await fetchData('parts');

	parts.forEach((part, index) => {
		const newPart = new PartModel({
			_id: part.part_num,
			name: part.name,
			categoryId: part.part_cat_id,
			material: part.part_material
		});

		inserts.set(newPart._id, newPart);

		if (index % 100 === 0) {
			console.log('Parts: ', getProgressBar(parts.length, index));
		}
	});

	const values = Array.from(inserts.values());
	await PartModel.insertMany(values);

	return {
		name: 'Parts',
		count: values.length
	};
};

const syncPartRelationships: SyncFunction = async () => {
	const inserts = new Map<string, PartRelationship>();
	const partRelationships = await fetchData('part_relationships');

	partRelationships.forEach((partRelationship, index) => {
		const newPartRelationship = new PartRelationshipModel({
			_id: [
				partRelationship.parent_part_num,
				partRelationship.child_part_num,
				partRelationship.rel_type
			].join('-'),
			relationshipType: partRelationship.rel_type,
			childId: partRelationship.child_part_num,
			parentId: partRelationship.parent_part_num
		});

		inserts.set(newPartRelationship._id, newPartRelationship);

		if (index % 100 === 0) {
			console.log('Part Relationships: ', getProgressBar(partRelationships.length, index));
		}
	});

	const values = Array.from(inserts.values());
	await PartRelationshipModel.insertMany(values);

	return {
		name: 'Part Relationships',
		count: values.length
	};
};

const syncSets: SyncFunction = async () => {
	const inserts = new Map<string, Set>();
	const sets = await fetchData('sets');

	sets.forEach((set, index) => {
		const newSet = new SetModel({
			_id: set.set_num,
			name: set.name,
			year: set.year,
			themeId: set.theme_id,
			partCount: set.num_parts,
			imageUrl: set.img_url
		});

		inserts.set(newSet._id, newSet);

		if (index % 100 === 0) {
			console.log('Sets: ', getProgressBar(sets.length, index));
		}
	});

	const values = Array.from(inserts.values());
	await SetModel.insertMany(values);

	return {
		name: 'Sets',
		count: values.length
	};
};

const syncElements: SyncFunction = async () => {
	const inserts = new Map<string, Element>();
	const inventoryParts = await fetchData('inventory_parts');

	inventoryParts.forEach((inventoryPart, index) => {
		const id = `${inventoryPart.part_num}-${inventoryPart.color_id}`;

		const newElement = new ElementModel({
			_id: id,
			partId: inventoryPart.part_num,
			colorId: inventoryPart.color_id
		});

		if (inventoryPart.img_url) {
			newElement.imageUrl = inventoryPart.img_url;
		}

		inserts.set(id, newElement);

		if (index % 1000 === 0) {
			console.log('Elements: ', getProgressBar(inventoryParts.length, index));
		}
	});

	const values = Array.from(inserts.values());
	await ElementModel.insertMany(values);

	return {
		name: 'Elements',
		count: values.length
	};
};

const syncMinifigs: SyncFunction = async () => {
	const inserts = new Map<string, Minifig>();
	const minifigs = await fetchData('minifigs');

	minifigs.forEach((minifig, index) => {
		const newMinifig = new MinifigModel({
			_id: minifig.fig_num,
			name: minifig.name,
			partCount: minifig.num_parts,
			imageUrl: minifig.img_url
		});

		inserts.set(newMinifig._id, newMinifig);

		if (index % 100 === 0) {
			console.log('Minifigs: ', getProgressBar(minifigs.length, index));
		}
	});

	const values = Array.from(inserts.values());
	await MinifigModel.insertMany(values);

	return {
		name: 'Minifigs',
		count: values.length
	};
};

const syncInventories: SyncFunction = async () => {
	const inserts = new Map<string, Inventory>();
	const inventories = await fetchData('inventories');

	inventories.forEach((inventory, index) => {
		const newInventory = new InventoryModel({
			_id: inventory.id,
			setId: inventory.set_num,
			version: inventory.version
		});

		inserts.set(newInventory._id, newInventory);

		if (index % 100 === 0) {
			console.log('Inventories: ', getProgressBar(inventories.length, index));
		}
	});

	const values = Array.from(inserts.values());
	await InventoryModel.insertMany(values);

	return {
		name: 'Inventories',
		count: values.length
	};
};

const syncInventoryParts: SyncFunction = async () => {
	const inserts = new Map<string, InventoryPart>();
	const inventoryParts = await fetchData('inventory_parts');

	inventoryParts.forEach((inventoryPart, index) => {
		const elementId = [inventoryPart.part_num, inventoryPart.color_id].join('-');

		const newInventoryPart = new InventoryPartModel({
			_id: [inventoryPart.inventory_id, inventoryPart.is_spare, elementId].join('-'),
			inventoryId: inventoryPart.inventory_id,
			elementId,
			quantity: inventoryPart.quantity,
			isSpare: inventoryPart.is_spare === 't'
		});

		inserts.set(newInventoryPart._id, newInventoryPart);

		if (index % 1000 === 0) {
			console.log('Inventory Parts: ', getProgressBar(inventoryParts.length, index));
		}
	});

	const values = Array.from(inserts.values());
	await InventoryPartModel.insertMany(values);

	return {
		name: 'Inventory Parts',
		count: values.length
	};
};

const syncInventorySets: SyncFunction = async () => {
	const inserts = new Map<string, InventorySet>();
	const inventorySets = await fetchData('inventory_sets');

	inventorySets.forEach((inventorySet, index) => {
		const newInventorySet = new InventorySetModel({
			_id: [inventorySet.inventory_id, inventorySet.set_num].join('-'),
			inventoryId: inventorySet.inventory_id,
			setId: inventorySet.set_num,
			quantity: inventorySet.quantity
		});

		inserts.set(newInventorySet._id, newInventorySet);

		if (index % 100 === 0) {
			console.log('Inventory Sets: ', getProgressBar(inventorySets.length, index));
		}
	});

	const values = Array.from(inserts.values());
	await InventorySetModel.insertMany(values);

	return {
		name: 'Inventory Sets',
		count: values.length
	};
};

const syncInventoryMinifigs: SyncFunction = async () => {
	const inserts = new Map<string, InventoryMinifig>();
	const inventoryMinifigs = await fetchData('inventory_minifigs');

	inventoryMinifigs.forEach((inventoryMinifig, index) => {
		const newInventoryMinifig = new InventoryMinifigModel({
			_id: [inventoryMinifig.inventory_id, inventoryMinifig.fig_num].join('-'),
			inventoryId: inventoryMinifig.inventory_id,
			minifigId: inventoryMinifig.fig_num,
			quantity: inventoryMinifig.quantity
		});

		inserts.set(newInventoryMinifig._id, newInventoryMinifig);

		if (index % 100 === 0) {
			console.log('Inventory Minifigs: ', getProgressBar(inventoryMinifigs.length, index));
		}
	});

	const values = Array.from(inserts.values());
	await InventoryMinifigModel.insertMany(values);

	return {
		name: 'Inventory Minifigs',
		count: values.length
	};
};

const main = async () => {
	console.log('Starting sync...');

	await mongoose.connect(process.env.MONGODB_URI!);
	console.log('Connected to MongoDB');

	await resetDatabase();
	console.log('Database reset');

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
		syncInventoryMinifigs
	];

	for (const syncFunction of syncFunctions) {
		const start = Date.now();

		try {
			const result = await syncFunction();

			const end = Date.now();
			console.log(`- ${result.name}: ${result.count} records in ${end - start}ms`);
		} catch (error) {
			console.log('Error syncing:', error);
		}
	}

	console.log('Sync complete!');
};

main();
