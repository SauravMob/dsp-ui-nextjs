"use client"

import { getAllBundleIDsByMMP, getAllEventsByBundleIDAndMMP } from '@/app/(authenticated)/(assets)/audiences/actions'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'
import { Textarea } from '@/components/ui/textarea'
import { AutoComplete, MultiSelectInput, SelectInput } from '@/components/utility/customComponents/SelectInput'
import { statusWithoutInactiveOptions } from '@/components/utility/utils/Utils'
import { cn } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useMemo, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import { createMMPSetting, fetchALLMMPSettings, updateMMPSetting } from '../../actions'
import { toast } from '@/components/ui/use-toast'

export default function MMPSettingForm({
    id,
    isEdit,
    editData,
    mmpList
}: {
    id: string
    isEdit: boolean
    editData: MmpSettingType
    mmpList: string[]
}) {

    const router = useRouter()

    const mmpOptions = mmpList.map(v => ({ value: v, label: v }))
    const [bundleOptions, setBundleOptions] = useState<{ value: string, label: string }[]>([])
    const [eventOptions, setEventOptions] = useState<{ value: string, label: string }[]>([])
    const [existingData, setExistingData] = useState<MmpSettingType[]>([])
    const suppressBundleOptions = useMemo(() => {
        const uniqueBundles = new Set(existingData.map(v => v.bundle))
        return Array.from(uniqueBundles).map(bundle => ({ value: bundle, label: bundle }))
    }, [existingData])

    const getBundleList = async (mmpName: string, searchParam?: string) => {
        const bundleList = await getAllBundleIDsByMMP({ mmpName, searchParam })
        setBundleOptions(bundleList.map((v: string) => ({ value: v, label: v })))
    }

    const getEventsList = async (mmpName: string, bundleId: string) => {
        const eventList = await getAllEventsByBundleIDAndMMP({ mmpName, bundleId })
        setEventOptions(eventList.map((v: string) => ({ value: v.toLowerCase(), label: v })))
    }

    useEffect(() => {
        if (isEdit) {
            getBundleList(editData.mmp, editData.bundle)
            getEventsList(editData.mmp, editData.bundle)
        }
    }, [editData])

    const formSchema = z.object({
        mmp: z.string().min(1, { message: "Required Field" }),
        bundle: z.string().min(1, { message: "Required Field" }),
        mmpEvents: z.record(z.object({
            url: z.string().min(1, { message: "Url required" }),
            secondaryUrl: z.string().optional(),
            isDay: z.coerce.number().optional(),
            isMin: z.coerce.number().optional()
        })),
        status: z.string(),
        blDeviceModels: z.string().optional(),
        suppressedData: z.record(z.array(z.string())).optional(),
        suppressedToggle: z.boolean().optional(),
        suppressBundle: z.string().optional(),
        suppressEvent: z.string().optional()
    }).refine((data) => {
        if (data.suppressedToggle && data.suppressedData && Object.keys(data.suppressedData).length === 0) return false
        const emptyArrays = data.suppressedData && Object.values(data.suppressedData).some(arr => arr.length === 0)
        if (emptyArrays) return false
        return true
    }, {
        message: 'Select bundle and event to suppress',
        path: ["suppressBundle"]
    }).refine((data) => {
        if (data.suppressedData && Object.keys(data.suppressedData).length > 3) return false
        return true
    }, {
        message: "Only 3 bundles are allowed to suppress.",
        path: ["suppressBundle"]
    }).refine((data) => {
        if (!isEdit && existingData.filter(v => v.bundle === data.bundle).flatMap(v => Object.keys(JSON.parse(v.mmpEvents))).some(e => Object.keys(data.mmpEvents).includes(e))) return false
        return true
    }, {
        message: "Bundle with selected event already exists",
        path: ["bundle"]
    })

    const form = useForm<MMPSettingFormType>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            mmp: isEdit ? editData.mmp : '',
            bundle: isEdit ? editData.bundle : '',
            mmpEvents: isEdit ? editData.mmpEvents ? JSON.parse(editData.mmpEvents) : {} : {},
            blDeviceModels: isEdit ? editData.blDeviceModels : '',
            status: isEdit ? editData.status : 'ACTIVE',
            suppressedToggle: isEdit ? !!editData.suppressedData : false,
            suppressedData: isEdit ? editData.suppressedData ? JSON.parse(editData.suppressedData) : {} : {}
        }
    })

    const { clearErrors, setValue, getValues, watch } = form
    const { isSubmitting } = form.formState

    const suppressEventOptions = useMemo(() => {
        const currentBundle = getValues("suppressBundle")
        const currentEvents = getValues("mmpEvents")

        return existingData
            .filter(v => v.bundle === currentBundle)
            .flatMap(v => Object.keys(JSON.parse(v.mmpEvents)))
            .filter(event => !(currentBundle === getValues("bundle") && currentEvents.hasOwnProperty(event)))
            .map(e => ({ value: e, label: e }))
    }, [getValues("suppressBundle"), getValues("bundle"), getValues("mmpEvents")])

    const watchMmpEvents = watch("mmpEvents")
    const watchSuppressData = watch("suppressedData")
    const watchSuppressToggle = watch("suppressedToggle")

    useEffect(() => {
        const fetchSuppressBundle = async () => {
            const bundleList = await fetchALLMMPSettings({ mmp: getValues("mmp") })
            setExistingData(bundleList.content)
        }
        if (getValues("mmp")) fetchSuppressBundle()
    }, [getValues("mmp")])

    const bundleFilter = async (inputValue: string) => {
        const fetch = await getAllBundleIDsByMMP({ mmpName: getValues("mmp"), searchParam: inputValue })
        const options = fetch.map((v: string) => ({ value: v, label: v }))
        setBundleOptions(options)
        return options
    }

    const onSubmit: SubmitHandler<MMPSettingFormType> = async (values: MMPSettingFormType) => {
        const submittedValues: MmpSettingType = {
            mmp: values.mmp,
            bundle: values.bundle,
            mmpEvents: JSON.stringify(values.mmpEvents),
            status: values.status,
            blDeviceModels: values.blDeviceModels,
            suppressedData: values.suppressedToggle ? JSON.stringify(values.suppressedData) : null
        }
        const result = isEdit ? await updateMMPSetting(id, submittedValues) : await createMMPSetting(submittedValues)
        if (result?.status === 200) {
            router.push("/admin-tools/mmp-settings")
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
                        name="mmp"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>MMP<span className='text-red-900'>*</span></FormLabel>
                                <FormControl>
                                    <SelectInput
                                        placeholder='MMP'
                                        id="mmp"
                                        name="mmp"
                                        value={mmpOptions.filter(v => v.value === field.value)[0]}
                                        options={mmpOptions}
                                        onChange={(value) => {
                                            setValue('mmp', value ? value.value : '')
                                            setValue("bundle", '')
                                            setValue("suppressedData", {})
                                            setValue("mmpEvents", {})
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
                                <FormControl>
                                    <AutoComplete
                                        placeholder="Bundle..."
                                        isClearable={true}
                                        isSearchable={true}
                                        name="bundle"
                                        value={bundleOptions.filter(v => v.label === field.value)[0]}
                                        loadOptions={bundleFilter}
                                        onChange={(value) => {
                                            setValue('bundle', value ? value.value : '')
                                            setValue('mmpEvents', {})
                                            if (value) getEventsList(getValues('mmp'), value?.value)
                                            clearErrors('bundle')
                                        }}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <FormField
                    control={form.control}
                    name="mmpEvents"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Events<span className='text-red-900'>*</span></FormLabel>
                            <FormControl>
                                <MultiSelectInput
                                    placeholder='Events'
                                    id="mmpEvents"
                                    name="mmpEvents"
                                    value={eventOptions.filter(v => Object.keys(field.value).includes(v.value))}
                                    options={eventOptions}
                                    onChange={(selectedOptions) => {
                                        if (selectedOptions) {
                                            const updatedEvents: MMPSettingFormType["mmpEvents"] = {}
                                            selectedOptions.map(v => {
                                                updatedEvents[v.value] = getValues("mmpEvents")[v.value]
                                            })
                                            setValue("mmpEvents", updatedEvents)
                                        }
                                    }}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {Object.keys(watchMmpEvents).length !== 0 && <Table>
                    <TableBody>
                        {Object.keys(watchMmpEvents)?.map((event, k) => (
                            <TableRow key={k}>
                                <TableCell colSpan={3} className='text-lg font-medium text-center'>{event}</TableCell>
                                <TableCell>
                                    <div className='grid grid-cols-2 space-x-4'>
                                        <FormField
                                            control={form.control}
                                            name={`mmpEvents.${event}.url`}
                                            render={({ field }) => (
                                                <FormItem className={cn(watchSuppressToggle ? "col-span-1" : "col-span-2")}>
                                                    <FormControl>
                                                        <Input
                                                            type="text"
                                                            id={`mmpEvents.${event}.url`}
                                                            placeholder="URL..."
                                                            value={watchMmpEvents[event]?.url || ''}
                                                            onChange={(e) => setValue(`mmpEvents.${event}.url`, e.target.value)}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        {watch("suppressedToggle") && <FormField
                                            control={form.control}
                                            name={`mmpEvents.${event}.secondaryUrl`}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormControl>
                                                        <Input
                                                            type="text"
                                                            id={`mmpEvents.${event}.secondaryUrl`}
                                                            placeholder="Secondary URL..."
                                                            value={watchMmpEvents[event]?.secondaryUrl || ''}
                                                            onChange={(e) => setValue(`mmpEvents.${event}.secondaryUrl`, e.target.value)}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />}
                                    </div>
                                    <div className='grid grid-cols-2 space-x-4 mt-2'>
                                        <FormField
                                            control={form.control}
                                            name={`mmpEvents.${event}.isDay`}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormControl>
                                                        <Input
                                                            type="number"
                                                            id={`mmpEvents.${event}.isDay`}
                                                            disabled={!!watchMmpEvents[event]?.isMin}
                                                            placeholder="isDay..."
                                                            value={watchMmpEvents[event]?.isDay || ''}
                                                            onChange={(e) => setValue(`mmpEvents.${event}.isDay`, e.target.value)}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name={`mmpEvents.${event}.isMin`}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormControl className='flex justify-center items-center'>
                                                        <Input
                                                            type="number"
                                                            id={`mmpEvents.${event}.isMin`}
                                                            placeholder="isMin..."
                                                            disabled={!!watchMmpEvents[event]?.isDay}
                                                            value={watchMmpEvents[event]?.isMin || ''}
                                                            onChange={(e) => setValue(`mmpEvents.${event}.isMin`, e.target.value)}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>}
                <div className='grid grid-cols-6 space-x-3'>
                    <FormField
                        control={form.control}
                        name="suppressedToggle"
                        render={({ field }) => (
                            <FormItem className='flex items-center col-span-1'>
                                <FormLabel className='mr-2 mt-1'>Suppress</FormLabel>
                                <FormControl>
                                    <Switch
                                        disabled={Object.keys(watchMmpEvents).length === 0}
                                        name="suppressedToggle"
                                        checked={field.value}
                                        onCheckedChange={(e) => {
                                            setValue("suppressedToggle", e)
                                            if (!e) setValue("suppressedData", {})
                                        }}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {watchSuppressToggle &&
                        <>
                            <FormField
                                control={form.control}
                                name="suppressBundle"
                                render={({ field }) => (
                                    <FormItem className='col-span-2'>
                                        <FormControl>
                                            <SelectInput
                                                placeholder='Suppress Bundle'
                                                id="suppressBundle"
                                                name="suppressBundle"
                                                value={suppressBundleOptions.filter(v => v.value === field.value)[0]}
                                                options={suppressBundleOptions}
                                                onChange={(value) => {
                                                    setValue('suppressBundle', value ? value.value : '')
                                                    setValue('suppressEvent', '')
                                                    clearErrors('suppressBundle')
                                                }}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="suppressEvent"
                                render={({ field }) => (
                                    <FormItem className='col-span-2'>
                                        <FormControl>
                                            <SelectInput
                                                placeholder='Suppress Event'
                                                id="suppressEvent"
                                                name="suppressEvent"
                                                value={suppressEventOptions.filter(v => v.value === field.value)[0]}
                                                options={suppressEventOptions}
                                                onChange={(value) => setValue('suppressEvent', value ? value.value : '')}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button className='col-span-1' type='button' onClick={() => {
                                if (!getValues("suppressedData")[getValues("suppressBundle")]?.includes(getValues("suppressEvent")) && getValues("suppressEvent")) {
                                    const updatedSuppressed: MMPSettingFormType["suppressedData"] = { ...getValues("suppressedData") }
                                    updatedSuppressed[getValues("suppressBundle")] = [...getValues("suppressedData")[getValues("suppressBundle")] || [], getValues("suppressEvent")]
                                    setValue("suppressedData", updatedSuppressed)
                                }
                            }}>Add</Button>
                        </>}
                </div>
                {watchSuppressData && Object.keys(watchSuppressData).map(bundle => (
                    <div key={bundle} className='grid grid-cols-3'>
                        <div className='col-span-1'></div>
                        <div className='flex items-center'>
                            <X size={18} className='cursor-pointer mr-2' onClick={() => {
                                const updatedSuppressed = { ...getValues("suppressedData") }
                                delete updatedSuppressed[bundle]
                                setValue("suppressedData", updatedSuppressed)
                            }} />{bundle}
                        </div>
                        <div className='grid'>
                            {watchSuppressData[bundle].map(event => (
                                <div key={event} className='flex items-center'>
                                    <X size={18} className='cursor-pointer mr-2' onClick={() => {
                                        const updatedSuppressed = { ...getValues("suppressedData") }
                                        updatedSuppressed[bundle] = watchSuppressData[bundle].filter(v => v !== event)
                                        setValue("suppressedData", updatedSuppressed)
                                    }} />{event}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
                <FormField
                    control={form.control}
                    name="blDeviceModels"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Device Models</FormLabel>
                            <FormControl>
                                <Textarea {...field} placeholder='Bl Device Models' className='rounded-md' />
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
