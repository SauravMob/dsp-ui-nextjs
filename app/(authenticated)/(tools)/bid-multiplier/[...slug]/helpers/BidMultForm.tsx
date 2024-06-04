"use client"

import { fetchCampaignIdNameList, searchCampaign } from '@/app/(authenticated)/(manage)/campaigns/actions'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import { createBidMultiplier, updateBidMultiplier } from '../../actions'
import { toast } from '@/components/ui/use-toast'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { AutoComplete, SelectInput } from '@/components/utility/customComponents/SelectInput'
import { Button } from '@/components/ui/button'
import { fetchUserByRole } from '@/app/(authenticated)/(analyze)/actions'
import { Textarea } from '@/components/ui/textarea'
import { statusWithoutInactiveOptions } from '@/components/utility/utils/Utils'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

export default function BidMultForm({
    editData,
    isEdit,
    userId,
    existingBidMultiplier
}: {
    editData: BidMultiType
    isEdit: boolean
    userId: number,
    existingBidMultiplier: BidMultiTabularData
}) {

    const router = useRouter()

    const [campaignOptions, setCampaignOptions] = useState<{ value: string, label: string }[]>([])
    const [exchangeOptions, setExchangeOptions] = useState<{ value: string, label: string }[]>([])

    const campaignFilter = async (inputValue: string) => {
        const fetch = !parseInt(inputValue) ? await fetchCampaignIdNameList(inputValue) : await searchCampaign({ pageNo: "0", pageSize: "50", filter: { campaignId: inputValue } })
        const options = !parseInt(inputValue) ? fetch.map((v: { id: string, name: string }) => ({ value: v.id, label: v.name })) : fetch.content.map((v: { id: number, campaignName: string }) => ({ value: v.id.toString(), label: v.campaignName }))
        setCampaignOptions(options)
        return options
    }

    useEffect(() => {
        const fetchCampaign = async () => {
            const result = await searchCampaign({ pageNo: "0", pageSize: "50", filter: { campaignId: editData.campaignId.toString() } })
            setCampaignOptions(result.content.map((v: { id: number, campaignName: string }) => ({ value: v.id.toString(), label: v.campaignName })))
        }
        if (isEdit) fetchCampaign()
        const fetchSSP = async () => {
            const sspList = await fetchUserByRole('SSP')
            setExchangeOptions(sspList.map((v: { id: number, name: string }) => ({ value: v.name, label: v.name })))
        }
        fetchSSP()
    }, [])

    const formSchema = z.object({
        campaignId: z.number().refine((data) => {
            return data
        }, { message: "Campaign is required" }).refine((data) => {
            return isEdit ? true : existingBidMultiplier.content.filter(v => v.campaignId === data).length === 0
        }, { message: "Setting already exists with selected campaign Id" }),
        bundles: z.string().optional(),
        bundleBids: z.record(z.string(), z.number().nullable()),
        adslot: z.string().optional(),
        adslotBids: z.record(z.string(), z.number().nullable()),
        exchanges: z.string(),
        exchangeBids: z.record(z.string(), z.number().nullable()),
        maxBidPrice: z.coerce.number().min(1, { message: "Max bid price must be greater than 0" }),
        status: z.string()
    }).refine((data) => {
        return Object.keys(data.bundleBids).every(v => data.bundleBids[v])
    }, { message: "Bundle bid multiplier is required", path: ["bundles"] })
        .refine((data) => {
            return Object.keys(data.adslotBids).every(v => data.adslotBids[v])
        }, { message: "AdSlot bid multiplier is required", path: ["adslot"] })
        .refine((data) => {
            return Object.keys(data.exchangeBids).every(v => data.exchangeBids[v])
        }, { message: "Exchange bid multiplier is required", path: ["exchanges"] })

    type BidFormType = z.infer<typeof formSchema>

    const form = useForm<BidFormType>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            campaignId: isEdit ? editData.campaignId : 0,
            bundles: '',
            bundleBids: isEdit ? editData.bundleBids ? JSON.parse(editData.bundleBids) : {} : {},
            adslot: '',
            adslotBids: isEdit ? editData.adslotBids ? JSON.parse(editData.adslotBids) : {} : {},
            exchanges: '',
            exchangeBids: isEdit ? editData.exchangeBids ? JSON.parse(editData.exchangeBids) : {} : {},
            maxBidPrice: isEdit ? editData.maxBidPrice : 0,
            status: isEdit ? editData.status : "ACTIVE"
        }
    })

    const { setValue, getValues, watch } = form
    const { isSubmitting } = form.formState

    const watchBundleBids = watch("bundleBids")
    const watchAdSlotBids = watch("adslotBids")
    const watchExchangeBids = watch("exchangeBids")

    const onSubmit: SubmitHandler<BidFormType> = async (values: BidFormType) => {
        const submitData = {
            ...values,
            id: isEdit ? editData.id : 0,
            bundleBids: Object.keys(values.bundleBids).length > 0 ? JSON.stringify(values.bundleBids) : null,
            adslotBids: Object.keys(values.adslotBids).length > 0 ? JSON.stringify(values.adslotBids) : null,
            exchangeBids: Object.keys(values.exchangeBids).length > 0 ? JSON.stringify(values.exchangeBids) : null,
            userId
        }
        const result = isEdit ? await updateBidMultiplier(editData.id, submitData) : await createBidMultiplier(submitData)
        if (result?.status === 200) {
            router.push("/bid-multiplier")
            toast({ title: `${isEdit ? "Updated" : "Created"} bid multiplier settings`, description: `Bid multiplier ${isEdit ? "updated" : "created"} successfully` })
        } else toast({ title: `Error while ${isEdit ? "updating" : "creating"} bid multiplier settings`, description: `Couldn't ${isEdit ? "update" : "create"} bid multiplier settings` })
        router.refresh()
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" noValidate>
                <FormField
                    control={form.control}
                    name="campaignId"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Campaign<span className='text-red-900'>*</span></FormLabel>
                            <FormControl>
                                <AutoComplete
                                    placeholder="Campaign..."
                                    isClearable={true}
                                    isSearchable={true}
                                    name="campaign"
                                    value={campaignOptions.filter(v => v.value === field.value.toString())[0]}
                                    loadOptions={campaignFilter}
                                    onChange={(e) => setValue('campaignId', e ? parseInt(e.value) : 0)}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className='grid grid-cols-5 gap-4 items-center'>
                    <FormField
                        control={form.control}
                        name="exchanges"
                        render={({ field }) => (
                            <FormItem className={cn(Object.keys(watchExchangeBids).length > 0 ? 'col-span-2' : 'col-span-4')}>
                                <FormLabel>Exchanges</FormLabel>
                                <FormControl>
                                    <SelectInput
                                        placeholder='Exchanges'
                                        id="exchanges"
                                        name="exchanges"
                                        value={exchangeOptions.filter(v => v.value === field.value)[0]}
                                        options={exchangeOptions}
                                        onChange={(value) => setValue('exchanges', value ? value.value : '')}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className='h-full flex items-center mt-8 col-span-1'>
                        <Button type='button' className='w-full' variant='outline'
                            onClick={() => {
                                if (watch("exchanges")) {
                                    const updatedExchangeBids = { ...getValues("exchangeBids"), [watch("exchanges")]: null }
                                    setValue("exchangeBids", updatedExchangeBids)
                                }
                            }}
                        >Add</Button>
                    </div>
                    {Object.keys(watchExchangeBids).length > 0 && <div className='col-span-2'>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Exchanges</TableHead>
                                    <TableHead>Bid Multiplier</TableHead>
                                    <TableHead>Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {Object.keys(watchExchangeBids).map(v => {
                                    return (
                                        <TableRow key={v}>
                                            <TableCell className='min-w-[300px]'>{v}</TableCell>
                                            <TableCell>
                                                <Input
                                                    placeholder='Multiplier'
                                                    type='number'
                                                    value={watchExchangeBids[v] ?? ''}
                                                    onChange={(e) => {
                                                        const updateExchangeBids = { ...watchExchangeBids, [v]: e.target.value ? parseInt(e.target.value) : null }
                                                        setValue("exchangeBids", updateExchangeBids)
                                                    }}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <Button type='button' onClick={() => {
                                                    const updatedExchangeBids = { ...watchExchangeBids }
                                                    delete updatedExchangeBids[v]
                                                    setValue("exchangeBids", updatedExchangeBids)
                                                }}>Delete</Button>
                                            </TableCell>
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    </div>}
                </div>
                <div className='grid grid-cols-5 gap-4 items-center'>
                    <FormField
                        control={form.control}
                        name="bundles"
                        render={({ field }) => (
                            <FormItem className={cn(Object.keys(watchBundleBids).length > 0 ? 'col-span-2' : 'col-span-4')}>
                                <FormLabel>Bundle</FormLabel>
                                <FormControl>
                                    <Textarea
                                        id="bundles"
                                        name="bundles"
                                        disabled={Object.keys(watchExchangeBids).length === 0}
                                        value={field.value}
                                        onChange={(e) => setValue("bundles", e.target.value)}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className='h-full flex items-center mt-8 col-span-1'>
                        <Button type='button' className='w-full' variant='outline'
                            onClick={() => {
                                if (getValues("bundles")) {
                                    const bundles = getValues("bundles")
                                    const updatedBundleBids: Record<string, number | null> = { ...watchBundleBids }
                                    bundles?.split(",").forEach(v => {
                                        updatedBundleBids[v.trim()] = getValues("bundleBids")[v.trim()] ?? null
                                    })
                                    setValue("bundleBids", updatedBundleBids)
                                }
                            }}
                        >Add</Button>
                    </div>
                    {Object.keys(watchBundleBids).length > 0 &&
                        <div className='col-span-2'>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Bundle</TableHead>
                                        <TableHead>Bid Multiplier</TableHead>
                                        <TableHead>Action</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {Object.keys(watchBundleBids).map(v => {
                                        return (
                                            <TableRow key={v}>
                                                <TableCell className='min-w-[300px]'>{v}</TableCell>
                                                <TableCell>
                                                    <Input
                                                        placeholder='Multiplier'
                                                        type='number'
                                                        value={watchBundleBids[v] ?? ''}
                                                        onChange={(e) => {
                                                            const updateBundleBids = { ...watchBundleBids, [v]: e.target.value ? parseInt(e.target.value) : null }
                                                            setValue("bundleBids", updateBundleBids)
                                                        }}
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    <Button type='button' onClick={() => {
                                                        const updatedBundleBids = { ...watchBundleBids }
                                                        delete updatedBundleBids[v]
                                                        setValue("bundleBids", updatedBundleBids)
                                                    }}>Delete</Button>
                                                </TableCell>
                                            </TableRow>
                                        )
                                    })}
                                </TableBody>
                            </Table>
                        </div>}
                </div>
                <div className='grid grid-cols-5 gap-4 items-center'>
                    <FormField
                        control={form.control}
                        name="adslot"
                        render={({ field }) => (
                            <FormItem className={cn(Object.keys(watchAdSlotBids).length > 0 ? 'col-span-2' : 'col-span-4')}>
                                <FormLabel>AdSlot</FormLabel>
                                <FormControl>
                                    <Textarea
                                        id="adslot"
                                        name="adslot"
                                        value={field.value}
                                        onChange={(e) => setValue("adslot", e.target.value)}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className='h-full flex items-center mt-8 col-span-1'>
                        <Button type='button' className='w-full' variant='outline'
                            onClick={() => {
                                if (getValues("adslot")) {
                                    const adslot = getValues("adslot")
                                    const updatedAdSlotBids: Record<string, number | null> = { ...watchAdSlotBids }
                                    adslot?.split(",").forEach(v => {
                                        updatedAdSlotBids[v.trim()] = getValues("adslotBids")[v.trim()] ?? null
                                    })
                                    setValue("adslotBids", updatedAdSlotBids)
                                }
                            }}
                        >Add</Button>
                    </div>
                    {Object.keys(watchAdSlotBids).length > 0 &&
                        <div className='col-span-2'>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>AdSlot</TableHead>
                                        <TableHead>Bid Multiplier</TableHead>
                                        <TableHead>Action</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {Object.keys(watchAdSlotBids).map(v => {
                                        return (
                                            <TableRow key={v}>
                                                <TableCell className='min-w-[300px]'>{v}</TableCell>
                                                <TableCell>
                                                    <Input
                                                        placeholder='Multiplier'
                                                        type='number'
                                                        value={watchAdSlotBids[v] ?? ''}
                                                        onChange={(e) => {
                                                            const updateAdSlotBids = { ...watchAdSlotBids, [v]: e.target.value ? parseInt(e.target.value) : null }
                                                            setValue("adslotBids", updateAdSlotBids)
                                                        }}
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    <Button type='button' onClick={() => {
                                                        const updateAdSlotBids = { ...watchAdSlotBids }
                                                        delete updateAdSlotBids[v]
                                                        setValue("adslotBids", updateAdSlotBids)
                                                    }}>Delete</Button>
                                                </TableCell>
                                            </TableRow>
                                        )
                                    })}
                                </TableBody>
                            </Table>
                        </div>}
                </div>
                <FormField
                    control={form.control}
                    name="maxBidPrice"
                    render={({ field }) => (
                        <FormItem className='col-span-3'>
                            <FormLabel>Max Bid Price<span className='text-red-500'>*</span></FormLabel>
                            <FormControl>
                                <Input type='number' {...field} />
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
                                        onChange={(value) => setValue('status', value ? value.value : '')}
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
                        router.push("/bid-multiplier")
                    }}>CANCEL</Button>
                    <Button type="submit" loading={isSubmitting}>{isEdit ? "UPDATE" : "CREATE"}</Button>
                </div>
            </form>
        </Form>
    )
}
