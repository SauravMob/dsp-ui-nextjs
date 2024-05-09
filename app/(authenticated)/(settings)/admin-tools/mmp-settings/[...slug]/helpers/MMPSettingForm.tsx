"use client"

import { getAllBundleIDsByMMP, getAllEventsByBundleIDAndMMP } from '@/app/(authenticated)/(assets)/audiences/actions'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { MultiSelectInput, SelectInput } from '@/components/utility/customComponents/SelectInput'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'

export default function MMPSettingForm({
    id,
    isEdit,
    editData,
    mmpList
}: {
    id: string,
    isEdit: boolean,
    editData: MmpSettingType | null,
    mmpList: string[]
}) {

    const router = useRouter()

    const mmpOptions = mmpList.map(v => ({ value: v, label: v }))
    const [bundleOptions, setBundleOptions] = useState<{ value: string, label: string }[]>([])
    const [eventOptions, setEventOptions] = useState<{ value: string, label: string }[]>([])

    const getBundleList = async (mmpName: string) => {
        const bundleList = await getAllBundleIDsByMMP({ mmpName })
        setBundleOptions(bundleList.map((v: string) => ({ value: v, label: v })))
    }

    const getEventsList = async (mmpName: string, bundleId: string) => {
        const eventList = await getAllEventsByBundleIDAndMMP({ mmpName, bundleId })
        setEventOptions(eventList.map((v: string) => ({ value: v, label: v })))
    }

    const formSchema = z.object({
        mmp: z.string().min(1, { message: "Required Field" }),
        bundle: z.string().min(1, { message: "Required Field" }),
        mmpEvents: z.record(z.object({
            url: z.string().min(1, { message: "Url required" }),
            secondaryUrl: z.string().optional(),
            isDay: z.string().optional(),
            isMin: z.string().optional()
        }).transform((data: { isDay?: string; isMin?: string }) => {
            if (!data.isDay && !data.isMin) throw new Error("Either isDay or isMin is required.")
        })),
        status: z.string(),
        blDeviceModels: z.string(),
        suppressedData: z.record(z.array(z.string()))
    })

    const form = useForm<MMPSettingFormType>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            mmp: editData?.mmp || '',
            bundle: editData?.bundle || '',
            mmpEvents: editData?.mmpEvents && JSON.parse(editData?.mmpEvents) || {}
        }
    })

    const { clearErrors, setValue, getValues } = form
    const { isSubmitting } = form.formState

    const onSubmit: SubmitHandler<MMPSettingFormType> = async (values: MMPSettingFormType) => {
        console.log("onSubmit", values)
        // const result = isEdit ? await updateCalcFilter(id, values) : await createCalcFilter(values)
        // if (result?.status === 200) {
        //     router.push("/admin-tools/manage-reports")
        //     toast({ title: `${isEdit ? "Updated" : "Created"} setting`, description: `Setting ${isEdit ? "updated" : "created"} successfully` })
        // } else toast({ title: `Error while ${isEdit ? "updating" : "creating"} setting`, description: `Couldn't ${isEdit ? "update" : "create"} setting` })
        // router.refresh()
    }

    console.log("eventsList:", eventOptions)

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" noValidate>
                <FormField
                    control={form.control}
                    name="mmp"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>MMP<span className='text-red-900'>*</span></FormLabel>
                            <FormControl className='flex justify-center items-center'>
                                <SelectInput
                                    placeholder='MMP'
                                    id="mmp"
                                    name="mmp"
                                    value={mmpOptions.filter(v => v.value === field.value)[0]}
                                    options={mmpOptions}
                                    onChange={(value) => {
                                        setValue('mmp', value ? value.value : '')
                                        if (value) getBundleList(value?.value)
                                        clearErrors('mmp')
                                    }}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="bundle"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Bundle<span className='text-red-900'>*</span></FormLabel>
                            <FormControl className='flex justify-center items-center'>
                                <SelectInput
                                    placeholder='Bundle'
                                    id="bundle"
                                    name="bundle"
                                    value={bundleOptions.filter(v => v.value === field.value)[0]}
                                    options={bundleOptions}
                                    onChange={(value) => {
                                        setValue('bundle', value ? value.value : '')
                                        if (value) getEventsList(getValues('mmp'), value?.value)
                                        clearErrors('bundle')
                                    }}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="mmpEvents"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Events<span className='text-red-900'>*</span></FormLabel>
                            <FormControl className='flex justify-center items-center'>
                                <MultiSelectInput
                                    placeholder='Events'
                                    id="mmpEvents"
                                    name="mmpEvents"
                                    value={eventOptions.filter(v => Object.keys(field.value).includes(v.value))}
                                    options={eventOptions}
                                    onChange={(value) => {
                                        console.log("VAL:", value);

                                        // setValue('events', value ? value.value : '')
                                        // clearErrors('events')
                                    }}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className='flex justify-end pt-4'>
                    <Button className='mr-2' variant="outline" onClick={(e) => {
                        e.preventDefault()
                        router.push("/admin-tools/mmp-settings")
                    }}>CANCEL</Button>
                    <Button type="submit" loading={isSubmitting}>{isEdit ? "UPDATE" : "CREATE"}</Button>
                </div>
            </form>
        </Form>
    )
}
