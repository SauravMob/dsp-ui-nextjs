import { cn } from '@/lib/utils'
import clsx from 'clsx'
import * as React from 'react'
import Select, { ActionMeta, MultiValue, SingleValue } from 'react-select'
import AsyncSelect from 'react-select/async'

export interface SelectOption {
    label: string
    value: string
}

export interface SelectInputProps {
    className?: string
    onChange: (newValue: SingleValue<SelectOption> | null, actionMeta: ActionMeta<SelectOption>) => void
    options: SelectOption[]
    placeholder: string
    isClearable?: boolean
    isSearchable?: boolean
    name: string,
    value?: SelectOption,
    isDisabled?: boolean,
    id?: string
}

export interface MultiSelectInputProps {
    className?: string
    onChange: (newValue: MultiValue<SelectOption> | null, actionMeta: ActionMeta<SelectOption>) => void
    options: SelectOption[]
    placeholder: string
    isClearable?: boolean
    isSearchable?: boolean
    name: string,
    value?: SelectOption[],
    id?: string
}

export interface AutoCompleteInputProps {
    className?: string
    onChange: (newValue: SingleValue<SelectOption> | null, actionMeta: ActionMeta<SelectOption>) => void
    loadOptions?: (inputValue: string) => Promise<any>
    placeholder: string
    isClearable?: boolean
    isSearchable?: boolean
    name: string,
    value?: SelectOption
}

const MultiSelectInput = React.forwardRef<HTMLSelectElement, MultiSelectInputProps>(
    ({ className, options, value, id, ...props }, ref) => {
        return (
            <Select
                unstyled
                instanceId={`react-select-id-input ${id}`}
                className={cn("w-full", className)}
                value={value}
                classNamePrefix="select"
                classNames={{
                    control: ({ isFocused }) => cn(isFocused ? "outline-none ring-2 ring-slate-950 ring-offset-2 dark:focus-visible:ring-slate-300" : "", "w-full ring-offset-white disabled:cursor-not-allowed disabled:opacity-50 rounded-md border border-slate-200 px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950"),
                    placeholder: () => "placeholder:text-slate-500 dark:placeholder:text-slate-400",
                    menu: () => "p-50 mt-2 border border-slate-400 bg-white dark:bg-slate-900 rounded-lg",
                    multiValue: () => "bg-slate-200 dark:bg-slate-700 rounded items-center p-0.5 pl-2 m-0.5 gap-1.5",
                    option: ({ isFocused }) => clsx(isFocused && "bg-slate-200 dark:bg-slate-700 active:bg-slate-400", "hover:cursor-pointer px-3 py-2 rounded")
                }}
                isMulti
                options={options}
                {...props}
            />
        )
    }
)
MultiSelectInput.displayName = "MultiSelectInput"

const SelectInput = React.forwardRef<HTMLSelectElement, SelectInputProps>(
    ({ className, options, value, isDisabled, id, ...props }, ref) => {
        return (
            <Select
                unstyled
                instanceId={`react-select-id-input ${id}`}
                id={id}
                className={cn("w-full", className)}
                value={value}
                classNames={{
                    control: ({ isFocused }) => cn(isFocused ? "outline-none ring-2 ring-slate-950 ring-offset-2 dark:focus-visible:ring-slate-300" : "", "w-full ring-offset-white disabled:cursor-not-allowed disabled:opacity-50 rounded-md border border-slate-200 px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950"),
                    placeholder: () => "placeholder:text-slate-500 dark:placeholder:text-slate-400",
                    menu: () => "p-50 mt-2 border border-slate-400 bg-white dark:bg-slate-900 rounded-lg",
                    option: ({ isFocused }) => clsx(isFocused && "bg-slate-200 dark:bg-slate-700 active:bg-slate-400", "hover:cursor-pointer px-3 py-2 rounded")
                }}
                classNamePrefix="select"
                options={options}
                isDisabled={isDisabled}
                {...props}
            />
        )
    }
)
SelectInput.displayName = "SelectInput"

const AutoComplete = React.forwardRef<HTMLSelectElement, AutoCompleteInputProps>(
    ({ className, loadOptions, value, ...props }, ref) => {
        return (
            <AsyncSelect
                unstyled
                instanceId={"id"}
                className={cn("w-full", className)}
                value={value}
                classNames={{
                    control: ({ isFocused }) => cn(isFocused ? "outline-none ring-2 ring-slate-950 ring-offset-2 dark:focus-visible:ring-slate-300" : "", "w-full ring-offset-white disabled:cursor-not-allowed disabled:opacity-50 rounded-md border border-slate-200 px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950"),
                    placeholder: () => "placeholder:text-slate-500 dark:placeholder:text-slate-400",
                    menu: () => "p-50 mt-2 border border-slate-400 bg-white dark:bg-slate-900 rounded-lg",
                    option: ({ isFocused }) => clsx(isFocused && "bg-slate-200 dark:bg-slate-700 active:bg-slate-400", "hover:cursor-pointer px-3 py-2 rounded")
                }}
                classNamePrefix="select"
                loadOptions={loadOptions}
                cacheOptions
                defaultOptions
                {...props}
            />
        )
    }
)
AutoComplete.displayName = "AutoComplete"

export { SelectInput, MultiSelectInput, AutoComplete }