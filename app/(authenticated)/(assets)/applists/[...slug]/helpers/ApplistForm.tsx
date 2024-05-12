"use client"

import { regexBundle, regexName } from '@/components/constants/regexConstants'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import { createApplist, updateApp } from '../../actions'
import { toast } from '@/components/ui/use-toast'

export default function ApplistForm({
    editData,
    isEdit,
    userId,
}: {
    editData: ApplistType
    isEdit: boolean
    userId: number,
}) {

    const router = useRouter()

    const formSchema = z.object({
        name: z.string().min(1, { message: "Name is required" }).regex(regexName, { message: "Name is invalid, Only alphanumeric characters,hyphens(-), underscores(_) are allowed" }),
        bundles: z.string().min(1, { message: "Bundles is required" }).regex(regexBundle, { message: "Bundle is invalid, Only alphanumeric characters,hyphens(-), underscores(_), dots(.) are allowed" }),
        description: z.string().optional()
    })

    const form = useForm<ApplistType>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: isEdit ? editData.name : "",
            description: isEdit ? editData.description : "",
            bundles: isEdit ? editData.bundles : ""
        }
    })

    const { isSubmitting } = form.formState

    const onSubmit: SubmitHandler<ApplistType> = async (values: ApplistType) => {
        const submitValue = {
            ...values,
            status: "ACTIVE",
            userId: isEdit ? editData.userId : userId
        }
        const result = isEdit ? await updateApp(editData.id, submitValue) : await createApplist(submitValue)
        if (result?.status === 200) {
            router.push("/applists")
            toast({ title: `${isEdit ? "Updated" : "Created"} applist`, description: `Applist ${isEdit ? "updated" : "created"} successfully` })
        } else toast({ title: `Error while ${isEdit ? "updating" : "creating"} applist`, description: `Couldn't ${isEdit ? "update" : "create"} applist` })
        router.refresh()
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" noValidate>
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name<span className='text-red-900'>*</span></FormLabel>
                            <FormControl>
                                <Input placeholder='App Name' {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="bundles"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Bundles<span className='text-red-900'>*</span></FormLabel>
                            <FormControl>
                                <Textarea placeholder='Bundles' {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Textarea placeholder='Description' {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className='flex justify-end pt-4'>
                    <Button className='mr-2' variant="outline" onClick={(e) => {
                        e.preventDefault()
                        router.push("/applists")
                    }}>CANCEL</Button>
                    <Button type="submit" loading={isSubmitting}>{isEdit ? "UPDATE" : "CREATE"}</Button>
                </div>
            </form>
        </Form>
    )
}
