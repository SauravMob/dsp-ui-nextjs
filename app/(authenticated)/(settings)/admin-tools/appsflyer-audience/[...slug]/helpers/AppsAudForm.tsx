"use client"

import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import { v4 as uuid } from 'uuid'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { SelectInput } from '@/components/utility/customComponents/SelectInput'
import { statusWithoutPauseOptions } from '@/components/utility/utils/Utils'
import { createAud, updateAud } from '../../actions'
import { toast } from '@/components/ui/use-toast'
import { useRouter } from 'next/navigation'

export default function AppsAudForm({
    id, isEdit, editData
}: {
    id: string, isEdit: boolean, editData: AppsflyerAudienceType | null
}) {

    const router = useRouter()

    const formSchema = z.object({
        advertiserName: z.string().min(1, { message: "Required Field!" }),
        apiKey: z.string().uuid(),
        status: z.string()
    })

    const form = useForm<AppsflyerAudienceType>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            advertiserName: editData?.advertiserName || '',
            apiKey: editData?.apiKey || uuid(),
            status: editData?.status || 'ACTIVE'
        }
    })

    const { clearErrors, setValue, getValues } = form
    const { isSubmitting } = form.formState

    const onSubmit: SubmitHandler<AppsflyerAudienceType> = async (values: AppsflyerAudienceType) => {
        const result = isEdit ? await updateAud(id, values) : await createAud(values)
        if (result?.status === 200) {
            router.push("/admin-tools/appsflyer-audience")
            toast({ title: `${isEdit ? "Updated" : "Created"} appsflyer audience`, description: `${values.advertiserName} ${isEdit ? "updated" : "created"} successfully` })
        } else toast({ title: `Error while ${isEdit ? "updating" : "creating"} appsflyer audience`, description: `Couldn't ${isEdit ? "update" : "create"} ${values.advertiserName}` })
        router.refresh()
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" noValidate>
                <FormField
                    control={form.control}
                    name="advertiserName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Advertiser<span className='text-red-900'>*</span></FormLabel>
                            <FormControl>
                                <Input type="text" placeholder="Advertiser Name" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="apiKey"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>API Key (Generated dynamically)</FormLabel>
                            <FormControl>
                                <Input type="text" disabled {...field} />
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
                                Status
                            </FormLabel>
                            <FormControl className='flex justify-center items-center'>
                                <SelectInput
                                    placeholder='Status...'
                                    name="status"
                                    value={statusWithoutPauseOptions.filter(v => v.value === getValues('status'))[0]}
                                    options={statusWithoutPauseOptions}
                                    onChange={(value) => {
                                        setValue('status', value ? value.value : '')
                                        clearErrors('status')
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
                        router.push("/admin-tools/appsflyer-audience")
                    }}>CANCEL</Button>
                    <Button type="submit" loading={isSubmitting}>{isEdit ? "UPDATE" : "CREATE"}</Button>
                </div>
            </form>
        </Form>
    )
}
