import { cn } from '@/lib/utils'
import clsx from 'clsx'
import * as React from 'react'
import Select, { ActionMeta, FormatOptionLabelMeta, InputActionMeta, MultiValue, SingleValue } from 'react-select'
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
    id?: string,
    formatOptionLabel?: ((data: SelectOption, formatOptionLabelMeta: FormatOptionLabelMeta<SelectOption>) => React.ReactNode)
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
    isDisabled?: boolean,
    id?: string
}

export interface FormatMultiSelectInputProps {
    className?: string
    onChange: (newValue: MultiValue<SelectOption> | null, actionMeta: ActionMeta<SelectOption>) => void
    options: { label: string, options: SelectOption[] }[]
    placeholder: string
    isClearable?: boolean
    isSearchable?: boolean
    name: string,
    value?: SelectOption[],
    isDisabled?: boolean,
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
    ({ className, options, value, id, isDisabled, ...props }, ref) => {
        return (
            <Select
                unstyled
                instanceId={`react-select-id-input ${id}`}
                className={cn("w-full", className)}
                value={value}
                classNamePrefix="select"
                isDisabled={isDisabled}
                classNames={{
                    control: ({ isFocused }) => cn(isFocused ? "outline-none ring-2 ring-slate-950 ring-offset-2 dark:focus-visible:ring-slate-300" : "", "w-full ring-offset-white disabled:cursor-not-allowed disabled:opacity-50 rounded-md border border-slate-200 px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-8000 dark:bg-slate-900"),
                    placeholder: () => "opacity-50",
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

const FormatMultiSelectInput = React.forwardRef<HTMLSelectElement, FormatMultiSelectInputProps>(
    ({ className, options, value, id, isDisabled, ...props }, ref) => {
        return (
            <Select
                unstyled
                instanceId={`react-select-id-input ${id}`}
                className={cn("w-full", className)}
                value={value}
                classNamePrefix="select"
                isDisabled={isDisabled}
                classNames={{
                    control: ({ isFocused }) => cn(isFocused ? "outline-none ring-2 ring-slate-950 ring-offset-2 dark:focus-visible:ring-slate-300" : "", "w-full ring-offset-white disabled:cursor-not-allowed disabled:opacity-50 rounded-md border border-slate-200 px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-8000 dark:bg-slate-900"),
                    placeholder: () => "opacity-50",
                    menu: () => "p-50 mt-2 border border-slate-400 bg-white dark:bg-slate-900 rounded-lg",
                    multiValue: () => "bg-slate-200 dark:bg-slate-700 rounded items-center p-0.5 pl-2 m-0.5 gap-1.5",
                    option: ({ isFocused }) => clsx(isFocused && "bg-slate-200 dark:bg-slate-700 active:bg-slate-400", "hover:cursor-pointer px-3 py-2 rounded")
                }}
                isMulti
                formatGroupLabel={(group: {
                    label: string
                    options: SelectOption[]
                }) => {
                    return <div>
                        <div className='p-50 bg-slate-100 dark:bg-slate-800 h-10 flex justify-center items-center rounded-md'>{group.label}</div>
                    </div>
                }}
                options={options}
                {...props}
            />
        )
    }
)
FormatMultiSelectInput.displayName = "FormatMultiSelectInput"

const SelectInput = React.forwardRef<HTMLSelectElement, SelectInputProps>(
    ({ className, options, value, isDisabled, id, formatOptionLabel, ...props }, ref) => {
        return (
            <Select
                unstyled
                instanceId={`react-select-id-input ${id}`}
                id={id}
                className={cn("w-full", className)}
                value={value}
                classNames={{
                    control: ({ isFocused }) => cn(isFocused ? "outline-none ring-2 ring-slate-950 ring-offset-2 dark:focus-visible:ring-slate-300" : "", "w-full ring-offset-white disabled:cursor-not-allowed disabled:opacity-50 rounded-md border border-slate-200 px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950", isDisabled && "opacity-70"),
                    placeholder: () => "opacity-50",
                    menu: () => "p-50 mt-2 border border-slate-400 bg-white dark:bg-slate-900 rounded-lg z-10",
                    option: ({ isFocused }) => clsx(isFocused && "bg-slate-200 dark:bg-slate-700 active:bg-slate-400", "hover:cursor-pointer px-3 py-2 rounded")
                }}
                classNamePrefix="select"
                options={options}
                isDisabled={isDisabled}
                formatOptionLabel={formatOptionLabel}
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
                    placeholder: () => "opacity-50",
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

export { SelectInput, MultiSelectInput, AutoComplete, FormatMultiSelectInput }