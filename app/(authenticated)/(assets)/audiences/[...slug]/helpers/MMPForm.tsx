"use client"

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { SelectInput, SelectOption } from '@/components/utility/customComponents/SelectInput'
import React, { useEffect, useState } from 'react'
import { UseFormReturn } from 'react-hook-form'
import { getAllBundleIDsByMMP, getAllEventsByBundleIDAndMMP, getAllMMPNames } from '../../actions'
import { AudienceFormData } from './AudienceForm'
import { constainsOptions, dataWindowOptions, reengageIntervalOptions } from '@/components/utility/utils/Utils'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

export default function MMPForm({
    isEdit,
    editData,
    form
}: {
    isEdit: boolean,
    editData: AudienceType,
    form: UseFormReturn<AudienceFormData, any, undefined>
}) {

    const [mmpOptions, setMMPOptions] = useState<SelectOption[]>([])
    const [bundleOptions, setBundleOptions] = useState<SelectOption[]>([])
    const [eventOptions, setEventOptions] = useState<SelectOption[]>([])

    const { setValue, watch, getValues } = form

    const fetchBundle = async (mmpName: string, searchParam: string) => {
        const result = await getAllBundleIDsByMMP({ mmpName, searchParam })
        setBundleOptions(result.map((v: string) => ({ label: v, value: v })))
    }

    const fetchEvents = async (mmpName: string, bundleId: string) => {
        const result = await getAllEventsByBundleIDAndMMP({ mmpName, bundleId })
        setEventOptions(result.map((v: string) => ({ label: v, value: v })))
    }

    useEffect(() => {
        const fetchMMP = async () => {
            const result = await getAllMMPNames()
            setMMPOptions(result.map((v: string) => ({ label: v, value: v })))
        }
        fetchMMP()
        if (isEdit && editData.bundle) {
            fetchBundle(editData.mmp, editData.bundle)
            fetchEvents(editData.mmp, editData.bundle)
        }
    }, [])

    return (
        <div className='space-y-2'>
            <div className='grid grid-cols-2 gap-4'>
                <FormField
                    control={form.control}
                    name="mmp"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>MMP</FormLabel>
                            <FormControl>
                                <SelectInput
                                    placeholder='MMP'
                                    id="mmp"
                                    name="mmp"
                                    value={mmpOptions.filter(v => v.value === field.value)[0]}
                                    options={mmpOptions}
                                    onChange={(value) => {
                                        setValue('mmp', value ? value.value : '')
                                        if (value) fetchBundle(value.value, '')
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
                            <FormLabel>Bundle</FormLabel>
                            <FormControl>
                                <SelectInput
                                    placeholder='Bundle Id'
                                    id="bundle"
                                    name="bundle"
                                    value={bundleOptions.filter(v => v.value === field.value)[0]}
                                    options={bundleOptions}
                                    onChange={(value) => {
                                        setValue('bundle', value ? value.value : '')
                                        if (value) fetchEvents(watch('mmp'), value.value)
                                    }}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>

            <div className='grid grid-cols-2 gap-4'>
                <FormField
                    control={form.control}
                    name="days"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Data Window</FormLabel>
                            <FormControl>
                                <SelectInput
                                    placeholder='Days'
                                    id="days"
                                    name="days"
                                    value={dataWindowOptions.filter(v => v.value === field.value?.toString())[0]}
                                    options={dataWindowOptions}
                                    onChange={(value) => setValue('days', value ? parseInt(value.value) : 0)}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="reengageInterval"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Reengage Interval</FormLabel>
                            <FormControl>
                                <SelectInput
                                    placeholder='Reengage Interval'
                                    id="reengageInterval"
                                    name="reengageInterval"
                                    value={reengageIntervalOptions.filter(v => v.value === field.value?.toString())[0]}
                                    options={reengageIntervalOptions}
                                    onChange={(value) => setValue('reengageInterval', value ? parseInt(value.value) : 0)}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
            <div className='grid grid-cols-4 gap-4'>
                <div className='flex items-center'>Rules</div>
                <FormField
                    control={form.control}
                    name="contain"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <SelectInput
                                    placeholder='Contains'
                                    id="contain"
                                    name="contain"
                                    value={constainsOptions.filter(v => v.value === field.value)[0]}
                                    options={constainsOptions}
                                    onChange={(value) => setValue('contain', value ? value.value : '')}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="event"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <SelectInput
                                    placeholder='Events'
                                    id="event"
                                    name="event"
                                    value={eventOptions.filter(v => v.value === field.value)[0]}
                                    options={eventOptions}
                                    onChange={(value) => {
                                        setValue('event', value ? value.value : '')
                                    }}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type='button' className='w-full' variant='outline'
                    onClick={() => {
                        if (watch("contain") && watch("event")) {
                            const updatedRules = getValues("rules") ? getValues("rules").split(",") : []
                            updatedRules.push(`${watch("contain")}-${watch("event")}`)
                            setValue("rules", updatedRules.join(","))
                        }
                    }}
                >Add</Button>
            </div>
            {watch("rules") && watch("rules").split(",").length > 0 && <div className='col-span-2'>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Constains / Not Contains</TableHead>
                            <TableHead>Events</TableHead>
                            <TableHead>Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {watch("rules").split(",").map(v => {
                            return (
                                <TableRow key={v}>
                                    <TableCell className='w-[200px]'>{v.split('-')[0] === 'notcontains' ? "Not Contains" : "Contains"}</TableCell>
                                    <TableCell>{v.split('-')[1]}</TableCell>
                                    <TableCell className='w-[100px]'>
                                        <Button type='button' onClick={() => {
                                            const updatedRules = getValues("rules").split(',').filter(value => value !== v)
                                            setValue("rules", updatedRules.length === 0 ? '' : updatedRules.join(','))
                                        }}>Delete</Button>
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </div>}
        </div>
    )
}
