"use client"

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { MultiSelectInput, SelectInput } from '@/components/utility/customComponents/SelectInput'
import { customFeatureOptions, roleOptions, statusWithoutPauseOptions } from '@/components/utility/utils/Utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { Edit } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import { fetchAccountManagerAndAdmins, updateUser } from '../actions'
import { cn } from '@/lib/utils'
import { Slider } from '@/components/ui/slider'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { useRouter } from 'next/navigation'
import { toast } from '@/components/ui/use-toast'

export default function EditUserForm({ row }: { row: ManageUserType }) {

    const router = useRouter()

    const [accountManagers, setAccountManagers] = useState<{ value: string, label: string }[]>([])

    const formSchema = z.object({
        username: z.string().min(1, { message: "Required Field!" }),
        domainUrl: z.string().min(1, { message: "Required Field!" }).url({ message: "URL is invalid" }),
        accountManager: z.string().min(1, { message: "Required Field!" }),
        customFeatures: z.array(z.string()),
        videoCompletionPercent: z.array(z.number()),
        role: z.coerce.number(),
        status: z.string()
    })

    type ManageUserFormType = z.infer<typeof formSchema>

    const form = useForm<ManageUserFormType>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: row.username,
            domainUrl: row.domainUrl,
            accountManager: '',
            customFeatures: row.customFeatures?.split(',') || [],
            videoCompletionPercent: row.videoCompletionPercent?.split('-').map(v => parseInt(v)) || [25, 75],
            role: row.role,
            status: row.status
        }
    })

    const { setValue, watch } = form

    useEffect(() => {
        const fetchAccManager = async () => {
            const result = await fetchAccountManagerAndAdmins()
            setAccountManagers(result.map((v: { id: number, email: string }) => ({ value: v.id.toString(), label: v.email })))
            setValue("accountManager", result.find((v: { id: number, email: string }) => v.email === row.accountManager)?.id.toString())
        }
        fetchAccManager()
    }, [])

    const onSubmit: SubmitHandler<ManageUserFormType> = async (values: ManageUserFormType) => {
        const submittedValues: ManageUserType = {
            id: row.id,
            userId: row.userId,
            sspName: row.sspName,
            username: values.username,
            email: row.email,
            domainUrl: values.domainUrl,
            accountManager: values.accountManager,
            customFeatures: values.customFeatures ? values.customFeatures.join(',') : null,
            status: values.status,
            role: values.role,
            videoCompletionPercent: values.customFeatures.includes("VIDEO TRACKING") ? values.videoCompletionPercent.join('-') : null,
            availableBudget: row.availableBudget,
            campaignCount: row.campaignCount,
            company: row.company,
            country: row.country,
            creativeCount: row.creativeCount
        }
        const result = await updateUser(submittedValues)
        if (result?.status === 200) {
            router.push("/manage-users")
            toast({ title: `Updated user`, description: `${submittedValues.username} details updated successfully` })
        } else toast({ title: `Error while updating user`, description: `Couldn't update ${submittedValues.username} details` })
        router.refresh()
    }

    return (
        <Dialog>
            <DialogTrigger className='flex justify-start' asChild>
                <Button variant="ghost" size="sm" className='justify-start w-full'>
                    <Edit size={18} className='mr-2' />Edit User
                </Button>
            </DialogTrigger>
            <DialogContent className='min-w-[1200px]'>
                <DialogHeader>
                    <DialogTitle>{row.email} ({row.userId})</DialogTitle>
                    <DialogDescription>Update the user details</DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" noValidate>
                        <div className='grid grid-cols-2 space-x-4'>
                            <FormField
                                control={form.control}
                                name="username"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Advertiser Name<span className='text-red-900'>*</span></FormLabel>
                                        <FormControl>
                                            <Input placeholder='Advertiser Name' {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="role"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Role<span className='text-red-900'>*</span></FormLabel>
                                        <FormControl>
                                            <SelectInput
                                                placeholder='Select Role'
                                                id="role"
                                                name="role"
                                                value={roleOptions.filter(v => v.value === field.value.toString())[0]}
                                                options={roleOptions}
                                                onChange={(value) => {
                                                    setValue('role', value ? parseInt(value.value) : 0)
                                                }}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className='grid grid-cols-3 space-x-4'>
                            <FormField
                                control={form.control}
                                name="customFeatures"
                                render={({ field }) => (
                                    <FormItem className={cn(field.value.includes('VIDEO TRACKING') ? 'col-span-1' : 'col-span-2')}>
                                        <FormLabel>Custom Features</FormLabel>
                                        <FormControl>
                                            <MultiSelectInput
                                                placeholder='Custom Features'
                                                id="customFeatures"
                                                name="customFeatures"
                                                value={customFeatureOptions.filter(v => field.value.includes(v.value))}
                                                options={customFeatureOptions}
                                                onChange={(selectedOptions) => {
                                                    if (selectedOptions) {
                                                        setValue('customFeatures', selectedOptions.map(v => v.value))
                                                    } else setValue('customFeatures', [])
                                                }}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {watch('customFeatures').includes('VIDEO TRACKING') && <FormField
                                control={form.control}
                                name="videoCompletionPercent"
                                render={({ field }) => (
                                    <FormItem className={cn(watch("customFeatures").includes('VIDEO TRACKING') ? 'col-span-1' : 'col-span-2')}>
                                        <FormLabel>Video Completion Percentage</FormLabel>
                                        <FormControl className='flex items-center'>
                                            <Tooltip>
                                                <TooltipTrigger className='w-full h-12' asChild>
                                                    <Slider
                                                        min={1}
                                                        max={100}
                                                        step={1}
                                                        value={field.value}
                                                        onValueChange={(value) => {
                                                            setValue('videoCompletionPercent', value)
                                                        }}
                                                    />
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    {field.value[0]} - {field.value[1]}
                                                </TooltipContent>
                                            </Tooltip>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />}
                            <FormField
                                control={form.control}
                                name="accountManager"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Account Manager<span className='text-red-900'>*</span></FormLabel>
                                        <FormControl>
                                            <SelectInput
                                                placeholder='Account Manager'
                                                id="accountManager"
                                                name="accountManager"
                                                value={accountManagers.filter(v => v.value === field.value)[0]}
                                                options={accountManagers}
                                                onChange={(value) => {
                                                    setValue('accountManager', value ? value.value : '')
                                                }}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className='grid grid-cols-2 space-x-4'>
                            <FormField
                                control={form.control}
                                name="domainUrl"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Domain URL</FormLabel>
                                        <FormControl>
                                            <Input placeholder='Domain URL' {...field} />
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
                                            <SelectInput
                                                placeholder='Select Status'
                                                id="status"
                                                name="status"
                                                value={statusWithoutPauseOptions.filter(v => v.value === field.value)[0]}
                                                options={statusWithoutPauseOptions}
                                                onChange={(value) => {
                                                    setValue('status', value ? value.value : '')
                                                }}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <DialogFooter>
                            <DialogTrigger asChild>
                                <Button type='button'>Cancel</Button>
                            </DialogTrigger>
                            <Button type='submit'>Update</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
