import { cn } from '@/lib/utils';
import * as React from 'react';
import Select, { ActionMeta, MultiValue, SingleValue } from 'react-select';

export interface SelectOption {
    label: string;
    value: string;
}

export interface SelectInputProps {
    className?: string;
    onChange: (newValue: SingleValue<SelectOption> | null, actionMeta: ActionMeta<SelectOption>) => void;
    options: SelectOption[];
    placeholder: string;
    isClearable?: boolean;
    isSearchable?: boolean;
    name: string;
}

export interface MultiSelectInputProps {
    className?: string;
    onChange: (newValue: MultiValue<SelectOption> | null, actionMeta: ActionMeta<SelectOption>) => void;
    options: SelectOption[];
    placeholder: string;
    isClearable?: boolean;
    isSearchable?: boolean;
    name: string;
}

const MultiSelectInput = React.forwardRef<HTMLSelectElement, MultiSelectInputProps>(
    ({ className, options, ...props }, ref) => {
        return (
            <Select
                instanceId={"id"}
                className={cn("w-full", className)}
                classNamePrefix="select"
                styles={{
                    control: (baseStyles, state) => ({
                        ...baseStyles,
                        borderColor: "#e5e7eb"
                    })
                }}
                isMulti
                theme={(theme) => ({
                    ...theme,
                    colors: {
                        ...theme.colors,
                        primary: 'black',
                        primary25: 'gray',
                        primary50: 'gray',
                        primary75: 'gray'
                    }
                })}
                options={options}
                {...props}
            />
        );
    }
);
MultiSelectInput.displayName = "MultiSelectInput";

const SelectInput = React.forwardRef<HTMLSelectElement, SelectInputProps>(
    ({ className, options, ...props }, ref) => {
        return (
            <Select
                instanceId={"id"}
                className={cn("w-full", className)}
                classNamePrefix="select"
                styles={{
                    control: (baseStyles, state) => ({
                        ...baseStyles,
                        borderColor: "#e5e7eb"
                    })
                }}
                theme={(theme) => ({
                    ...theme,
                    colors: {
                        ...theme.colors,
                        primary: 'black',
                        primary25: 'gray',
                        primary50: 'gray',
                        primary75: 'gray'
                    }
                })}
                options={options}
                {...props}
            />
        );
    }
);
SelectInput.displayName = "SelectInput";

export { SelectInput, MultiSelectInput };