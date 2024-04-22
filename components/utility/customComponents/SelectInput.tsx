import { cn } from '@/lib/utils'
import clsx from 'clsx'
import * as React from 'react'
import Select, { ActionMeta, MultiValue, SingleValue } from 'react-select'

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
    name: string
}

export interface MultiSelectInputProps {
    className?: string
    onChange: (newValue: MultiValue<SelectOption> | null, actionMeta: ActionMeta<SelectOption>) => void
    options: SelectOption[]
    placeholder: string
    isClearable?: boolean
    isSearchable?: boolean
    name: string
}

const MultiSelectInput = React.forwardRef<HTMLSelectElement, MultiSelectInputProps>(
    ({ className, options, ...props }, ref) => {
        return (
            <Select
                unstyled
                instanceId={"id"}
                className={cn("w-full", className)}
                classNamePrefix="select"
                classNames={{
                    control: ({ isFocused }) => cn(isFocused ? "outline-none ring-2 ring-slate-950 ring-offset-2 dark:focus-visible:ring-slate-300" : "", "w-full ring-offset-white disabled:cursor-not-allowed disabled:opacity-50 rounded-md border border-slate-200 px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950"),
                    placeholder: () => "placeholder:text-slate-500 dark:placeholder:text-slate-400",
                    menu: () => "p-50 mt-2 border border-slate-400 bg-white dark:bg-slate-900 rounded-lg",
                    multiValue: () => "bg-slate-200 dark:bg-slate-700 rounded items-center p-0.5 pl-2 m-0.5 gap-1.5",
                    option: ({ isFocused }) =>
                        clsx(
                            isFocused && "bg-slate-200 dark:bg-slate-700 active:bg-slate-400",
                            "hover:cursor-pointer px-3 py-2 rounded"
                        )
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
    ({ className, options, ...props }, ref) => {
        return (
            <Select
                unstyled
                instanceId={"id"}
                className={cn("w-full", className)}
                classNames={{
                    control: ({ isFocused }) => cn(isFocused ? "outline-none ring-2 ring-slate-950 ring-offset-2 dark:focus-visible:ring-slate-300" : "", "w-full ring-offset-white disabled:cursor-not-allowed disabled:opacity-50 rounded-md border border-slate-200 px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950"),
                    placeholder: () => "placeholder:text-slate-500 dark:placeholder:text-slate-400",
                    menu: () => "p-50 mt-2 border border-slate-400 bg-white dark:bg-slate-900 rounded-lg",
                    option: ({ isFocused }) =>
                        clsx(
                            isFocused && "bg-slate-200 dark:bg-slate-700 active:bg-slate-400",
                            "hover:cursor-pointer px-3 py-2 rounded"
                        )
                }}
                classNamePrefix="select"
                options={options}
                {...props}
            />
        )
    }
)
SelectInput.displayName = "SelectInput"

export { SelectInput, MultiSelectInput }