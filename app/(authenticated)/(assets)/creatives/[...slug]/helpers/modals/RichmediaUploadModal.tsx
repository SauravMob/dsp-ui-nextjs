"use client"

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { zodResolver } from '@hookform/resolvers/zod'
import { Upload } from 'lucide-react'
import React from 'react'
import { DropzoneInputProps, DropzoneRootProps } from 'react-dropzone'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'

export default function RichmediaUploadModal({
    getRootProps,
    getInputProps,
    onRichmediaCodeDrop,
    triggerComponent
}: {
    getRootProps: <T extends DropzoneRootProps>(props?: T | undefined) => T
    getInputProps: <T extends DropzoneInputProps>(props?: T | undefined) => T
    onRichmediaCodeDrop: ({ name, code }: {
        name: string;
        code: string;
    }) => void
    triggerComponent: React.ReactNode
}) {

    const formSchema = z.object({
        name: z.string().min(1, { message: "Nam is required!" }),
        code: z.string().min(1, { message: "Code is required!" })
    })

    const form = useForm<{ name: string, code: string }>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            code: ""
        }
    })

    const onSubmit: SubmitHandler<{ name: string, code: string }> = async (values: { name: string, code: string }) => {
        onRichmediaCodeDrop(values)
    }

    return (
        <Dialog>
            <DialogTrigger className='flex' asChild>
                {triggerComponent}
            </DialogTrigger>
            <DialogContent className='min-w-[600px]'>
                <DialogHeader>
                    <DialogTitle>Select Upload type JS / Code</DialogTitle>
                </DialogHeader>
                <DialogTrigger asChild>
                    <Button size="lg" type='button' {...getRootProps()} className='border p-2 rounded-md cursor-pointer'>
                        <input {...getInputProps()} />
                        <Upload className='opacity-70 mr-2' size={22} />Upload JS / HTML Files
                    </Button>
                </DialogTrigger>

                <div className='text-2xl text-center'>OR</div>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" noValidate>
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name<span className='text-red-900'>*</span></FormLabel>
                                    <FormControl>
                                        <Input placeholder='Name' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="code"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Javascript / HTML Code<span className='text-red-900'>*</span></FormLabel>
                                    <FormControl>
                                        <Textarea placeholder='Javascript / HTML Code' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className='flex justify-end pt-4'>
                            <DialogTrigger asChild>
                                <Button className='mr-2' variant="outline">CANCEL</Button>
                            </DialogTrigger>
                            <DialogTrigger asChild>
                                <Button type="submit">SUBMIT</Button>
                            </DialogTrigger>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog >
    )
}
