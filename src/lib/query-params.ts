import { goto } from '$app/navigation';
import { page } from '$app/stores';
import type { Writable } from 'svelte/store';

export enum QueryParamType {
	String = 'string',
	Number = 'number',
	Boolean = 'boolean',
	Array = 'array'
}

type QueryParamTypeMap = {
	[QueryParamType.String]: string;
	[QueryParamType.Number]: number;
	[QueryParamType.Boolean]: boolean;
	[QueryParamType.Array]: string[];
};

type QueryParamValue<T extends QueryParamType, D = null> = D extends null
	? QueryParamTypeMap[T] | null
	: QueryParamTypeMap[T];

export function createQueryParamStore<
	T extends QueryParamType,
	D extends QueryParamValue<T> | null = null
>(
	key: string,
	type: T = QueryParamType.String as T,
	defaultValue?: D
): Writable<QueryParamValue<T, D>> {
	let urlSearchParams: URLSearchParams;

	function getValue(urlSearchParams: URLSearchParams): QueryParamValue<T, D> {
		const value = urlSearchParams.getAll(key);
		switch (type) {
			case QueryParamType.Number:
				return (value.length ? Number(value[0]) : defaultValue) as QueryParamValue<T, D>;
			case QueryParamType.Boolean:
				return (value.length ? value[0] === 'true' : defaultValue) as QueryParamValue<T, D>;
			case QueryParamType.Array:
				return (value.length ? value : defaultValue) as QueryParamValue<T, D>;
			case QueryParamType.String:
			default:
				return (value.length ? value[0] : defaultValue) as QueryParamValue<T, D>;
		}
	}

	function setValue(value: QueryParamValue<T, D>) {
		urlSearchParams.delete(key);
		if (value !== null && value !== undefined && value !== '') {
			if (Array.isArray(value)) {
				value.forEach((v) => urlSearchParams.append(key, v));
			} else {
				urlSearchParams.set(key, value.toString());
			}
		}

		goto(`?${urlSearchParams.toString()}`, { keepFocus: true, noScroll: true });
	}

	return {
		subscribe: (handler) =>
			page.subscribe((value) => {
				urlSearchParams = new URLSearchParams(value.url.searchParams);
				handler(getValue(urlSearchParams));
			}),
		set: setValue,
		update: async (fn) => {
			const value = fn(getValue(urlSearchParams));
			setValue(value);
		}
	};
}
