"use client"

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { SelectInput } from '@/components/utility/customComponents/SelectInput'
import { statusWithoutInactiveOptions } from '@/components/utility/utils/Utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import { createDeal, updateDeal } from '../../actions'
import { toast } from '@/components/ui/use-toast'

export default function DealsFormData({
    userId, id, isEdit, editData
}: {
    userId: string, id: string, isEdit: boolean, editData: PmpDealsType | null
}) {

    const router = useRouter()

    const formSchema = z.object({
        dealId: z.string().min(1, { message: "Required Field!" }),
        name: z.string().min(1, { message: "Required Field!" }),
        dealDescription: z.string().min(1, { message: "Required Field!" }),
        status: z.string().min(1, { message: "Required Field!" }),
        userId: z.number()
    })

    const form = useForm<PmpDealsType>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            dealId: editData?.dealId || '',
            name: editData?.name || '',
            dealDescription: editData?.dealDescription || '',
            status: editData?.status || 'ACTIVE',
            userId: editData?.userId || parseInt(userId)
        }
    })

    const { clearErrors, setValue, getValues } = form
    const { isSubmitting } = form.formState

    const onSubmit: SubmitHandler<PmpDealsType> = async (values: PmpDealsType) => {
        const result = isEdit ? await updateDeal(id, values) : await createDeal(values)
        if (result?.status === 200) {
            router.push("/admin-tools/deals")
            toast({ title: `${isEdit ? "Updated" : "Created"} deal`, description: `${values.name} ${isEdit ? "updated" : "created"} successfully` })
        } else toast({ title: `Error while ${isEdit ? "updating" : "creating"} deal`, description: `Couldn't ${isEdit ? "update" : "create"} ${values.name}` })
        router.refresh()
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" noValidate>
                <FormField
                    control={form.control}
                    name="dealId"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Deal Id<span className='text-red-900'>*</span></FormLabel>
                            <FormControl>
                                <Input type="text" placeholder="Deal Id" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name<span className='text-red-900'>*</span></FormLabel>
                            <FormControl>
                                <Input type="text" placeholder="Name" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="dealDescription"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description<span className='text-red-900'>*</span></FormLabel>
                            <FormControl>
                                <Input type="text" placeholder="Description" {...field} />
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
                            <FormLabel className='flex justify-between'>
                                <div>Status</div>
                            </FormLabel>
                            <FormControl>
                                <div className='flex justify-center items-center'>
                                    <SelectInput
                                        placeholder='Status...'
                                        name="status"
                                        value={statusWithoutInactiveOptions.filter(v => v.value === getValues('status'))[0]}
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
                        router.push("/admin-tools/deals")
                    }}>CANCEL</Button>
                    <Button type="submit" loading={isSubmitting}>{isEdit ? "UPDATE" : "CREATE"}</Button>
                </div>
            </form>
        </Form>
    )
}
