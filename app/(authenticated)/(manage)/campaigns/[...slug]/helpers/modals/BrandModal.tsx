import { regexBrand } from '@/components/constants/regexConstants'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { zodResolver } from '@hookform/resolvers/zod'
import { PlusCircle } from 'lucide-react'
import React, { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import { createBrand } from '../../../actions'
import { toast } from '@/components/ui/use-toast'

export default function BrandModal({
    userId,
    fetchBrand
}: {
    userId: number
    fetchBrand: () => Promise<void>
}) {

    const [open, setOpen] = useState<boolean>(false)

    const formSchema = z.object({
        name: z.string()
            .min(1, { message: "Brand Name is required" })
            .max(64, { message: "Brand Name must be less than 64 characters" })
            .regex(regexBrand, { message: "Brand Name is invalid, Only alphanumeric characters, hyphens(-), underscores(_) are allowed" }),
        description: z.string(),
        status: z.string().default("ACTIVE"),
        userId: z.number().default(userId)
    })

    type BrandFormType = z.infer<typeof formSchema>

    const form = useForm<BrandFormType>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            description: "",
            status: "ACTIVE",
            userId
        }
    })

    const { trigger, formState: { errors } } = form

    const onSubmit: SubmitHandler<BrandFormType> = async (values: BrandFormType) => {
        const output = await trigger(['name'], { shouldFocus: true })
        if (!output) return
        const result = await createBrand(values)
        setOpen(false)
        if (result?.status === 200) {
            fetchBrand()
            toast({ title: `Created Brand`, description: `Brand added successfully` })
        } else toast({ title: `Error while creating brand`, description: `Couldn't create brand` })
        form.reset()
    }

    return (
        <Dialog open={open}>
            <DialogTrigger className='flex justify-start' asChild onClick={() => setOpen(!open)}>
                <Button type='button'>
                    <PlusCircle size={17} className='mr-2' />Add Brand
                </Button>
            </DialogTrigger>
            <DialogContent className='min-w-[600px] min-h-[400px]'>
                <DialogHeader>
                    <DialogTitle>Brand Details</DialogTitle>
                    <DialogDescription>Create a new brand</DialogDescription>
                </DialogHeader>
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Brand Name<span className='text-red-900'>*</span></FormLabel>
                            <FormControl>
                                <Input
                                    placeholder='Brand Name'
                                    {...field}
                                />
                            </FormControl>
                            {errors.name && <div className='text-red-500'>{errors?.name.message}</div>}
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Brand Description<span className='text-red-900'>*</span></FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder='Brand Description'
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <DialogFooter>
                    <DialogTrigger asChild onClick={() => setOpen(!open)}>
                        <Button>Cancel</Button>
                    </DialogTrigger>
                    <Button type='button' onClick={() => onSubmit(form.getValues())}>Submit</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
