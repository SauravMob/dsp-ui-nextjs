"use client"

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import { createCalcFilter, updateCalcFilter } from '../../actions'
import { toast } from '@/components/ui/use-toast'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { SelectInput } from '@/components/utility/customComponents/SelectInput'
import { Switch } from '@/components/ui/switch'
import { formatQryDate, statusWithoutInactiveOptions } from '@/components/utility/utils/Utils'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { CalendarIcon } from 'lucide-react'
import { Calendar } from '@/components/ui/calendar'
import { DateRange } from 'react-day-picker'

export default function ManageReportForm({
    id,
    isEdit,
    editData,
    advertiserList
}: {
    id: string,
    isEdit: boolean,
    editData: ManageReportType | null,
    advertiserList: { id: string, name: string }[]
}) {

    const router = useRouter()

    const advertiserOptions = advertiserList.map(v => ({ value: v.id.toString(), label: v.name }))

    const formSchema = z.object({
        bidsCalc: z.coerce.number().min(1, { message: "Required field" }),
        clksCalc: z.coerce.number().min(1, { message: "Required field" }),
        impsCalc: z.coerce.number().min(1, { message: "Required field" }),
        spendsCalc: z.coerce.number().min(1, { message: "Required field" }),
        status: z.string(),
        date: z.coerce.string(),
        clickMaskFlag: z.boolean(),
        userId: z.coerce.number().min(1, { message: "Required Field" })
    })

    const form = useForm<ManageReportType>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            bidsCalc: editData?.bidsCalc || '',
            clksCalc: editData?.clksCalc || '',
            impsCalc: editData?.impsCalc || '',
            spendsCalc: editData?.spendsCalc || '',
            status: editData?.status || '',
            date: editData?.date || `${formatQryDate(new Date())}~${formatQryDate(new Date())}`,
            clickMaskFlag: editData?.clickMaskFlag !== undefined ? editData?.clickMaskFlag : true,
            userId: editData?.userId || ''
        }
    })

    const { clearErrors, setValue } = form
    const { isSubmitting } = form.formState

    const onSubmit: SubmitHandler<ManageReportType> = async (values: ManageReportType) => {
        const result = isEdit ? await updateCalcFilter(id, values) : await createCalcFilter(values)
        if (result?.status === 200) {
            router.push("/admin-tools/manage-reports")
            toast({ title: `${isEdit ? "Updated" : "Created"} setting`, description: `Setting ${isEdit ? "updated" : "created"} successfully` })
        } else toast({ title: `Error while ${isEdit ? "updating" : "creating"} setting`, description: `Couldn't ${isEdit ? "update" : "create"} setting` })
        router.refresh()
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" noValidate>
                <div className='grid grid-cols-2 space-x-4'>
                    <FormField
                        control={form.control}
                        name="userId"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Advertiser<span className='text-red-900'>*</span></FormLabel>
                                <FormControl className='flex justify-center items-center'>
                                    <SelectInput
                                        placeholder='Advertiser / User'
                                        id="userId"
                                        name="userId"
                                        value={advertiserOptions.filter(v => v.value === field.value.toString())[0]}
                                        options={advertiserOptions}
                                        onChange={(value) => {
                                            setValue('userId', value ? parseInt(value.value) : 0)
                                            clearErrors('userId')
                                        }}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="status"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Status</FormLabel>
                                <FormControl>
                                    <div className='flex justify-center items-center'>
                                        <SelectInput
                                            placeholder='Status...'
                                            name="status"
                                            id="status"
                                            value={statusWithoutInactiveOptions.filter(v => v.value === field.value)[0]}
                                            options={statusWithoutInactiveOptions}
                                            onChange={(value) => {
                                                setValue('status', value ? value.value : '')
                                                clearErrors('status')
                                            }}
                                        />
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className='grid grid-cols-2 space-x-4'>
                    <FormField
                        control={form.control}
                        name="bidsCalc"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Bids<span className='text-red-900'>*</span></FormLabel>
                                <FormControl>
                                    <Input type="number" placeholder="Bids..." {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="impsCalc"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Impressions<span className='text-red-900'>*</span></FormLabel>
                                <FormControl>
                                    <Input type="number" placeholder="Impressions..." {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className='grid grid-cols-2 space-x-4'>
                    <FormField
                        control={form.control}
                        name="clksCalc"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Clicks<span className='text-red-900'>*</span></FormLabel>
                                <FormControl>
                                    <Input type="number" placeholder="Clicks..." {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="spendsCalc"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Spends<span className='text-red-900'>*</span></FormLabel>
                                <FormControl>
                                    <Input type="number" placeholder="Spends..." {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className='grid grid-cols-2 space-x-4'>
                    <FormField
                        control={form.control}
                        name="date"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Date</FormLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                                variant={"outline"}
                                                className={cn(
                                                    "w-full pl-3 text-left font-normal",
                                                    !field.value && "text-muted-foreground"
                                                )}
                                            >
                                                {field.value.split('~').length === 1 ? `${field.value.split('~')[0]}` : `${field.value.split('~')[0]} - ${field.value.split('~')[1]}`}
                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar
                                            mode="range"
                                            selected={{
                                                from: field.value ? new Date(field.value.split('~')[0]) : undefined,
                                                to: field.value ? field.value.split('~').length === 1 ? new Date(field.value.split('~')[0]) : new Date(field.value.split('~')[1]) : undefined
                                            }}
                                            onSelect={(e: DateRange | undefined) => {
                                                if (e) setValue("date", e.to ? `${formatQryDate(e.from)}~${formatQryDate(e.to)}` : `${formatQryDate(e.from)}`)
                                            }}
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="clickMaskFlag"
                        render={({ field }) => (
                            <FormItem className='grid grid-rows-2'>
                                <FormLabel className='mt-2'>
                                    Click Mask Flag
                                </FormLabel>
                                <FormControl>
                                    <Switch
                                        name="clickMaskFlag"
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </div>
                <div className='flex justify-end pt-4'>
                    <Button className='mr-2' variant="outline" onClick={(e) => {
                        e.preventDefault()
                        router.push("/admin-tools/manage-reports")
                    }}>CANCEL</Button>
                    <Button type="submit" loading={isSubmitting}>{isEdit ? "UPDATE" : "CREATE"}</Button>
                </div>
            </form>
        </Form>
    )
}
