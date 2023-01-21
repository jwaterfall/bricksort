import { FC, ChangeEvent, useState, useEffect, use } from "react";
import { useSearchParams } from "next/navigation";

import useSetSearchParams from "../../hooks/useSetSearchParams";
import useDebounce from "../../hooks/useDebounce";
import Input, { InputProps } from "../Input";

interface FilterInputProps extends InputProps {
    searchParamName: string;
    type?: "text" | "number";
}

const FilterInput: FC<FilterInputProps> = ({ label, searchParamName, ...props }) => {
    const setSearchParams = useSetSearchParams();
    const searchParams = useSearchParams();
    const [value, setValue] = useState(searchParams.get(searchParamName) ?? undefined);
    const debouncedValue = useDebounce(value, 500);

    useEffect(() => {
        setSearchParams({ [searchParamName]: debouncedValue });
    }, [debouncedValue, searchParamName, setSearchParams]);

    useEffect(() => {
        setValue(searchParams.get(searchParamName) ?? undefined);
    }, [searchParams, searchParamName]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value || undefined;
        setValue(newValue);
    };

    return <Input label={label} value={value ?? ""} onChange={handleChange} {...props} />;
};

export default FilterInput;
