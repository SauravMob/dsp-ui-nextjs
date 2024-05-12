"use client"

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import { createOptimization, updateOptimization } from '../../actions'
import { toast } from '@/components/ui/use-toast'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { AutoComplete } from '@/components/utility/customComponents/SelectInput'
import { fetchCampaignIdNameList, searchCampaign } from '@/app/(authenticated)/(manage)/campaigns/actions'
import { Input } from '@/components/ui/input'

export default function OptimizationForm({
    isEdit,
    userId,
    editData
}: {
    isEdit: boolean
    userId: number
    editData: OptimizationType
}) {

    const router = useRouter()

    const [campaignOptions, setCampaignOptions] = useState<{ value: string, label: string }[]>([])

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
    }, [editData])

    const formSchema = z.object({
        campaignId: z.number().refine((data) => {
            return data
        }, { message: "Campaign is required" }),
        maxBudgetPerSiteid: z.number().nullable(),
        cpaGoal: z.number().optional(),
        maxImpPerClick: z.number().nullable(),
        status: z.string(),
        userId: z.number()
    })

    const form = useForm<OptimizationType>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            campaignId: isEdit ? editData.campaignId : 0,
            maxBudgetPerSiteid: isEdit ? editData.maxBudgetPerSiteid : null,
            maxImpPerClick: isEdit ? editData.maxImpPerClick : null,
            status: "ACTIVE",
            userId
        }
    })

    const { setValue } = form
    const { isSubmitting } = form.formState

    const onSubmit: SubmitHandler<OptimizationType> = async (values: OptimizationType) => {
        const result = isEdit ? await updateOptimization(editData.id, values) : await createOptimization(values)
        if (result?.status === 200) {
            router.push("/optimization")
            toast({ title: `${isEdit ? "Updated" : "Created"} optimization`, description: `Optimization ${isEdit ? "updated" : "created"} successfully` })
        } else toast({ title: `Error while ${isEdit ? "updating" : "creating"} optimization`, description: `Couldn't ${isEdit ? "update" : "create"} optimization` })
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
                <FormField
                    control={form.control}
                    name="maxBudgetPerSiteid"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Max Spend / Bundle Id</FormLabel>
                            <FormControl>
                                <div className='grid grid-cols-4 gap-4'>
                                    <Input type='number' className='col-span-2' placeholder='Max Spend' value={field.value || ''} onChange={(e) => setValue('maxBudgetPerSiteid', e.target.value ? parseInt(e.target.value) : null)} />
                                    <Input type='number' className='col-span-1' placeholder='CPA GoaL' disabled />
                                    <span className='col-span-1 flex justify-center items-center'>CPA Goal</span>
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="maxImpPerClick"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Max Impression / Bundle Before Click</FormLabel>
                            <FormControl>
                                <Input type='number' placeholder='Max Impression' value={field.value || ''} onChange={(e) => setValue('maxImpPerClick', e.target.value ? parseInt(e.target.value) : null)} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className='flex justify-end pt-4'>
                    <Button className='mr-2' variant="outline" onClick={(e) => {
                        e.preventDefault()
                        router.push("/optimization")
                    }}>CANCEL</Button>
                    <Button type="submit" loading={isSubmitting}>{isEdit ? "UPDATE" : "CREATE"}</Button>
                </div>
            </form>
        </Form>
    )
}
